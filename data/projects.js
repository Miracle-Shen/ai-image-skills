/* 子项目注册表
 * 新增子项目：写一个 data/<id>.js 数据文件，然后在这里追加一条。
 * 页面会自动出现新入口 —— 不需要改 index.html 或 app.js。
 */
window.AIS_PROJECTS = [
  {
    id: 'style-prompt',
    no: 1,
    name: 'AI 生图 · 风格 Prompt',
    subtitle: '50 种绘画风格，每种一个可直接用的 Prompt',
    desc: '按艺术风格组织的出图配方库。选风格 → 展开 Prompt → 复制 → 把 [subject] 换成你要画的东西。',
    unit: '种风格',
    status: 'ready',
    groups: ['动画与插画', '传统绘画', '摄影与电影', '数字与未来', '3D 渲染与手工材质'],
    dataKey: 'style-prompt',
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
