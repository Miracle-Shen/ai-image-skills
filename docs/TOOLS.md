# 目录结构与工具

日常改内容时的操作手册。字段规范见 [CONVENTIONS.md](CONVENTIONS.md)。

---

## 目录结构

```
ai-image-skills/
├── index.html                 ← 浏览入口，双击打开
├── assets/
│   ├── app.css                样式
│   ├── app.js                 路由 / 渲染 / 复制
│   └── refs/<子项目id>/        参考图（文件名 = 条目 id）
├── data/
│   ├── projects.js            子项目注册表（新子项目在这里登记）
│   └── style-prompt.js        子项目 01 的 75 条内容
├── docs/
│   ├── CONVENTIONS.md         命名 / 字段 / 写法规范
│   ├── CATEGORIES.md          分类体系与归类判断
│   ├── TOOLS.md               本文件
│   └── screenshots/           README 用的站点截图
├── prompts/                   按出图场景分类的 Prompt 模板（.md）
├── skills/                    多步骤流程的技能包
├── examples/                  完整出图案例（含踩坑记录）
└── tools/
    ├── lint.py                校验全部资产 + 刷新索引
    ├── slice_atlas.py         把风格图谱长图切成单张参考图
    ├── slice_atlas.boxes.json 上面这个工具的人工校正表
    └── optimize_refs.py       参考图批量缩放 / 压缩到站点规格
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

## 校验与维护

```bash
python3 tools/lint.py           # 校验 + 刷新索引
python3 tools/lint.py --check   # 只校验，CI 用；有问题退出码非 0
```

校验覆盖：markdown 模板字段、技能包结构、站点数据一致性。
改完任何东西都跑一次。

---

## 加内容

**加一条风格（子项目 01）：**

编辑 `data/style-prompt.js`，往 `items` 里追加一条，然后：

```bash
python3 tools/lint.py
```

它会检查：id 唯一、编号连续、分组已在 `projects.js` 登记、prompt 含 `[subject]`、
参考图存在且不超过 500KB。

**加参考图：**

把原图丢进一个临时目录，跑（先干跑再真跑）：

```bash
PY=/Users/shenqi/.workbuddy/binaries/python/envs/default/bin/python
$PY tools/optimize_refs.py ~/Downloads/xhs --project style-prompt --dry-run
$PY tools/optimize_refs.py ~/Downloads/xhs --project style-prompt
```

产物落进 `assets/refs/style-prompt/`，把文件名改成条目 `id`，再去数据里补 `image` 字段。

**从风格图谱长图批量切图：**

```bash
$PY tools/slice_atlas.py <长图目录> --out <输出目录> --boxes tools/slice_atlas.boxes.json
```

自动按「卡片空隙 + 参考图列」定位每张卡片。版式由 AI 生成的图谱行高不齐，
个别图需要人工校正 —— 校正项写在 `slice_atlas.boxes.json` 里，键是输入顺序序号。

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

## 内容出处（子项目 01）

名称与说明转录自风格图谱原帖的 15 张长图（每张 5 条）。原图放在本机，不在仓库里。

原帖图谱里「超现实主义」出现了两次（第 3 条与第 10 条），两版参考图不同，都保留了 ——
一条偏达利的融化／扭曲，一条偏马格里特的漂浮并置。同理「国风／新中式」是总纲，
下面另有三条具体的国风分支。
