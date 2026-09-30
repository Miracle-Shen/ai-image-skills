---
id: style-transfer
title: 风格化 / 图生图 / 重绘
category: style
tags: [图生图, 风格迁移, 重绘, 扩图, 二次编辑]
models: [ImageGen, Midjourney, 即梦]
aspect_ratio: "keep"
variables: [TARGET_STYLE, STRENGTH, KEEP]
version: 1.0.0
updated: 2026-10-01
---

# 风格化 / 图生图 / 重绘

## 用途

以已有图为输入，改写风格、重绘细节、扩展画幅，同时保住原图的结构与主体。

## 适用 / 不适用

- ✅ 适用：线稿上色、照片转动漫、草图出成品、扩图改比例
- ❌ 不适用：纯文字从零出图 → 按内容选 `character/` `scene/` `game-assets/`
- ❌ 不适用：只想抠图/去水印这类确定性任务 → 用图像处理工具，不要用生成模型

## 变量

| 变量 | 必填 | 说明 | 示例 |
| --- | --- | --- | --- |
| `{{TARGET_STYLE}}` | 是 | 目标风格 | anime cel-shaded illustration with clean line art |
| `{{STRENGTH}}` | 是 | 改写强度（低=贴近原图，高=接近重画） | low / medium / high |
| `{{KEEP}}` | 是 | 必须保留的内容 | character pose, face, and outfit design |

## Prompt

```
restyle this image into {{TARGET_STYLE}},
preserve {{KEEP}}, keep the original composition and camera framing unchanged,
fix only rendering and detail, do not add or remove objects,
consistent lighting, clean edges, no text, high resolution
```

> 注意：图生图的**强度参数在工具侧设置，不在 prompt 里**。
> prompt 里写 `{{STRENGTH}}` 只是提醒这次该调多少，实际要动滑杆。
> 映射参考：low ≈ 0.25–0.35，medium ≈ 0.45–0.6，high ≈ 0.7–0.85。

## 负面词

```
changed pose, changed face, different character, extra limbs, altered composition,
added objects, removed objects, text, watermark, blurry, artifacts, oversmoothed
```

## 出图参数

- 比例：与原图一致（扩图场景除外）
- 强度：见上方映射
- 其他：保持与原图相同的分辨率档位，避免二次压缩

## 验收要点

出图后按这几条检查，不达标就重跑或改 prompt：

- [ ] 原图结构、姿势、构图没被改动
- [ ] 风格确实变了，不是只换了滤镜
- [ ] 没有新增/丢失物体
- [ ] 与输入图并排看，主体轮廓能对上

## 备注

- **强度是最关键的旋钮**：太高会改结构（人物变脸、物体消失），
  太低等于没改。建议从 0.4 试起，一次调 0.1。
- 「保住结构」最有效的做法不是堆 prompt，而是**加 ControlNet / 参考图权重**
  这类结构约束（工具支持的话）。
- 扩图（outpainting）要用工具的专用模式，不要用普通图生图硬试。
