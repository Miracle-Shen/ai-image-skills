---
id: scene-background
title: 场景背景 / 氛围图
category: scene
tags: [背景, 场景, 横幅, 氛围, 无人物]
models: [ImageGen, Midjourney, 即梦]
aspect_ratio: "16:9"
variables: [SCENE, TIME_OF_DAY, MOOD, ART_STYLE]
version: 1.0.0
updated: 2026-10-01
---

# 场景背景 / 氛围图

## 用途

生成无人物的环境图：关卡背景、活动横幅、开场加载页。

## 适用 / 不适用

- ✅ 适用：纯环境画面，需要留出 UI 叠字空间
- ❌ 不适用：画面里有人物是主体 → 用 `character/`
- ❌ 不适用：需要和已有图风格统一 → 用 `style/`

## 变量

| 变量 | 必填 | 说明 | 示例 |
| --- | --- | --- | --- |
| `{{SCENE}}` | 是 | 环境描述 | a floating temple courtyard among clouds in ancient China |
| `{{TIME_OF_DAY}}` | 是 | 时间与光照 | golden hour, low warm sunlight |
| `{{MOOD}}` | 是 | 气氛 | serene and epic, mystical |
| `{{ART_STYLE}}` | 是 | 画风 | highly detailed digital painting, matte painting style |

## Prompt

```
{{SCENE}}, {{TIME_OF_DAY}}, {{MOOD}}, {{ART_STYLE}},
wide establishing shot, no characters, no people,
strong depth with layered foreground midground background,
atmospheric perspective and volumetric light, rich but readable color palette,
empty sky area at top reserved for UI text overlay,
cinematic composition, high resolution environment concept art
```

## 负面词

```
people, characters, humans, animals, text, letters, watermark, signature,
logo, ui elements, buttons, frame, border, blurry, lowres, flat lighting, empty foreground
```

## 出图参数

- 比例：16:9（横幅）/ 9:16（竖版移动端）
- 建议尺寸：1920×1080（横幅）/ 1080×1920（竖版）
- 背景：不透明

## 验收要点

出图后按这几条检查，不达标就重跑或改 prompt：

- [ ] 画面里确实没有人物（模型很容易硬加剪影）
- [ ] 顶部/底部预留了叠字空间，放 UI 不打架
- [ ] 明暗层次分明，缩到手机尺寸仍能看清主体
- [ ] 无明显重复纹理、无鬼影

## 备注

- 移动端竖版背景建议**单独出一版**，不要拿横幅裁剪 —— 裁剪后构图重心会丢。
- 需要同一场景的日/夜/雨等变体时，锁定其余变量只改 `{{TIME_OF_DAY}}`，
  或拿第一张做参考图。
