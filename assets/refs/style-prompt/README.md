# 参考图目录

每个子项目一个文件夹：`assets/refs/<子项目id>/`。

当前：`assets/refs/style-prompt/` —— 子项目 01「风格 Prompt」的 50 张参考图。

## 命名规则

**文件名 = 条目的 `id` + 图片扩展名。** 例如：

| 条目 id | 文件名 |
| --- | --- |
| `ghibli` | `ghibli.jpg` |
| `cyberpunk` | `cyberpunk.jpg` |
| `dunhuang` | `dunhuang.jpg` |

数据文件里只写文件名，不写路径：

```js
{ id: 'ghibli', ..., image: 'ghibli.jpg' }
```

页面会自动拼成 `assets/refs/style-prompt/ghibli.jpg`。

## 硬性要求

| 项 | 要求 | 原因 |
| --- | --- | --- |
| 单图体积 | **≤ 500KB** | 50 张图会直接放大仓库体积，超了 `lint` 会报错 |
| 格式 | `.jpg` / `.png` / `.webp` / `.avif` | 优先 `.jpg`（照片类压缩率最好） |
| 命名 | 全小写中划线，与 `id` 完全一致 | `lint` 会做反向检查，多出来或对不上的图会报错 |
| 尺寸 | 长边 1200px 左右 | 卡片展示够用，再大只是浪费体积 |

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
