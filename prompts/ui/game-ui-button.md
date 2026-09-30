---
id: game-ui-button
title: UI 控件（按钮 / 底框 / 进度条）
category: ui
tags: [UI, 控件, 按钮, 透明底, 九宫格]
models: [ImageGen, Midjourney, 即梦]
aspect_ratio: "1:1"
variables: [CONTROL_TYPE, STATE, ART_STYLE, COLOR_SCHEME]
version: 1.0.0
updated: 2026-10-01
---

# UI 控件（按钮 / 底框 / 进度条）

## 用途

生成单个 UI 控件素材：按钮、弹窗底框、进度条、标签底板。透明底、正视、无透视。

## 适用 / 不适用

- ✅ 适用：需要拼进界面的控件零件，要能拉伸/九宫格切
- ❌ 不适用：属于某个皮肤包成套产出 → 用 `game-assets/game-skin-pack-set`
- ❌ 不适用：纯功能小图标（设置、关闭）→ 见备注，建议直接用手绘图标库

## 变量

| 变量 | 必填 | 说明 | 示例 |
| --- | --- | --- | --- |
| `{{CONTROL_TYPE}}` | 是 | 控件类型 | a rounded rectangle primary button |
| `{{STATE}}` | 是 | 交互态 | normal / pressed / disabled |
| `{{ART_STYLE}}` | 是 | 美术风格 | clean flat mobile game UI, subtle bevel |
| `{{COLOR_SCHEME}}` | 是 | 配色 | warm gold border with deep red fill |

## Prompt

```
{{CONTROL_TYPE}}, {{STATE}} state, {{ART_STYLE}}, {{COLOR_SCHEME}},
flat front view, no perspective, no rotation, perfectly horizontal,
isolated on transparent background, uniform border thickness,
symmetric design, empty center area for text placement,
crisp edges, game UI element, 1:1 square
```

## 负面词

```
text, letters, numbers, icons inside, perspective, 3d rotation, drop shadow,
background scene, multiple elements, asymmetric, uneven borders, blurry,
gradient banding, photorealistic
```

## 出图参数

- 比例：1:1
- 建议尺寸：与项目默认控件素材实际像素一致
- 背景：透明（PNG-32）

## 验收要点

出图后按这几条检查，不达标就重跑或改 prompt：

- [ ] 水平正视，没有透视变形（歪一点点就没法九宫格切）
- [ ] 四边对称，边框粗细一致
- [ ] 中间留空可以放文字
- [ ] 同组控件（normal / pressed / disabled）尺寸与边框完全对齐

## 备注

- **九宫格切图要求极高**：边框必须严格水平对称。模型出图很难一次到位，
  常见做法是让模型出「风格与配色」，边框结构**用代码或设计工具重画**。
- 功能小图标（设置、关闭、返回）用现成图标库比出图更划算 —— 出图在此类任务上
  既慢又不稳定。
- 需要 normal / pressed / disabled 三态时，一次会话里只改 `{{STATE}}`，
  其余全锁。
