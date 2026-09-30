#!/usr/bin/env python3
"""把原始参考图批量处理成站点能用的规格，输出到 assets/refs/<子项目id>/。

做三件事：
  1. 长边缩到 --max-edge（默认 1200px），不放大
  2. 统一转成 RGB JPEG（带透明通道的图铺白底）
  3. 二分调质量，压到 --max-kb（默认 500KB）以内

用法::

    # 建议用带 Pillow 的解释器
    PY=/Users/shenqi/.workbuddy/binaries/python/envs/default/bin/python

    # 先干跑看会产出什么，不写文件
    $PY tools/optimize_refs.py ~/Downloads/xhs --project style-prompt --dry-run

    # 确认没问题再真跑
    $PY tools/optimize_refs.py ~/Downloads/xhs --project style-prompt

文件名会规范成小写中划线（`Studio Ghibli 01.PNG` → `studio-ghibli-01.jpg`）。
规范完之后需要人工把文件名改成对应条目的 id，并去 data 里补 `image` 字段。
"""

from __future__ import annotations

import argparse
import io
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    print(
        "缺少 Pillow。请用带 Pillow 的解释器运行：\n"
        "  /Users/shenqi/.workbuddy/binaries/python/envs/default/bin/python "
        "tools/optimize_refs.py ...",
        file=sys.stderr,
    )
    raise SystemExit(2)

ROOT = Path(__file__).resolve().parent.parent
REFS_DIR = ROOT / "assets" / "refs"
SRC_EXT = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".bmp", ".tif", ".tiff", ".heic"}


def slugify(name: str) -> str:
    name = Path(name).stem.lower()
    name = re.sub(r"[^a-z0-9]+", "-", name)
    return re.sub(r"-{2,}", "-", name).strip("-") or "image"


def flatten(img: Image.Image) -> Image.Image:
    """透明/调色板图铺白底后转 RGB。"""
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        rgba = img.convert("RGBA")
        bg = Image.new("RGB", rgba.size, (255, 255, 255))
        bg.paste(rgba, mask=rgba.split()[-1])
        return bg
    return img.convert("RGB")


def resize(img: Image.Image, max_edge: int) -> Image.Image:
    w, h = img.size
    long_edge = max(w, h)
    if long_edge <= max_edge:
        return img
    scale = max_edge / long_edge
    return img.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)


def encode_under(img: Image.Image, max_kb: int) -> tuple[bytes, int]:
    """二分质量，返回 (字节, 实际质量)。压不到就返回最低质量的结果。"""
    limit = max_kb * 1024
    lo, hi = 40, 95
    best = b""
    best_q = lo

    while lo <= hi:
        mid = (lo + hi) // 2
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=mid, optimize=True, progressive=True)
        data = buf.getvalue()
        if len(data) <= limit:
            best, best_q = data, mid
            lo = mid + 1
        else:
            hi = mid - 1

    if best:
        return best, best_q

    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=40, optimize=True, progressive=True)
    return buf.getvalue(), 40


def main() -> int:
    ap = argparse.ArgumentParser(description="批量处理参考图到站点规格")
    ap.add_argument("src", type=Path, help="原始图片所在目录")
    ap.add_argument("--project", required=True, help="子项目 id，例如 style-prompt")
    ap.add_argument("--max-kb", type=int, default=500, help="单图体积上限，默认 500")
    ap.add_argument("--max-edge", type=int, default=1200, help="长边像素上限，默认 1200")
    ap.add_argument("--dry-run", action="store_true", help="只报告，不写文件")
    args = ap.parse_args()

    if not args.src.is_dir():
        print(f"源目录不存在：{args.src}", file=sys.stderr)
        return 1

    out_dir = REFS_DIR / args.project
    files = sorted(
        p for p in args.src.iterdir()
        if p.is_file() and p.suffix.lower() in SRC_EXT and not p.name.startswith(".")
    )
    if not files:
        print(f"{args.src} 里没找到图片（支持 {'/'.join(sorted(SRC_EXT))}）", file=sys.stderr)
        return 1

    if not args.dry_run:
        out_dir.mkdir(parents=True, exist_ok=True)

    print(f"{'文件名':<20} {'原始':>12} {'输出':>12} {'质量':>5}  体积")
    print("-" * 68)

    total_before = total_after = 0
    used_names: set[str] = set()

    for src in files:
        before = src.stat().st_size
        try:
            with Image.open(src) as raw:
                img = flatten(raw)
                img = resize(img, args.max_edge)
                data, quality = encode_under(img, args.max_kb)
                size = img.size
        except Exception as exc:  # noqa: BLE001
            print(f"{src.name:<20} 跳过：{exc}")
            continue

        name = slugify(src.name)
        while name in used_names:
            name += "-x"
        used_names.add(name)
        target = out_dir / f"{name}.jpg"

        if not args.dry_run:
            target.write_bytes(data)

        total_before += before
        total_after += len(data)
        flag = "  ⚠️ 压到最低质量仍超标" if len(data) > args.max_kb * 1024 else ""
        print(
            f"{src.name[:19]:<20} {before / 1024:>10.0f}KB {len(data) / 1024:>10.0f}KB "
            f"{quality:>5}  {size[0]}x{size[1]}{flag}"
        )

    print("-" * 68)
    print(
        f"共 {len(used_names)} 张：{total_before / 1024 / 1024:.1f}MB → "
        f"{total_after / 1024 / 1024:.1f}MB"
    )
    if args.dry_run:
        print("（--dry-run，没有写文件）")
    else:
        print(f"已写入 {out_dir.relative_to(ROOT)}")
        print("下一步：把文件名改成条目 id，再去 data 里补 image 字段，然后跑 tools/lint.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
