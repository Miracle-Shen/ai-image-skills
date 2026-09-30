# ai-image-skills

AI 生图任务的 **Prompt 模板** 与 **Skill 技能包** 集合。

一个地方存放、版本化、复用所有「要 AI 出图」的提示词资产 —— 出图前先来这里翻，
而不是每次从零重写一段 prompt。

**浏览入口：双击 `index.html`**（无需装任何东西，浏览器直接打开）。

---

## 怎么用

打开 `index.html` → 看到所有子项目 → 点进去 → 展开某一条 → 复制 Prompt。

展开是故意的：卡片默认只显示风格名和一句话特征，**点一下才展开**，避免一屏糊满
长文本。

---

## 子项目

站点按「子项目」组织，每个子项目解决一类出图问题。

| # | 子项目 | 内容 | 状态 |
| --- | --- | --- | --- |
| 01 | **AI 生图 · 风格 Prompt** | 50 种绘画风格，每种一个可直接用的 Prompt | ✅ 已上线 |
| 02 | 待规划 | — | 占位 |

### 子项目 01 明细

50 种风格分 5 组：

| 分组 | 数量 | 举例 |
| --- | --- | --- |
| 动画与插画 | 12 | 吉卜力、新海诚、皮克斯、蜘蛛侠平行宇宙 |
| 传统绘画 | 12 | 油画、水墨、浮世绘、印象派 |
| 摄影与电影 | 9 | 电影感、韦斯·安德森、胶片、移轴 |
| 数字与未来 | 10 | 赛博朋克、蒸汽波、像素艺术、故障艺术 |
| 3D 渲染与手工材质 | 7 | UE5、黏土定格、纸雕、敦煌壁画、青花瓷 |

每条包含：中文名 / 英文名 / 一句话特征 / 关键词 / **Prompt 正文** / 负面词 / 使用提示。

> Prompt 里的 `[subject]` 是**主体占位符**。复制后把它换成你要画的东西，例如
> `[subject]` → `a girl reading by a window`。后面的风格关键词不要动。

---

## 目录结构

```
ai-image-skills/
├── index.html                 ← 浏览入口，双击打开
├── assets/
│   ├── app.css                样式
│   └── app.js                 路由 / 渲染 / 复制
├── data/
│   ├── projects.js            子项目注册表（新子项目在这里登记）
│   └── style-prompt.js        子项目 01 的 50 条内容
├── docs/
│   ├── CONVENTIONS.md         命名 / 字段 / 写法规范
│   └── CATEGORIES.md          分类体系与归类判断
├── prompts/                   按出图场景分类的 Prompt 模板（.md）
├── skills/                    多步骤流程的技能包
├── examples/                  完整出图案例（含踩坑记录）
└── tools/
    └── lint.py                校验全部资产 + 刷新索引
```

**`data/` 与 `prompts/` 的区别**：两者都是 prompt，但组织维度不同。
`data/` 给站点用，按**艺术风格**组织；`prompts/` 给人用，按**出图场景**组织。
互不干扰，各取所需。

---

## 两条使用路径

| 场景 | 去哪 | 怎么用 |
| --- | --- | --- |
| 想找个风格试试 | `index.html` | 搜索或按分组筛 → 展开 → 复制 |
| 要用现成模板出图 | `prompts/README.md` | 索引表找 → 打开 `.md` → 替换 `{{变量}}` |
| 要跑多步骤流程 | `skills/` | 直接让 AI 加载对应技能包 |

---

## 加内容

**加一条风格（子项目 01）：**

编辑 `data/style-prompt.js`，往 `items` 里追加一条，然后：

```bash
python3 tools/lint.py
```

它会检查：id 唯一、编号连续、分组已在 `projects.js` 登记、prompt 含 `[subject]`。

**加一个新子项目：**

1. 新建 `data/<子项目id>.js`，按 `style-prompt.js` 的结构写
2. 在 `data/projects.js` 里追加一条，`dataKey` 指向该文件
3. 在 `index.html` 里加一行 `<script src="data/<子项目id>.js"></script>`
4. `python3 tools/lint.py` 校验

不需要改 `app.js` —— 页面会自动生成新入口。

**加一个 Prompt 模板：**

```bash
cp prompts/_TEMPLATE.md prompts/game-assets/my-new-template.md
python3 tools/lint.py
```

**加一个技能包：**

```bash
cp -r skills/_template skills/my-skill-name
```

---

## 维护

```bash
python3 tools/lint.py           # 校验 + 刷新索引
python3 tools/lint.py --check   # 只校验，CI 用；有问题退出码非 0
```

校验覆盖：markdown 模板字段、技能包结构、站点数据一致性。
改完任何东西都跑一次。

---

## License

仓库暂未指定开源协议。若打算对外分享，建议补一个 `LICENSE`（MIT 是常见默认选择）。
