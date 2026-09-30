#!/usr/bin/env python3
"""校验 ai-image-skills 仓库的 prompt 模板与 skill 包，并重新生成索引表。

用法::

    python3 tools/lint.py            # 校验 + 刷新索引
    python3 tools/lint.py --check    # 只校验、不写文件；有错则退出码 1

校验内容见 docs/CONVENTIONS.md 第六节。
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROMPTS_DIR = ROOT / "prompts"
SKILLS_DIR = ROOT / "skills"
DATA_DIR = ROOT / "data"

CATEGORIES = ["game-assets", "character", "scene", "ui", "style"]
REQUIRED_PROMPT_FIELDS = ["id", "title", "category", "tags", "version", "updated"]
VALID_STATUS = ["ready", "planned"]
ID_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
VARIABLE_RE = re.compile(r"\{\{([A-Z0-9_]+)\}\}")

INDEX_BEGIN = "<!-- INDEX:BEGIN -->"
INDEX_END = "<!-- INDEX:END -->"


# --------------------------------------------------------------------------- #
# frontmatter 解析（只支持本仓库用到的子集：标量 + 内联数组）
# --------------------------------------------------------------------------- #


def split_frontmatter(text: str) -> tuple[dict, str]:
    """返回 (frontmatter 字典, 正文)。没有 frontmatter 时返回 ({}, 全文)。"""
    if not text.startswith("---"):
        return {}, text

    lines = text.splitlines()
    if lines[0].strip() != "---":
        return {}, text

    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end = i
            break
    if end is None:
        return {}, text

    meta: dict = {}
    for raw in lines[1:end]:
        line = raw.rstrip()
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            continue
        key, _, value = line.partition(":")
        key = key.strip()
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1].strip()
            items = [v.strip().strip("\"'") for v in inner.split(",")] if inner else []
            meta[key] = [v for v in items if v]
        else:
            meta[key] = value.strip("\"'")

    return meta, "\n".join(lines[end + 1 :])


# --------------------------------------------------------------------------- #
# 校验
# --------------------------------------------------------------------------- #


def check_prompts(errors: list[str]) -> list[dict]:
    records: list[dict] = []
    for path in sorted(PROMPTS_DIR.rglob("*.md")):
        rel = path.relative_to(ROOT)
        if path.name.startswith("_") or path.name == "README.md":
            continue

        meta, body = split_frontmatter(path.read_text(encoding="utf-8"))
        if not meta:
            errors.append(f"{rel}: 缺少 frontmatter（文件开头应为 --- 包裹的元信息）")
            continue

        for field in REQUIRED_PROMPT_FIELDS:
            if not meta.get(field):
                errors.append(f"{rel}: 缺少必填字段 `{field}`")

        stem = path.stem
        if meta.get("id") and meta["id"] != stem:
            errors.append(f"{rel}: id `{meta['id']}` 与文件名 `{stem}.md` 不一致")

        category = meta.get("category")
        if category and category not in CATEGORIES:
            errors.append(
                f"{rel}: category `{category}` 非法，只能是 {'/'.join(CATEGORIES)}"
            )

        if category and path.parent.name != category and path.parent != PROMPTS_DIR:
            errors.append(
                f"{rel}: 文件所在目录 `{path.parent.name}/` 与 category `{category}` 不符"
            )

        version = meta.get("version", "")
        if version and not SEMVER_RE.match(version):
            errors.append(f"{rel}: version `{version}` 不是 x.y.z 格式")

        updated = meta.get("updated", "")
        if updated and not DATE_RE.match(updated):
            errors.append(f"{rel}: updated `{updated}` 不是 YYYY-MM-DD 格式")

        declared = set(meta.get("variables") or [])
        used = set(VARIABLE_RE.findall(body))

        for name in sorted(declared - used):
            errors.append(f"{rel}: 声明了变量 `{{{{{name}}}}}` 但正文里没用到")
        for name in sorted(used - declared):
            errors.append(f"{rel}: 正文用了变量 `{{{{{name}}}}}` 但没在 variables 里声明")

        records.append(
            {
                "id": meta.get("id", stem),
                "title": meta.get("title", ""),
                "category": category or "",
                "tags": meta.get("tags") or [],
                "aspect_ratio": meta.get("aspect_ratio") or "-",
                "variables": sorted(declared),
                "version": version,
                "updated": updated,
                "rel_path": str(path.relative_to(PROMPTS_DIR)),
            }
        )

    return records


def check_skills(errors: list[str]) -> list[dict]:
    records: list[dict] = []
    if not SKILLS_DIR.is_dir():
        return records

    for skill_md in sorted(SKILLS_DIR.glob("*/SKILL.md")):
        rel = skill_md.relative_to(ROOT)
        meta, _ = split_frontmatter(skill_md.read_text(encoding="utf-8"))

        if not meta:
            errors.append(f"{rel}: 缺少 frontmatter")
            continue

        for field in ("name", "description"):
            if not meta.get(field):
                errors.append(f"{rel}: 缺少必填字段 `{field}`")

        dir_name = skill_md.parent.name
        if dir_name.startswith("_"):
            continue

        if meta.get("name") and meta["name"] != dir_name:
            errors.append(f"{rel}: name `{meta['name']}` 与目录名 `{dir_name}` 不一致")

        description = meta.get("description", "")
        short = re.split(r"[。\n]", description)[0][:70]

        records.append(
            {
                "name": meta.get("name", dir_name),
                "description": short,
                "rel_path": str(skill_md.parent.relative_to(SKILLS_DIR)),
            }
        )

    return records


# --------------------------------------------------------------------------- #
# 索引生成
# --------------------------------------------------------------------------- #


def render_prompt_index(records: list[dict]) -> str:
    if not records:
        return "_（还没有模板）_"

    lines = [f"共 **{len(records)}** 个模板。", ""]
    for category in CATEGORIES:
        group = [r for r in records if r["category"] == category]
        if not group:
            continue
        lines.append(f"### {category}")
        lines.append("")
        lines.append("| 模板 | 标题 | 标签 | 比例 | 变量 | 版本 | 更新 |")
        lines.append("| --- | --- | --- | --- | --- | --- | --- |")
        for r in sorted(group, key=lambda x: x["id"]):
            tags = " ".join(f"`{t}`" for t in r["tags"])
            variables = " ".join(f"`{v}`" for v in r["variables"]) or "-"
            lines.append(
                f"| [{r['id']}]({r['rel_path']}) | {r['title']} | {tags} | "
                f"{r['aspect_ratio']} | {variables} | {r['version']} | {r['updated']} |"
            )
        lines.append("")

    other = [r for r in records if r["category"] not in CATEGORIES]
    if other:
        lines.append("### 未分类")
        lines.append("")
        for r in other:
            lines.append(f"- [{r['id']}]({r['rel_path']}) — {r['title']}")
        lines.append("")

    return "\n".join(lines).rstrip()


def render_skill_index(records: list[dict]) -> str:
    if not records:
        return "_（还没有技能包）_"

    lines = [
        f"共 **{len(records)}** 个技能包。",
        "",
        "| 技能 | 说明 | 目录 |",
        "| --- | --- | --- |",
    ]
    for r in sorted(records, key=lambda x: x["name"]):
        lines.append(f"| `{r['name']}` | {r['description']} | [{r['rel_path']}]({r['rel_path']}) |")
    return "\n".join(lines)


def write_index(target: Path, block: str, check_only: bool) -> None:
    if not target.exists():
        return

    text = target.read_text(encoding="utf-8")
    if INDEX_BEGIN not in text or INDEX_END not in text:
        print(f"! {target.relative_to(ROOT)}: 找不到索引标记，跳过", file=sys.stderr)
        return

    head, _, rest = text.partition(INDEX_BEGIN)
    _, _, tail = rest.partition(INDEX_END)
    new_text = f"{head}{INDEX_BEGIN}\n\n{block}\n\n{INDEX_END}{tail}"

    if new_text != text and not check_only:
        target.write_text(new_text, encoding="utf-8")
        print(f"· 已刷新 {target.relative_to(ROOT)}")


# --------------------------------------------------------------------------- #
# 站点数据校验（data/*.js）
# --------------------------------------------------------------------------- #

# 用一个极小的 Node 垫片把 window 全局掏出来，避免为 data 文件再写一个解析器。
LOADER_JS = r"""
global.window = global;
const path = require('path');
const root = process.env.AIS_ROOT;
require(path.join(root, 'data', 'projects.js'));
const projects = global.AIS_PROJECTS || [];
for (const p of projects) {
  if (p && p.dataKey) require(path.join(root, 'data', p.dataKey + '.js'));
}
process.stdout.write(JSON.stringify({
  projects: projects,
  items: global.AIS_ITEMS || {}
}));
"""


def find_node() -> str | None:
    for name in ("node",):
        found = shutil.which(name)
        if found:
            return found

    versions = Path.home() / ".workbuddy" / "binaries" / "node" / "versions"
    if versions.is_dir():
        for d in sorted(versions.iterdir(), reverse=True):
            cand = d / "bin" / "node"
            if cand.exists():
                return str(cand)

    for cand in ("/opt/homebrew/bin/node", "/usr/local/bin/node", "/usr/bin/node"):
        if Path(cand).exists():
            return cand
    return None


def load_site_data() -> tuple[dict | None, str | None]:
    """返回 (数据, 错误信息)。没有 Node 或读不到数据时返回 (None, 原因)。"""
    node = find_node()
    if not node:
        return None, "找不到 node，跳过站点数据校验"

    loader = ROOT / ".lint-loader.cjs"
    try:
        loader.write_text(LOADER_JS, encoding="utf-8")
        env = dict(os.environ, AIS_ROOT=str(ROOT))
        proc = subprocess.run(
            [node, str(loader)],
            capture_output=True, text=True, timeout=30, env=env,
        )
    except Exception as exc:  # noqa: BLE001
        return None, f"运行 node 失败：{exc}"
    finally:
        loader.unlink(missing_ok=True)

    if proc.returncode != 0:
        return None, f"data/*.js 加载失败：{proc.stderr.strip()[:400]}"

    try:
        return json.loads(proc.stdout), None
    except json.JSONDecodeError as exc:
        return None, f"data 输出不是合法 JSON：{exc}"


def check_site(errors: list[str]) -> int:
    """校验 data/projects.js 与 data/<id>.js 的一致性与完整性。"""
    data, reason = load_site_data()
    if data is None:
        print(f"! {reason}", file=sys.stderr)
        return 0

    projects = data.get("projects") or []
    all_items = data.get("items") or {}

    if not projects:
        errors.append("data/projects.js: 至少要有一个子项目")
        return 0

    seen_ids: set[str] = set()
    seen_nos: list[int] = []

    for p in projects:
        pid = (p or {}).get("id", "<无 id>")
        where = f"data/projects.js[{pid}]"

        if not p.get("id"):
            errors.append(f"{where}: 缺少 id")
            continue
        if not ID_RE.match(p["id"]):
            errors.append(f"{where}: id `{p['id']}` 只能用小写字母/数字/中划线")
        if p["id"] in seen_ids:
            errors.append(f"{where}: id `{p['id']}` 重复")
        seen_ids.add(p["id"])

        for field in ("no", "name", "subtitle", "desc", "status"):
            if p.get(field) in (None, ""):
                errors.append(f"{where}: 缺少字段 `{field}`")

        if isinstance(p.get("no"), int):
            seen_nos.append(p["no"])
        if p.get("status") not in VALID_STATUS:
            errors.append(f"{where}: status `{p.get('status')}` 只能是 {'/'.join(VALID_STATUS)}")

        data_key = p.get("dataKey")
        if p.get("status") == "ready" and not data_key:
            errors.append(f"{where}: status 为 ready 但没有 dataKey，页面拿不到内容")
            continue
        if not data_key:
            continue

        bundle = all_items.get(data_key)
        if not bundle:
            errors.append(f"{where}: dataKey `{data_key}` 找不到对应数据（应为 data/{data_key}.js）")
            continue

        data_file = DATA_DIR / f"{data_key}.js"
        if not data_file.exists():
            errors.append(f"{where}: 缺少数据文件 data/{data_key}.js")

        items = bundle.get("items") or []
        if not items:
            errors.append(f"data/{data_key}.js: items 为空")
            continue
        if not bundle.get("note"):
            errors.append(f"data/{data_key}.js: 缺少 note（页面顶部的用法说明）")

        declared_groups = p.get("groups") or []
        used_groups = {it.get("group") for it in items}
        for g in sorted(used_groups - set(declared_groups)):
            errors.append(
                f"data/{data_key}.js: 分组 `{g}` 没有登记在 projects.js 的 groups 里"
            )
        for g in declared_groups:
            if g not in used_groups:
                errors.append(f"data/{data_key}.js: projects.js 里声明的分组 `{g}` 下没有内容")

        item_ids: set[str] = set()
        nos = []
        for it in items:
            iid = it.get("id", "<无 id>")
            where_item = f"data/{data_key}.js[{iid}]"

            if not it.get("id") or not ID_RE.match(it["id"]):
                errors.append(f"{where_item}: id 缺失或格式非法（小写字母/数字/中划线）")
            if it.get("id") in item_ids:
                errors.append(f"{where_item}: id 重复")
            item_ids.add(it.get("id"))

            for field in ("no", "name", "en", "group", "desc", "prompt"):
                if not it.get(field):
                    errors.append(f"{where_item}: 缺少字段 `{field}`")

            if not it.get("keywords"):
                errors.append(f"{where_item}: keywords 不能为空")
            if it.get("prompt") and "[subject]" not in it["prompt"]:
                errors.append(f"{where_item}: prompt 里缺少 [subject] 占位符")
            if isinstance(it.get("no"), int):
                nos.append(it["no"])

        if nos and sorted(nos) != list(range(1, len(nos) + 1)):
            errors.append(
                f"data/{data_key}.js: no 字段应是 1..{len(nos)} 连续编号，"
                f"当前为 {sorted(nos)[:5]}{'…' if len(nos) > 5 else ''}"
            )

    if seen_nos and sorted(seen_nos) != list(range(1, len(seen_nos) + 1)):
        errors.append(
            f"data/projects.js: no 字段应是 1..{len(seen_nos)} 连续编号，当前为 {sorted(seen_nos)}"
        )

    declared_keys = {p.get("dataKey") for p in projects if p.get("dataKey")}
    for key in all_items:
        if key not in declared_keys:
            errors.append(f"data/{key}.js: 这个数据文件没有被任何子项目引用")

    return sum(len(all_items.get(k, {}).get("items", [])) for k in declared_keys)


# --------------------------------------------------------------------------- #


def main() -> int:
    parser = argparse.ArgumentParser(description="校验并生成 ai-image-skills 索引")
    parser.add_argument("--check", action="store_true", help="只校验，不写文件")
    args = parser.parse_args()

    errors: list[str] = []
    prompts = check_prompts(errors)
    skills = check_skills(errors)
    site_items = check_site(errors)

    write_index(PROMPTS_DIR / "README.md", render_prompt_index(prompts), args.check)
    write_index(SKILLS_DIR / "README.md", render_skill_index(skills), args.check)

    if errors:
        print(f"\n发现 {len(errors)} 个问题：\n", file=sys.stderr)
        for err in errors:
            print(f"  ✗ {err}", file=sys.stderr)
        print("", file=sys.stderr)
        return 1

    print(
        f"✓ 通过：{len(prompts)} 个 prompt 模板，{len(skills)} 个技能包，"
        f"{site_items} 条站点内容"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
