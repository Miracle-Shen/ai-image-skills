/* 子项目注册表
 * 新增子项目：写一个 data/<id>.js 数据文件，然后在这里追加一条。
 * 页面会自动出现新入口 —— 不需要改 index.html 或 app.js。
 */
window.AIS_PROJECTS = [
  {
    id: 'style-prompt',
    no: 1,
    name: 'AI 生图 · 风格 Prompt',
    subtitle: '75 种风格，每种一张参考图 + 一个可直接用的 Prompt',
    desc: '按艺术风格组织的出图配方库。图与 prompt 成组：卡片上半是参考图，展开是 Prompt。选风格 → 展开 → 复制 → 把 [subject] 换成你要画的东西。',
    unit: '种风格',
    status: 'ready',
    groups: [
      '绘画流派',
      '东方美学',
      '插画与动画',
      '3D 与游戏美术',
      '手工与材质',
      '影像与生活方式',
      '现代设计与平面',
      '科幻与未来',
      '暗黑与超现实'
    ],
    dataKey: 'style-prompt',
    imageCredit: '参考图来自原帖风格图谱（小红书 @柒晨来了），仅作风格对照使用',
    accent: '#e8613c'
  },
  {
    id: 'placeholder-2',
    no: 2,
    name: '待规划',
    subtitle: '下一个子项目',
    desc: '预留位置。想加什么告诉我 —— 构图与镜头、材质与光影、角色一致性、批量出图流程都可以做成子项目。',
    unit: '',
    status: 'planned',
    groups: [],
    dataKey: null,
    accent: '#8a8a8a'
  }
];
