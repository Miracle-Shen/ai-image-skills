---
id: character-portrait
title: 角色立绘 / 头像
category: character
tags: [角色, 头像, 二次元, 单图, 人物]
models: [ImageGen, Midjourney, 即梦]
aspect_ratio: "3:4"
variables: [CHARACTER, OUTFIT, MOOD, ART_STYLE]
version: 1.0.0
updated: 2026-10-01
---

# 角色立绘 / 头像

## 用途

生成单个角色的立绘或头像：半身构图、明确表情、可指定服装与画风。

## 适用 / 不适用

- ✅ 适用：NPC 立绘、玩家头像、宣传图人物
- ❌ 不适用：输入是已有图要改风格 → 用 `style/`
- ❌ 不适用：人物只是场景里的点缀 → 用 `scene/`

## 变量

| 变量 | 必填 | 说明 | 示例 |
| --- | --- | --- | --- |
| `{{CHARACTER}}` | 是 | 角色描述（性别/年龄/身份/特征） | a young female archer with silver braided hair and a scar on her left cheek |
| `{{OUTFIT}}` | 是 | 服装 | dark green leather ranger armor with a fur-lined hood |
| `{{MOOD}}` | 是 | 情绪与表情 | calm and determined, slight confident smile |
| `{{ART_STYLE}}` | 是 | 画风 | high-quality anime illustration, cel shading |

## Prompt

```
character portrait of {{CHARACTER}}, wearing {{OUTFIT}}, {{MOOD}},
{{ART_STYLE}}, half-body composition, eye-level camera, looking at viewer,
soft directional lighting, clean rim light separating subject from background,
detailed eyes with catchlights, clean line art, plain neutral background,
high resolution, professional character design sheet quality
```

## 负面词

```
deformed hands, extra fingers, extra limbs, asymmetric eyes, mutated face,
blurry, lowres, jpeg artifacts, watermark, signature, text, multiple characters,
busy background, oversaturated, plastic skin
```

## 出图参数

- 比例：3:4（立绘）/ 1:1（头像）
- 建议尺寸：768×1024（立绘）/ 512×512（头像）
- 背景：纯色或简单渐变，方便后期抠图

## 验收要点

出图后按这几条检查，不达标就重跑或改 prompt：

- [ ] 五官正常，无多指/断肢/错位眼睛
- [ ] 视线朝向正确，双眼大小一致
- [ ] 服装细节与描述相符
- [ ] 背景干净，抠图后无残留

## 备注

- **手部是重灾区**。如果画面里手不是重点，构图时直接裁掉手（半身往上）。
- 需要同一角色的多个表情/角度时，先用一张满意的图做参考图，再图生图，
  比纯文字重跑更稳定。
- 想固定角色长相，最可靠的办法是**训练一个轻量角色 LoRA**，纯 prompt 做不到。
