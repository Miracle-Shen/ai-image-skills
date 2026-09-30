---
id: _TEMPLATE
title: 模板骨架（复制这个文件）
category: game-assets
tags: [占位]
models: []
aspect_ratio: "1:1"
variables: [SUBJECT, STYLE]
version: 1.0.0
updated: 2026-10-01
---

# 模板骨架（复制这个文件）

> 复制命令：`cp prompts/_TEMPLATE.md prompts/<分类>/<新id>.md`
> 复制后必须改：`id`（与文件名一致）、`title`、`category`、`tags`、`variables`、`updated`。
> 写完后跑 `python3 tools/lint.py`。

## 用途

一句话说清这个模板出什么图。例如：生成透明底的游戏道具图标，方形构图、居中、无阴影。

## 适用 / 不适用

- ✅ 适用：需要方形透明底道具图标、用于背包/商店的场景
- ❌ 不适用：需要带场景氛围的插画 → 用 `scene/` 下的模板

## 变量

| 变量 | 必填 | 说明 | 示例 |
| --- | --- | --- | --- |
| `{{SUBJECT}}` | 是 | 画面主体 | golden health potion bottle |
| `{{STYLE}}` | 是 | 美术风格 | hand-painted cartoon, thick outlines |

## Prompt

```
a single {{SUBJECT}}, {{STYLE}}, centered composition, isolated on transparent background,
soft top-left lighting, crisp edges, high detail, no shadow cast on background,
game asset, 1:1 square
```

## 负面词

```
blurry, jpeg artifacts, text, watermark, extra objects, cluttered background,
drop shadow, multiple items, realistic photo
```

## 出图参数

- 比例：1:1
- 建议尺寸：512×512
- 背景：透明（PNG-32）

## 验收要点

出图后按这几条检查，不达标就重跑或改 prompt：

- [ ] 背景干净可抠，边缘无半透明脏边
- [ ] 主体居中，四周留白均匀
- [ ] 无文字、水印、多余元素
- [ ] 同类图标放在一起，风格一致

## 备注

写踩过的坑、不同模型的差异、可选加强方向。
