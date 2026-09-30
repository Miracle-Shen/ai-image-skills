# ai-image-skills

图像生成任务的 **Prompt 模板** 与 **Skill 技能包** 集合。

一个地方存放、版本化、复用所有「要 AI 出图」的提示词资产——出图前先来这里翻，
而不是每次从零重写一段 prompt。

---

## 两类资产，别搞混

| 目录 | 放什么 | 什么时候用 |
| --- | --- | --- |
| `prompts/` | **单个 Prompt 模板**（一个 `.md` = 一个模板） | 一次性出图。复制正文 → 替换变量 → 粘贴到出图工具 |
| `skills/` | **Skill 技能包**（一个目录 = 一个可复用能力） | 多步骤、有流程的任务。比如「批量出 40 张皮肤并校验尺寸」 |

判断标准很简单：

- **只要一段 prompt 就能搞定** → 放 `prompts/`
- **要先读文档、要跑脚本、要按步骤来** → 放 `skills/`

---

## 目录结构

```
ai-image-skills/
├── README.md                  你在这里
├── docs/
│   ├── CONVENTIONS.md         命名 / 字段 / 写法规范（写新模板前先看这个）
│   └── CATEGORIES.md          分类体系与归类判断
├── prompts/
│   ├── README.md              模板索引表（自动生成，别手改）
│   ├── game-assets/           游戏素材：皮肤、图标、道具、特效
│   ├── character/             角色与人像
│   ├── scene/                 场景与背景
│   ├── ui/                    UI 控件与界面元素
│   └── style/                 风格化与二次编辑
├── skills/
│   ├── README.md              技能包索引
│   └── _template/SKILL.md     新建技能包的骨架，复制改名即可
├── examples/                  完整出图案例（prompt + 参数 + 结果说明）
└── tools/
    └── lint.py                校验字段 + 重新生成索引
```

---

## 30 秒上手

**用现成模板：**

1. 打开 `prompts/README.md`，在索引表里按分类/tag 找
2. 打开对应 `.md`，把 Prompt 正文里的 `{{变量}}` 换成自己的内容
3. 按文件里的「出图参数」设置比例和尺寸
4. 负面词一起带上

**加新模板：**

```bash
cp prompts/_TEMPLATE.md prompts/game-assets/my-new-template.md
# 编辑 frontmatter 和正文
python3 tools/lint.py        # 校验 + 刷新索引
```

**加新技能包：**

```bash
cp -r skills/_template skills/my-skill-name
# 编辑 SKILL.md
```

---

## 三条硬约定

1. **文件名 = `id` + `.md`**，全小写、中划线分隔。改 id 必须同时改文件名，
   `tools/lint.py` 会检查。
2. **Prompt 正文里只写 prompt**，不写解释。所有「为什么这么写」「什么场景用」
   放正文之外的段落，方便直接复制。
3. **变量用 `{{双花括号}}`**，全大写。运行时替换，不要留裸占位符。

细节见 `docs/CONVENTIONS.md`。

---

## 维护

```bash
python3 tools/lint.py           # 校验 + 刷新索引
python3 tools/lint.py --check   # 只校验，CI 用；有问题退出码非 0
```

新增/修改模板后跑一次，保证索引和文件不脱节。

---

## License

仓库暂未指定开源协议。若打算对外分享，建议补一个 `LICENSE`（MIT 是常见默认选择）。
