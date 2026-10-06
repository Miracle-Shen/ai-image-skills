# 参考图目录

每个子项目一个文件夹：`assets/refs/<子项目id>/`。

当前：`assets/refs/style-prompt/` —— 子项目 01「风格 Prompt」的 75 张参考图，
从原帖风格图谱的长图里切出来的，一张图对应一条风格。

## 命名规则

**文件名 = 条目的 `id` + 图片扩展名。** 例如：

| 条目 id | 文件名 |
| --- | --- |
| `cyberpunk` | `cyberpunk.jpg` |
| `ukiyo-e` | `ukiyo-e.jpg` |
| `dunhuang-mural` | `dunhuang-mural.jpg` |

数据文件里只写文件名，不写路径：

```js
{ id: 'cyberpunk', ..., image: 'cyberpunk.jpg' }
```

页面会自动拼成 `assets/refs/style-prompt/cyberpunk.jpg`。

## 硬性要求

| 项 | 要求 | 原因 |
| --- | --- | --- |
| 单图体积 | **≤ 500KB** | 75 张图会直接放大仓库体积，超了 `lint` 会报错 |
| 格式 | `.jpg` / `.png` / `.webp` / `.avif` | 优先 `.jpg`（照片类压缩率最好） |
| 命名 | 全小写中划线，与 `id` 完全一致 | `lint` 会做反向检查，多出来或对不上的图会报错 |
| 尺寸 | 长边 1200px 左右 | 卡片展示够用，再大只是浪费体积 |

**当前实际规格**：75 张，长边 600～1000px，单张 35～60KB，合计约 3.7MB。

## 怎么产出

原帖图谱是 15 张长图，每张纵向排 5 条（左边是名称和说明，右边是参考图）。两步：

```bash
PY=/Users/shenqi/.workbuddy/binaries/python/envs/default/bin/python

# 1. 长图 → 单张参考图（自动定位卡片边界；个别图靠人工校正表兜底）
$PY tools/slice_atlas.py <长图目录> --out /tmp/atlas/crops --boxes tools/slice_atlas.boxes.json

# 2. 按条目 id 改名 → 缩放压缩 → 落进 assets/refs/style-prompt/
$PY tools/optimize_refs.py <改名后的目录> --project style-prompt
```

## 校验

```bash
python3 tools/lint.py
```

会检查：
- 数据里写了 `image` 但文件不存在 → 报错
- 文件体积超 500KB → 报错
- 文件名与 `id` 对不上 → 报错
- 目录里有图没被任何条目引用 → 报错

## 没有参考图会怎样

条目的 `image` 字段留空（或不写），页面会渲染成一块「参考图待补」的斜纹占位块，
其余功能（搜索、展开、复制 Prompt）照常可用。

## 版权

参考图取自公开传播的风格图谱原帖，仅作**风格对照**使用（说明「这个风格长什么样」），
页面底部有来源标注。若原作者有异议，删掉 `assets/refs/style-prompt/` 下的图即可 ——
图缺失时页面自动退回占位块，功能不受影响。
