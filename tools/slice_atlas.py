#!/usr/bin/env python3
"""把「风格图谱」长图按卡片切成单张参考图。

这类图谱（小红书 / AI 生成的风格图鉴）的版式特点：
  - 一张图纵向排 N 个卡片，每张卡 = 左边「编号 + 名称 + 描述」+ 右边「参考图」
  - 卡片之间是奶油色底：**亮度明显高于照片，且方差极低**（空隙很窄，常只有 8~14px）
  - 版式由 AI 生成，卡片高度**不均匀**，绝不能用 N 等分
  - 部分图外圈还有深色装饰边框，必须排除

定位算法：
  1. 纵向：在配图列区间逐行算 (均值, 标准差)，「背景行」= 标准差不高于 ROW_BG_STD
     且亮度不低于 ROW_BG_MEAN。相邻空隙带合并后，取相邻空隙之间为卡片分段。
  2. 横向：把全部卡片分段的行取并集，逐列算「奶油占比」（与底色距离 < 34 的行占比）。
     参考图所在列的奶油占比接近 0，而左侧文字区是 0.6~0.9、竖缝接近 1。
     取奶油占比 < COL_CREAM_MAX 的最长连续段。
  3. 卡片分段上下若压到装饰性深色边（亮度 < ROW_DARK_MEAN）则裁掉。

用法：
  python tools/slice_atlas.py <输入目录|文件...> --out <输出目录> [--debug 目录] [--boxes boxes.json]

  --boxes 可传入人工校正表 {"文件名或序号": [[x0,y0,x1,y1], ...]}，命中的图不再自动检测。
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROW_BG_STD = 30.0        # 空隙行：灰度标准差上限
ROW_BG_MEAN = 168.0      # 空隙行：亮度下限（照片总体更暗）
ROW_DARK_MEAN = 35.0     # 低于此亮度视为装饰深色边，从卡片上下裁掉
ROW_BG_MIN = 2           # 空隙带最少行数
GAP_MERGE = 8            # 相隔不超过这么多行的空隙带视为同一处
CARD_MIN_RATIO = 0.10    # 卡片高度占比下限
CARD_MAX_RATIO = 0.30    # 卡片高度占比上限

COL_START = 0.20         # 找参考图的列搜索起点（相对宽度）
COL_CREAM_MAX = 0.50     # 一列奶油占比低于此值才可能是参考图
COL_MIN_WIDTH = 0.25     # 参考图最小宽度（相对图宽）
BG_TOL = 34.0            # 判定「与奶油底同色」的距离阈值


def background_color(a: np.ndarray) -> np.ndarray:
    g = a.mean(axis=2)
    ok = (g.std(axis=1) < 10) & (g.mean(axis=1) > 180)
    if not ok.any():
        return np.array([245.0, 238.0, 224.0], dtype=np.float32)
    return np.median(a[ok], axis=(0, 1))


def card_bands(a: np.ndarray) -> list[tuple[int, int]]:
    """纵向切出每个卡片的 [y0, y1)，已裁掉装饰性深色边。"""
    H, W, _ = a.shape
    g = a[:, int(W * 0.40):int(W * 0.97)].mean(axis=2)
    std, mean = g.std(axis=1), g.mean(axis=1)
    bg = (std < ROW_BG_STD) & (mean > ROW_BG_MEAN)

    raw: list[list[int]] = []
    s = None
    for i, v in enumerate(bg):
        if v and s is None:
            s = i
        elif not v and s is not None:
            raw.append([s, i])
            s = None
    if s is not None:
        raw.append([s, len(bg)])

    merged: list[list[int]] = []
    for t in raw:
        if merged and t[0] - merged[-1][1] <= GAP_MERGE:
            merged[-1][1] = t[1]
        else:
            merged.append(list(t))
    merged = [t for t in merged if t[1] - t[0] >= ROW_BG_MIN]

    bounds = [0] + [v for t in merged for v in t] + [H]
    bands: list[tuple[int, int]] = []
    for i in range(len(bounds) - 1):
        y0, y1 = bounds[i], bounds[i + 1]
        while y0 < y1 and mean[y0] < ROW_DARK_MEAN:
            y0 += 1
        while y1 > y0 and mean[y1 - 1] < ROW_DARK_MEAN:
            y1 -= 1
        if H * CARD_MIN_RATIO <= y1 - y0 <= H * CARD_MAX_RATIO:
            bands.append((y0, y1))
    return bands


def photo_x(a: np.ndarray, bands: list[tuple[int, int]], bgr: np.ndarray) -> tuple[int, int] | None:
    H, W, _ = a.shape
    rows = np.zeros(H, dtype=bool)
    for y0, y1 in bands:
        rows[y0:y1] = True
    sub = a[rows]
    dist = np.linalg.norm(sub - bgr, axis=2)
    creamfrac = (dist < BG_TOL).mean(axis=0)

    lo = int(W * COL_START)
    is_photo = [x for x in range(lo, W) if creamfrac[x] < COL_CREAM_MAX]
    if not is_photo:
        return None
    runs: list[list[int]] = []
    cur = [is_photo[0]]
    for x in is_photo[1:]:
        if x - cur[-1] <= 2:
            cur.append(x)
        else:
            runs.append(cur)
            cur = [x]
    runs.append(cur)
    x0, x1 = max(runs, key=len)[0], max(runs, key=len)[-1] + 1
    if x1 - x0 < W * COL_MIN_WIDTH:
        return None
    return x0, x1


def detect(path: Path) -> tuple[list[tuple[int, int, int, int]], np.ndarray]:
    a = np.asarray(Image.open(path).convert("RGB")).astype(np.float32)
    bgr = background_color(a)
    bands = card_bands(a)
    xr = photo_x(a, bands, bgr) if bands else None
    return ([(xr[0], y0, xr[1], y1) for y0, y1 in bands] if xr else []), a


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("inputs", nargs="+")
    ap.add_argument("--out", required=True)
    ap.add_argument("--debug", help="把检测框画出来另存，用于目视校验")
    ap.add_argument("--boxes", help="人工校正表 JSON，键为文件名或序号")
    ap.add_argument("--expect", type=int, default=5, help="每张图期望的卡片数")
    ap.add_argument("--quality", type=int, default=88)
    ap.add_argument("--max-edge", type=int, default=1100)
    args = ap.parse_args()

    overrides: dict = {}
    if args.boxes:
        overrides = json.loads(Path(args.boxes).read_text(encoding="utf-8"))

    srcs: list[Path] = []
    for s in args.inputs:
        p = Path(s)
        srcs.extend(sorted(p.iterdir()) if p.is_dir() else [p])

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    if args.debug:
        Path(args.debug).mkdir(parents=True, exist_ok=True)

    total, bad = 0, []
    for i, src in enumerate(srcs, 1):
        im = Image.open(src).convert("RGB")
        key = overrides.get(src.name) or overrides.get(str(i))
        if key:
            boxes = [tuple(b) for b in key]
            a = None
        else:
            boxes, a = detect(src)
        if len(boxes) != args.expect:
            bad.append(f"{src.name}({len(boxes)}张)")
        print(f"[{i:02d}] {src.name}  {im.width}x{im.height}  →  {len(boxes)} 张"
              + ("" if len(boxes) == args.expect else "   ⚠")
              + ("  [人工校正]" if key else ""))
        for j, (x0, y0, x1, y1) in enumerate(boxes, 1):
            print(f"      {j}: x{x0}-{x1} y{y0}-{y1}  {x1-x0}x{y1-y0}")
        if args.debug and a is not None:
            from PIL import ImageDraw
            dbg = Image.fromarray(a.astype(np.uint8)).copy()
            d = ImageDraw.Draw(dbg)
            for j, (x0, y0, x1, y1) in enumerate(boxes, 1):
                d.rectangle([x0, y0, x1 - 1, y1 - 1], outline=(255, 0, 0), width=3)
                d.text((x0 + 8, y0 + 8), str(j), fill=(255, 0, 0))
            dbg.save(Path(args.debug) / f"debug-{i:02d}.png")

        for j, (x0, y0, x1, y1) in enumerate(boxes, 1):
            crop = im.crop((x0, y0, x1, y1))
            if max(crop.size) > args.max_edge:
                r = args.max_edge / max(crop.size)
                crop = crop.resize((max(1, round(crop.width * r)), max(1, round(crop.height * r))),
                                   Image.LANCZOS)
            crop.save(out / f"{i:02d}-{j}.jpg", quality=args.quality, optimize=True, progressive=True)
            total += 1

    print(f"\n共输出 {total} 张 → {out}")
    if bad:
        print(f"⚠ 切片数不等于 {args.expect} 的原图：{bad}")
    return 0 if not bad else 2


if __name__ == "__main__":
    sys.exit(main())
