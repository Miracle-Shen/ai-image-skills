# 技能包索引

技能包用于**多步骤、可复用**的图像生成流程；单个 prompt 能搞定的事放 `prompts/`。

> 下表由 `python3 tools/lint.py` 自动生成，**不要手工编辑**。

<!-- INDEX:BEGIN -->

_（还没有技能包）_

<!-- INDEX:END -->

---

## 什么算一个技能包

满足任意一条就该做成技能包，而不是 prompt 模板：

- 需要**先读文档/规范**才能正确执行（比如要对照设计稿的 key 映射）
- 需要**跑脚本**（批量出图、校验尺寸、合并产物）
- 有**明确的多步骤流程**（生成 → 校验 → 重试 → 交付）
- 需要**踩坑知识**（哪个模型在哪类任务上会翻车）

## 技能包结构

```
skills/<skill-name>/
├── SKILL.md          必须。含 frontmatter(name, description) + 执行指引
├── reference/        可选。供 SKILL.md 引用的长文档
├── scripts/          可选。可执行脚本
└── assets/           可选。模板文件、示例
```

### SKILL.md frontmatter

```yaml
---
name: <skill-name>          # 必须与目录名一致
description: <一句话说明 + 触发词>   # 写清什么时候该用这个技能
agent_created: true         # 由 AI 创建的技能包保留此标记
---
```

### description 怎么写

description 是**唯一的触发入口**。写清「做什么 + 什么时候用 + 触发词」。

**好**：`批量生成游戏皮肤包并校验交付尺寸。当用户要出一整套皮肤、或要核对
出图尺寸是否与默认素材一致时使用。触发词：皮肤包批量、成套出图、尺寸校验。`

**差**：`图像生成相关技能。`（太笼统，永远不会被正确触发）

## 新建技能包

```bash
cp -r skills/_template skills/<skill-name>
# 编辑 SKILL.md，改 name 与 description
python3 tools/lint.py
```
