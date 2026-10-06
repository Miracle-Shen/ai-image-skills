# ai-image-skills

AI 生图任务的 **Prompt 模板** 与 **Skill 技能包** 集合。

一个地方存放、版本化、复用所有「要 AI 出图」的提示词资产 —— 出图前先来这里翻，
而不是每次从零重写一段 prompt。

**浏览入口：双击 `index.html`**（无需装任何东西，浏览器直接打开）。

---

## 怎么用

打开 `index.html` → 看到所有子项目 → 点进去 → 展开某一条 → 复制 Prompt。

展开是故意的：卡片默认只显示**参考图 + 风格名 + 一句话特征**，**点一下才展开**，
避免一屏糊满长文本。

**图和 prompt 是一组** —— 卡片上半是参考图（点图可放大看细节），下半展开才是
Prompt。看到图觉得对路，再复制那段 prompt。

---

## 子项目

站点按「子项目」组织，每个子项目解决一类出图问题。

| # | 子项目 | 内容 | 状态 |
| --- | --- | --- | --- |
| 01 | **AI 生图 · 风格 Prompt** | 75 种风格，每种一张参考图 + 一个可直接用的 Prompt | ✅ 已上线 |
| 02 | 待规划 | — | 占位 |

### 子项目 01 明细

75 种风格分 9 组：

| 分组 | 数量 | 举例 |
| --- | --- | --- |
| 绘画流派 | 10 | 巴洛克、洛可可、印象派、梵高、古典写实油画 |
| 东方美学 | 12 | 水墨国风、工笔国风、敦煌壁画、宋代美学、红金国潮 |
| 插画与动画 | 12 | 宫崎骏、日系动画、漫画分镜、水彩、彩铅、炭笔 |
| 3D 与游戏美术 | 5 | 皮克斯式 3D、3D 盲盒、像素艺术、低多边形 |
| 手工与材质 | 4 | 毛毡手作、剪纸、黏土动画、定格动画 |
| 影像与生活方式 | 9 | 电影写实、商业摄影、韩系清新、法式复古、侘寂 |
| 现代设计与平面 | 7 | 莫兰迪、极简主义、波普艺术、Y2K、蒸汽波 |
| 科幻与未来 | 9 | 赛博朋克、蒸汽朋克、机械朋克、太空歌剧、废土末日 |
| 暗黑与超现实 | 7 | 暗黑哥特、暗黑奇幻、新怪谈、梦核、Liminal Space |

每条包含：参考图 / 中文名 / 英文名 / 一句话特征 / 关键词 / **Prompt 正文** / 负面词 / 使用提示。

> Prompt 里的 `[subject]` 是**主体占位符**。复制后把它换成你要画的东西，例如
> `[subject]` → `a girl reading by a window`。后面的风格关键词不要动。

#### 内容出处

名称与说明转录自风格图谱原帖的 15 张长图（每张 5 条）。原图放在本机，不在仓库里；
切图靠 `tools/slice_atlas.py`（自动定位卡片边界，含一张人工校正表
`tools/slice_atlas.boxes.json`）。

原帖图谱里「超现实主义」出现了两次（第 3 条与第 10 条），两版参考图不同，都保留了 ——
一条偏达利的融化／扭曲，一条偏马格里特的漂浮并置。同理「国风／新中式」是总纲，
下面另有三条具体的国风分支。

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
│   └── CATEGORIES.md          分类体系与归类判断
├── prompts/                   按出图场景分类的 Prompt 模板（.md）
├── skills/                    多步骤流程的技能包
├── examples/                  完整出图案例（含踩坑记录）
└── tools/
    ├── lint.py                校验全部资产 + 刷新索引
    ├── slice_atlas.py         把风格图谱长图切成单张参考图
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

## 加内容

**加一条风格（子项目 01）：**

编辑 `data/style-prompt.js`，往 `items` 里追加一条，然后：

```bash
python3 tools/lint.py
```

它会检查：id 唯一、编号连续、分组已在 `projects.js` 登记、prompt 含 `[subject]`、
参考图存在且不超过 500KB。

**加参考图：**

把原图丢进一个临时目录，跑：

```bash
PY=/Users/shenqi/.workbuddy/binaries/python/envs/default/bin/python
$PY tools/optimize_refs.py ~/Downloads/xhs --project style-prompt --dry-run   # 先干跑
$PY tools/optimize_refs.py ~/Downloads/xhs --project style-prompt             # 再真跑
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
