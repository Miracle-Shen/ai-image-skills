#!/usr/bin/env python3
"""校验 ai-image-skills 仓库的 prompt 模板与 skill 包，并重新生成索引表。

用法::

    python3 tools/lint.py            # 校验 + 刷新索引
    python3 tools/lint.py --check    # 只校验、不写文件；有错则退出码 1

校验内容见 docs/CONVENTIONS.md 第六节。
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROMPTS_DIR = ROOT / "prompts"
SKILLS_DIR = ROOT / "skills"

CATEGORIES = ["game-assets", "character", "scene", "ui", "style"]
REQUIRED_PROMPT_FIELDS = ["id", "title", "category", "tags", "version", "updated"]

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


def main() -> int:
    parser = argparse.ArgumentParser(description="校验并生成 ai-image-skills 索引")
    parser.add_argument("--check", action="store_true", help="只校验，不写文件")
    args = parser.parse_args()

    errors: list[str] = []
    prompts = check_prompts(errors)
    skills = check_skills(errors)

    write_index(PROMPTS_DIR / "README.md", render_prompt_index(prompts), args.check)
    write_index(SKILLS_DIR / "README.md", render_skill_index(skills), args.check)

    if errors:
        print(f"\n发现 {len(errors)} 个问题：\n", file=sys.stderr)
        for err in errors:
            print(f"  ✗ {err}", file=sys.stderr)
        print("", file=sys.stderr)
        return 1

    print(f"✓ 通过：{len(prompts)} 个 prompt 模板，{len(skills)} 个技能包")
    return 0


if __name__ == "__main__":
    sys.exit(main())
