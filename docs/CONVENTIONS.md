# 规范

写任何新模板 / 新技能前先读一遍。规范的目的只有一个：**让别人（以及三个月后的你）
能靠索引找到、能直接复制粘贴用、不用猜。**

---

## 一、Prompt 模板格式

每个模板是一个 `.md` 文件，结构固定为 **frontmatter + 正文**。

### 1. Frontmatter

```yaml
---
id: game-skin-pack-set
title: 游戏 UI 皮肤包（成套出图）
category: game-assets
tags: [皮肤包, UI, 透明底, 成套]
models: [ImageGen, Midjourney, 即梦]
aspect_ratio: "1:1"
variables: [THEME, ELEMENT, STYLE_REF]
version: 1.0.0
updated: 2026-10-01
---
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | ✅ | 唯一标识，全小写中划线。**必须与文件名一致** |
| `title` | ✅ | 人读的标题，中文 |
| `category` | ✅ | 必须是 `game-assets` / `character` / `scene` / `ui` / `style` 之一 |
| `tags` | ✅ | 内联数组，用于搜索。3–6 个 |
| `models` | ⬜ | 验证过能用的出图工具/模型 |
| `aspect_ratio` | ⬜ | 建议比例，如 `"1:1"` `"9:16"` `"16:9"` |
| `variables` | ⬜ | 正文里用到的变量名（不带花括号），全大写 |
| `version` | ✅ | 语义化版本 `x.y.z`。改正文 +1 patch，改结构/变量 +1 minor |
| `updated` | ✅ | 最后修改日期 `YYYY-MM-DD` |

> `aspect_ratio` 的值**要加引号**，否则 `1:1` 在严格 YAML 解析器里会报错。

### 2. 正文段落（顺序固定）

```markdown
# {{title}}

## 用途
一句话说清这个模板出什么图。

## 适用 / 不适用
- ✅ 适用：……
- ❌ 不适用：……（并指向应该用哪个模板）

## 变量
| 变量 | 必填 | 说明 | 示例 |
| --- | --- | --- | --- |
| `{{THEME}}` | 是 | 主题 | 敦煌壁画 |

## Prompt

```
（这里是可以直接复制的 prompt 正文，含 {{变量}}）
```

## 负面词

```
（negative prompt）
```

## 出图参数
- 比例：1:1
- 建议尺寸：512×512
- 背景：透明（PNG-32）

## 验收要点
出图后按这几条检查，不达标就重跑或改 prompt：
- [ ] ……

## 备注
踩过的坑、模型差异、可选的加强方向。
```

**「Prompt」和「负面词」两个段落里的代码块必须是干净的** —— 只放 prompt 本身，
不要混入中文注释。这样复制即用。

---

## 三、变量写法

- 格式：`{{VARIABLE_NAME}}`，双花括号，**全大写 + 下划线**
- 只在正文出现；frontmatter 的 `variables` 里列出名字（不带花括号）
- 每个变量都要在「变量」表里有说明和示例
- 变量不要超过 6 个 —— 超过就说明这个模板该拆了

**正确**：`a {{STYLE}} style game UI button, {{COLOR_SCHEME}} color scheme`
**错误**：`a 敦煌 style game UI button`（硬编码，不可复用）

---

## 四、命名

| 对象 | 规则 | 例 |
| --- | --- | --- |
| 模板文件 | `<id>.md` | `game-skin-pack-set.md` |
| 技能目录 | 小写中划线 | `skills/skin-pack-batch/` |
| 技能内脚本 | 小写下划线 `.py` | `verify_sizes.py` |
| 技能内文档 | 全大写 `.md` | `CHECKLIST.md` |

`id` 命名建议：`<领域>-<对象>-<产出形态>`，例：
`game-icon-item`、`character-avatar-round`、`scene-battle-background`。

---

## 五、图片与产出

- **不要往仓库里塞生成结果的大图**。仓库是模板库，不是素材库。
- 需要示意效果时，放 `examples/` 下，且单图 ≤ 500KB，统一压缩过。
- 出图产物放各自项目目录，不要提到这个仓库。

---

## 六、提交前自检

```bash
python3 tools/lint.py --check
```

校验项：

- frontmatter 字段齐全、`category` 合法、`version` 格式正确
- `id` 与文件名一致
- `variables` 声明的变量都在正文里出现过，且正文里的变量都声明了
- 技能目录必须有 `SKILL.md`，且 frontmatter 有 `name` / `description`
- 站点数据：子项目与数据文件一一对应、item 的 `id` 唯一、`no` 连续、
  `group` 已在 `projects.js` 登记、`prompt` 含 `[subject]`

有任何一项不过，退出码非 0。

---

## 七、子项目与站点数据

站点只有一个页面（`index.html`），内容全部来自 `data/`。**加子项目不用改前端代码。**

### 数据结构

`data/projects.js` —— 子项目注册表：

```js
window.AIS_PROJECTS = [
  { id, no, name, subtitle, desc, unit, status, groups, dataKey, accent }
];
```

`data/<dataKey>.js` —— 该子项目的内容：

```js
window.AIS_ITEMS['<dataKey>'] = {
  note: '页面顶部的用法说明',
  items: [ { id, no, name, en, group, desc, keywords, prompt, negative, tip } ]
};
```

| 字段 | 说明 |
| --- | --- |
| `id` | 小写字母/数字/中划线，**在本子项目内唯一** |
| `no` | 展示用编号，**必须从 1 连续**（lint 会查） |
| `group` | 必须出现在父子项目的 `groups` 数组里 |
| `prompt` | **必须含 `[subject]` 占位符**（lint 会查） |
| `keywords` | 非空数组，页面会渲染成标签 |
| `image` | 参考图文件名（**只写文件名，不带路径**）。缺省时页面显示「参考图待补」占位块 |
| `negative` / `tip` | 可选，但强烈建议都写 |

### 参考图（图与 prompt 成组）

**一张参考图配一个 prompt**，图片放在 `assets/refs/<子项目id>/`：

```js
{ id: 'ghibli', ..., image: 'ghibli.jpg' }   // → assets/refs/style-prompt/ghibli.jpg
```

| 项 | 要求 |
| --- | --- |
| 文件名 | 与条目 `id` 完全一致 |
| 体积 | **≤ 500KB**（lint 硬校验） |
| 格式 | `.jpg` 优先，也支持 `.png` / `.webp` / `.avif` |
| 尺寸 | 长边 1200px 左右 |

`lint` 会双向检查：写了 `image` 但文件不存在 → 报错；目录里有图没被引用 → 报错。

页面表现：卡片顶部是参考图（点击放大），下方是标题，展开后才是 prompt。
图与 prompt 在视觉上是同一张卡片的上下两半，构成一组。

新增子项目时，项目级可以加 `imageCredit` 字段标注图片来源，会显示在标题下方。

### 数据文件为什么是 `.js` 不是 `.json`

页面用 `<script src>` 加载数据，**不是 `fetch`**。
`file://` 下浏览器会拦截 `fetch` 本地文件（CORS），但 `<script src>` 可以。
所以双击 `index.html` 就能用，不需要起服务器。

**不要改成 `.json`。**

### 加一个新子项目

1. 新建 `data/<新id>.js`，挂到 `window.AIS_ITEMS['<新id>']`
2. `data/projects.js` 追加一条，`dataKey` 指向它
3. `index.html` 里加 `<script src="data/<新id>.js"></script>`
4. `python3 tools/lint.py`

`accent` 控制卡片左侧色条，用十六进制色值，例如 `#2f7fd9`。

### 编号约定

子项目的 `no` 从 1 连续。
未上线的子项目用 `status: 'planned'` + `dataKey: null`，页面会渲染成灰色占位卡，
不可点击。

