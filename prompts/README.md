# Prompt 模板索引

按分类浏览。找不到时直接在本文件里 `Cmd+F` 搜 tag。

> 下表由 `python3 tools/lint.py` 自动生成，**不要手工编辑**。
> 新增模板后跑一次脚本即可刷新。

<!-- INDEX:BEGIN -->

共 **6** 个模板。

### game-assets

| 模板 | 标题 | 标签 | 比例 | 变量 | 版本 | 更新 |
| --- | --- | --- | --- | --- | --- | --- |
| [game-item-icon](game-assets/game-item-icon.md) | 游戏道具图标（方形透明底） | `图标` `道具` `透明底` `单图` `3D渲染` | 1:1 | `ITEM` `RARITY` `STYLE` | 1.0.0 | 2026-10-01 |
| [game-skin-pack-set](game-assets/game-skin-pack-set.md) | 游戏 UI 皮肤包（成套出图） | `皮肤包` `UI` `成套` `透明底` `换皮` | 1:1 | `COLOR_SCHEME` `ELEMENT` `STYLE_REF` `THEME` | 1.0.0 | 2026-10-01 |

### character

| 模板 | 标题 | 标签 | 比例 | 变量 | 版本 | 更新 |
| --- | --- | --- | --- | --- | --- | --- |
| [character-portrait](character/character-portrait.md) | 角色立绘 / 头像 | `角色` `头像` `二次元` `单图` `人物` | 3:4 | `ART_STYLE` `CHARACTER` `MOOD` `OUTFIT` | 1.0.0 | 2026-10-01 |

### scene

| 模板 | 标题 | 标签 | 比例 | 变量 | 版本 | 更新 |
| --- | --- | --- | --- | --- | --- | --- |
| [scene-background](scene/scene-background.md) | 场景背景 / 氛围图 | `背景` `场景` `横幅` `氛围` `无人物` | 16:9 | `ART_STYLE` `MOOD` `SCENE` `TIME_OF_DAY` | 1.0.0 | 2026-10-01 |

### ui

| 模板 | 标题 | 标签 | 比例 | 变量 | 版本 | 更新 |
| --- | --- | --- | --- | --- | --- | --- |
| [game-ui-button](ui/game-ui-button.md) | UI 控件（按钮 / 底框 / 进度条） | `UI` `控件` `按钮` `透明底` `九宫格` | 1:1 | `ART_STYLE` `COLOR_SCHEME` `CONTROL_TYPE` `STATE` | 1.0.0 | 2026-10-01 |

### style

| 模板 | 标题 | 标签 | 比例 | 变量 | 版本 | 更新 |
| --- | --- | --- | --- | --- | --- | --- |
| [style-transfer](style/style-transfer.md) | 风格化 / 图生图 / 重绘 | `图生图` `风格迁移` `重绘` `扩图` `二次编辑` | keep | `KEEP` `STRENGTH` `TARGET_STYLE` | 1.0.0 | 2026-10-01 |

<!-- INDEX:END -->

---

## 怎么挑模板

1. **先想清楚产出是什么** —— 是控件？道具？人物？场景？还是改已有图？
2. 对照 `docs/CATEGORIES.md` 的「归类判断顺序」定位分类
3. 打开模板，替换 `{{变量}}`，按「出图参数」设置比例尺寸

## 现有分类

| 分类 | 目录 | 出处 |
| --- | --- | --- |
| 游戏素材 | `game-assets/` | 皮肤包、道具图标 |
| 角色人像 | `character/` | 立绘、头像 |
| 场景背景 | `scene/` | 关卡背景、横幅 |
| UI 控件 | `ui/` | 按钮、底框 |
| 风格化 | `style/` | 图生图、重绘、扩图 |

## 加新模板

```bash
cp prompts/_TEMPLATE.md prompts/<分类>/<新id>.md
# 编辑后：
python3 tools/lint.py
```
