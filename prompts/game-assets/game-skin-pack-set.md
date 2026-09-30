---
id: game-skin-pack-set
title: 游戏 UI 皮肤包（成套出图）
category: game-assets
tags: [皮肤包, UI, 成套, 透明底, 换皮]
models: [ImageGen, Midjourney, 即梦]
aspect_ratio: "1:1"
variables: [THEME, ELEMENT, STYLE_REF, COLOR_SCHEME]
version: 1.0.0
updated: 2026-10-01
---

# 游戏 UI 皮肤包（成套出图）

## 用途

为同一个主题批量产出成套 UI 素材（按钮、底框、徽章、装饰件），
保证整套风格统一、可直接替换默认皮肤。

## 适用 / 不适用

- ✅ 适用：节日活动换皮、赛季主题皮肤包，需要 10+ 张同风格素材
- ❌ 不适用：单个控件微调 → 用 `ui/game-ui-button`
- ❌ 不适用：纯功能图标（设置/关闭）→ 用 `ui/` 分类下模板

## 变量

| 变量 | 必填 | 说明 | 示例 |
| --- | --- | --- | --- |
| `{{THEME}}` | 是 | 皮肤主题 | 敦煌壁画 / 赛博霓虹 / 春节红金 |
| `{{ELEMENT}}` | 是 | 本次要出的那一个控件 | primary button, normal state |
| `{{STYLE_REF}}` | 否 | 风格参考物 | Chinese Dunhuang murals, weathered mineral pigments |
| `{{COLOR_SCHEME}}` | 是 | 主色方案 | warm gold and deep crimson with turquoise accents |

## Prompt

```
game UI asset, {{ELEMENT}}, theme: {{THEME}}, {{STYLE_REF}}, {{COLOR_SCHEME}} color scheme,
highly polished mobile game UI art, clean vector-like shapes, subtle inner glow,
centered composition, isolated on transparent background, flat front view, no perspective,
consistent art direction with a cohesive asset set, crisp anti-aliased edges,
professional game asset render, 1:1 square
```

**成套出图的关键**：一次会话里只换 `{{ELEMENT}}`，其余变量全部锁定不动。
换主题时才改 `{{THEME}}` / `{{STYLE_REF}}` / `{{COLOR_SCHEME}}`。

## 负面词

```
photorealistic, 3d render look, heavy drop shadow, cluttered background, text, letters,
watermark, signature, multiple elements, perspective view, tilted, low contrast, blurry,
jpeg artifacts, inconsistent style
```

## 出图参数

- 比例：1:1
- 建议尺寸：与项目默认皮肤素材的实际像素一致（照抄默认图，不要放大）
- 背景：透明（PNG-32）
- 采样步数：中等偏高，保证边缘干净

## 验收要点

出图后按这几条检查，不达标就重跑或改 prompt：

- [ ] 与同套其他素材并排看，风格、笔触、光向一致
- [ ] 透明底干净，无白边/黑边/半透明脏边
- [ ] 无文字、水印、多余装饰
- [ ] 尺寸与默认皮肤素材实际像素一致（用脚本校验，不靠肉眼）

## 备注

- 成套出图最容易翻车的是**光向不一致**。prompt 里明确写光照方向能显著改善；
  否则建议先用一张图跑通，再把这张图作为参考图做图生图统一其余素材。
- 中文字体类元素不要交给出图模型，文字一律后期叠加。
