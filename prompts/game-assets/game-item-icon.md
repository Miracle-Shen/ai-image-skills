---
id: game-item-icon
title: 游戏道具图标（方形透明底）
category: game-assets
tags: [图标, 道具, 透明底, 单图, 3D渲染]
models: [ImageGen, Midjourney, 即梦]
aspect_ratio: "1:1"
variables: [ITEM, RARITY, STYLE]
version: 1.0.0
updated: 2026-10-01
---

# 游戏道具图标（方形透明底）

## 用途

生成背包 / 商店 / 掉落用的道具图标：单物件、方形构图、透明底、无投影。

## 适用 / 不适用

- ✅ 适用：药水、武器、宝石、材料等单件道具，需要整齐排列在网格里
- ❌ 不适用：有场景氛围的插画 → 用 `scene/`
- ❌ 不适用：纯功能图标（设置、关闭）→ 用 `ui/`

## 变量

| 变量 | 必填 | 说明 | 示例 |
| --- | --- | --- | --- |
| `{{ITEM}}` | 是 | 道具本体 | a health potion bottle filled with red liquid |
| `{{RARITY}}` | 否 | 品质，影响光效强度 | legendary (strong golden aura) / common (no aura) |
| `{{STYLE}}` | 是 | 美术风格 | stylized 3D game asset, Pixar-like rendering |

## Prompt

```
a single {{ITEM}}, {{STYLE}}, rarity: {{RARITY}}, centered in frame, three-quarter view,
isolated on transparent background, soft studio lighting from upper left,
subtle rim light defining silhouette, glossy highlights, high detail,
game inventory icon, fills about 80 percent of the frame, 1:1 square
```

## 负面词

```
multiple items, background scene, floor, cast shadow, text, numbers, watermark,
blurry, low poly, pixelated, jpeg artifacts, cluttered, human hands, frame border
```

## 出图参数

- 比例：1:1
- 建议尺寸：512×512（或与项目图标格一致）
- 背景：透明（PNG-32）

## 验收要点

出图后按这几条检查，不达标就重跑或改 prompt：

- [ ] 主体占画面约 80%，四周留白均匀
- [ ] 无地面、无投影、无背景元素
- [ ] 轮廓清晰，缩到 64×64 仍可辨认
- [ ] 同品质道具的光效强度一致

## 备注

- 品质光效（`{{RARITY}}`）如果模型表现不稳定，建议**出图后再后期叠加**
  光效层，比让模型直接画更可控。
- 缩到小尺寸糊掉是常态，验收时一定要按目标最小尺寸看一眼。
