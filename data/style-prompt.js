/* 子项目 01：AI 生图 · 风格 Prompt
 *
 * 内容来源：原帖风格图谱《AI绘图50种风格》的 15 张图 ×每张 5 条 = 75 条。
 *   - 名称与说明：从原帖图谱左侧文字区逐条转录（详见 docs/ 与 git 记录）
 *   - 参考图：图谱中每行右侧的示意图，由 tools/slice_atlas.py 自动切出
 *   - prompt：按原帖描述的视觉特征重写成可直接投喂模型的英文关键词
 *
 * 图与 prompt 是一组：卡片上半是参考图，展开后是 prompt。
 */
window.AIS_ITEMS = window.AIS_ITEMS || {};

window.AIS_ITEMS['style-prompt'] = {
  note: '复制 prompt 后，只把 [subject] 换成你要画的东西 —— 后面的风格关键词不要动，它们是这个风格的识别特征。参考图是原帖图谱里该风格的示例。',
  items: [
    /* ---------- 01 日系手绘治愈动画风 ---------- */
    {
      id: 'japanese-healing-anime',
      no: 1,
      name: '日系手绘治愈动画风',
      en: 'Japanese Healing Anime',
      group: '插画与动画',
      desc: '细腻手绘线条 + 柔和暖色调，自然场景里的温情日常',
      keywords: ['hand-drawn linework', 'soft warm tones', 'pastoral nature', 'cosy storybook mood'],
      prompt: '[subject], Japanese hand-drawn healing anime style, delicate hand-drawn linework, soft warm color palette, gentle pastoral scenery, forest meadow clouds and a small town, whimsical storybook atmosphere, cosy nostalgic lighting, flat cel shading, high detail, masterpiece',
      negative: 'photorealistic, 3d render, harsh contrast, neon, gore, blurry, lowres',
      tip: '和「宫崎骏风格」贴得很近。区分点：这条偏「治愈日常」，宫崎骏要出现飞行器、风、云团这些标志意象。想更萌加 cute, cosy。',
      image: 'japanese-healing-anime.jpg'
    },
    /* ---------- 02 后印象派厚涂油画风 ---------- */
    {
      id: 'post-impressionist-impasto',
      no: 2,
      name: '后印象派厚涂油画风',
      en: 'Post-Impressionist Impasto Oil',
      group: '绘画流派',
      desc: '厚重油彩笔触 + 漩涡状纹理，用色彩强调情绪',
      keywords: ['impasto', 'swirling brushwork', 'saturated colour', 'expressive motion'],
      prompt: '[subject], Post-Impressionist impasto oil painting, thick visible brush strokes, swirling rhythmic texture, highly saturated colours, expressive dynamic linework, vivid emotion, natural scenery with living vitality, real canvas texture, museum oil painting',
      negative: 'flat vector, cel shading, clean digital, photo, anime, thin lines',
      tip: '不写 impasto / thick paint / palette knife 这些词，模型会给你平涂。和「梵高风格」的区别：这条不强调漩涡状天空。',
      image: 'post-impressionist-impasto.jpg'
    },
    /* ---------- 03 超现实主义风格 ---------- */
    {
      id: 'surrealism',
      no: 3,
      name: '超现实主义风格',
      en: 'Surrealism',
      group: '绘画流派',
      desc: '梦境意象、漂浮物体与扭曲空间并置，荒诞又细腻',
      keywords: ['dreamlike', 'floating objects', 'impossible space', 'symbolic juxtaposition'],
      prompt: '[subject], Surrealist oil painting, dreamlike imagery, floating objects, distorted impossible space, symbolic elements juxtaposed, uncanny yet hyper-detailed rendering, soft diffused light, Magritte influence, oil on canvas',
      negative: 'ordinary snapshot, realistic proportions, flat illustration, cartoon, vector',
      tip: '荒诞感来自「并置」，加上 juxtaposed / melting / disproportionate 才有。原帖图谱里这条出现过两次（第 2 张图第 05 条也是超现实），两版参考图可以对比取用。',
      image: 'surrealism.jpg'
    },
    /* ---------- 04 巴洛克风格 ---------- */
    {
      id: 'baroque',
      no: 4,
      name: '巴洛克风格',
      en: 'Baroque',
      group: '绘画流派',
      desc: '强明暗对比 + 戏剧化构图，华丽而庄严',
      keywords: ['chiaroscuro', 'dramatic composition', 'ornate', 'epic grandeur'],
      prompt: '[subject], Baroque painting, strong chiaroscuro light and shadow, dramatic theatrical composition, ornate decoration, gold and deep crimson palette, epic grandeur, dynamic movement, Caravaggio and Rubens influence, oil on canvas',
      negative: 'minimalist, flat, pastel soft, modern minimal design, vector, plain',
      tip: '巴洛克靠「强明暗 + 戏剧化」立住，chiaroscuro 和 dramatic 千万别删。和洛可可同属欧洲古典，一个沉重一个轻盈，容易搞反。',
      image: 'baroque.jpg'
    },
    /* ---------- 05 洛可可风格 ---------- */
    {
      id: 'rococo',
      no: 5,
      name: '洛可可风格',
      en: 'Rococo',
      group: '绘画流派',
      desc: '粉、奶油、金三色，精致花纹与贵族沙龙气质',
      keywords: ['pastel palette', 'cream and gold', 'delicate ornament', 'aristocratic romance'],
      prompt: '[subject], Rococo style, airy pastel palette of pink cream and gold, delicate ornamental flourishes, soft diffused light, romantic elegant and sweet mood, aristocratic salon atmosphere, fine decorative detail, Fragonard influence, oil painting',
      negative: 'dark, heavy shadow, monochrome, industrial, gritty, horror',
      tip: '洛可可要「轻、甜、金」。负面词里的 dark / heavy 要留着，不然会被巴洛克味带跑。',
      image: 'rococo.jpg'
    },
    /* ---------- 06 国风／新中式 ---------- */
    {
      id: 'chinese-guofeng',
      no: 6,
      name: '国风／新中式',
      en: 'Chinese Guofeng',
      group: '东方美学',
      desc: '国风总纲：水墨晕染 / 工笔细线 / 传统元素 + 现代设计',
      keywords: ['ink wash', 'gongbi fine line', 'traditional motifs', 'modern Chinese design'],
      prompt: '[subject], Chinese Guofeng illustration, ink wash bleeding combined with fine gongbi linework, traditional Chinese motifs, elegant negative space, modern graphic design sensibility, jade and vermilion accents, culturally refined',
      negative: 'western fantasy, japanese anime, cyberpunk neon, photorealistic',
      tip: '这条是「国风」的总纲（原帖标注了水墨／工笔／新国风三个方向）。要具体效果就下移到「水墨国风」「工笔国风」「新中式风格」三条。',
      image: 'chinese-guofeng.jpg'
    },
    /* ---------- 07 宫崎骏风格 ---------- */
    {
      id: 'miyazaki',
      no: 7,
      name: '宫崎骏风格',
      en: 'Hayao Miyazaki Style',
      group: '插画与动画',
      desc: '手绘质感 + 浅黄淡绿柔粉，治愈系自然场景',
      keywords: ['hand-drawn', 'soft warm tones', 'healing nature', 'gentle fantasy'],
      prompt: '[subject], Hayao Miyazaki style anime, hand-drawn delicate linework, soft warm tones of pale yellow light green and soft pink, healing natural scenery of forest field and towering cumulus clouds, gentle human warmth, fairy-tale atmosphere, cel animation background art',
      negative: '3d render, photorealistic, harsh neon, dark horror, mecha',
      tip: '和「日系手绘治愈动画风」高度重合，靠飞行器、风、巨大云团这些意象区分。想要《千与千寻》那种氛围就加 quiet mystery。',
      image: 'miyazaki.jpg'
    },
    /* ---------- 08 莫兰迪风格 ---------- */
    {
      id: 'morandi',
      no: 8,
      name: '莫兰迪风格',
      en: 'Morandi Palette',
      group: '现代设计与平面',
      desc: '灰粉灰蓝浅褐的低饱和灰调，静谧文艺',
      keywords: ['desaturated grey tones', 'harmonious muted palette', 'quiet stillness'],
      prompt: '[subject], Morandi colour palette, low saturation muted grey tones, dusty pink grey blue and pale brown, harmonious colours with no clash, soft flat light, quiet serene and gentle mood, minimalist composition, fine art still life feel',
      negative: 'high saturation, neon, strong contrast, vivid primary colours, busy',
      tip: '莫兰迪的本质是「降饱和」，不是「画成瓶子」。主体随便换，灰调关键词保持住就对了。',
      image: 'morandi.jpg'
    },
    /* ---------- 09 梵高风格 ---------- */
    {
      id: 'van-gogh',
      no: 9,
      name: '梵高风格',
      en: 'Van Gogh Style',
      group: '绘画流派',
      desc: '厚涂笔触 + 漩涡状纹理，明黄钴蓝赭红',
      keywords: ['impasto', 'swirling strokes', 'vivid yellow and cobalt', 'turbulent motion'],
      prompt: '[subject], Vincent van Gogh style, thick impasto brushwork, bold swirling strokes, strong sense of motion, vivid saturated colours of bright yellow cobalt blue and ochre red, expressive turbulent sky, natural subject matter, post-impressionist oil on canvas',
      negative: 'smooth gradient, flat vector, clean lines, minimal, photo',
      tip: '漩涡笔触是梵高的签名，swirling 必须写。想要《星月夜》那种天空就补 turbulent night sky。',
      image: 'van-gogh.jpg'
    },
    /* ---------- 10 超现实主义 ---------- */
    {
      id: 'surrealism-dreamscape',
      no: 10,
      name: '超现实主义',
      en: 'Surrealism (Dali strain)',
      group: '绘画流派',
      desc: '融化的钟、扭曲的人体，梦境逻辑压过现实',
      keywords: ['melting clocks', 'distorted figures', 'dream logic', 'uncanny detail'],
      prompt: '[subject], Surrealism, dream logic breaking reality, melting clocks and distorted human figures, dream imagery fused together, uncanny yet delicately rendered, soft shadowless light, Dali influence, oil on canvas',
      negative: 'realistic, ordinary, flat cartoon, vector, photograph',
      tip: '和上一条「超现实主义风格」是同一流派的两版参考图 —— 这条偏达利的融化／扭曲，第 3 条偏马格里特的漂浮并置。',
      image: 'surrealism-dreamscape.jpg'
    },
    /* ---------- 11 赛博朋克风格 ---------- */
    {
      id: 'cyberpunk',
      no: 11,
      name: '赛博朋克风格',
      en: 'Cyberpunk',
      group: '科幻与未来',
      desc: '霓虹撞黑灰暗部，雨夜街道与机械义体',
      keywords: ['neon', 'high contrast', 'rainy night city', 'high tech low life'],
      prompt: '[subject], cyberpunk style, highly saturated neon light against dark grey shadows, futuristic technology, ruined cityscape, rain-soaked night street, cybernetic implants, information overload, cold sci-fi mood, cinematic rim light, blade runner atmosphere',
      negative: 'pastoral, warm daylight, vintage, hand-drawn, watercolour, medieval',
      tip: '底色是「黑灰暗部 + 霓虹」。别把 negative 里的 daylight 去掉，否则会退化成普通的明亮未来都市。',
      image: 'cyberpunk.jpg'
    },
    /* ---------- 12 蒸汽朋克风格 ---------- */
    {
      id: 'steampunk',
      no: 12,
      name: '蒸汽朋克风格',
      en: 'Steampunk',
      group: '科幻与未来',
      desc: '维多利亚工业美学，黄铜齿轮、管道与蒸汽',
      keywords: ['victorian industrial', 'brass gears', 'pipes and steam', 'sepia bronze'],
      prompt: '[subject], steampunk style, Victorian industrial aesthetic, brass and copper gears, exposed pipes and steam, pocket watches and airships, intricate mechanical detailing, warm sepia and bronze tones, retro-futuristic fantasy',
      negative: 'modern glass skyscraper, neon cyberpunk, clean minimal, plastic',
      tip: '要有「旧金属 + 维多利亚」。和赛博朋克的区别一句话：蒸汽朋克是黄铜，赛博朋克是霓虹。',
      image: 'steampunk.jpg'
    },
    /* ---------- 13 水墨国风 ---------- */
    {
      id: 'chinese-ink-wash',
      no: 13,
      name: '水墨国风',
      en: 'Chinese Ink Wash',
      group: '东方美学',
      desc: '淡墨晕染、宣纸纹理、留白构图与山水意境',
      keywords: ['ink wash', 'rice paper texture', 'negative space', 'shanshui'],
      prompt: '[subject], Chinese ink wash painting, pale ink bleeding and diffusion, rice paper texture, generous negative space, shanshui mountain-and-water composition, flowing brush energy, poetic and lively, restrained monochrome with a single colour accent',
      negative: 'oil painting, thick impasto, vivid saturated colour, 3d render, neon',
      tip: '留白是灵魂，negative space / empty space 一定要写。想上一点色就写 subtle colour accent，别整成彩色。',
      image: 'chinese-ink-wash.jpg'
    },
    /* ---------- 14 工笔国风 ---------- */
    {
      id: 'chinese-gongbi',
      no: 14,
      name: '工笔国风',
      en: 'Chinese Gongbi',
      group: '东方美学',
      desc: '线条工整细腻，色彩精致，仕女花鸟宫灯屏风',
      keywords: ['fine linework', 'meticulous detail', 'court ladies and flowers', 'ornate'],
      prompt: '[subject], Chinese gongbi fine-brush painting, meticulous even linework, refined gorgeous colouring, court ladies flowers birds palace lanterns and folding screens, elaborate decorative detail, elegant classical oriental temperament, silk ground',
      negative: 'loose sketch, rough brushwork, impasto, grunge, low detail',
      tip: '工笔靠「工整细线」立住，负面词里的 loose sketch 别删。它和水墨国风是国风的两端：一个精工，一个写意。',
      image: 'chinese-gongbi.jpg'
    },
    /* ---------- 15 新中式风格 ---------- */
    {
      id: 'modern-chinese',
      no: 15,
      name: '新中式风格',
      en: 'Modern Chinese',
      group: '东方美学',
      desc: '传统元素 + 现代设计语言，简洁高级',
      keywords: ['modern Chinese design', 'ink motif', 'window lattice', 'gold line accents'],
      prompt: '[subject], modern Chinese design style, traditional Chinese elements merged with contemporary design language, clean and elevated composition, ink motifs, window lattice, folding screen silhouettes, mountain shapes, fine gold line accents, restrained palette',
      negative: 'ornate classical, baroque, heavy traditional pattern, kitsch',
      tip: '比「国风／新中式」更偏设计感、更简洁。做海报、KV、包装就用它。',
      image: 'modern-chinese.jpg'
    },
    /* ---------- 16 印象派风格 ---------- */
    {
      id: 'impressionism',
      no: 16,
      name: '印象派风格',
      en: 'Impressionism',
      group: '绘画流派',
      desc: '松散笔触捕捉自然光影，弱化轮廓细节',
      keywords: ['loose brushwork', 'natural light', 'plein air', 'atmospheric haze'],
      prompt: '[subject], Impressionist oil painting, loose visible brushwork, natural daylight and fleeting colour sensation, softened contours, emphasis on atmosphere and light, plein air outdoor scene, Monet and Renoir influence, dappled sun',
      negative: 'sharp outline, hard edge, photorealistic, flat vector, neon',
      tip: '印象派的关键是「弱化轮廓」，负面词里写 sharp outline 特别管用。',
      image: 'impressionism.jpg'
    },
    /* ---------- 17 表现主义风格 ---------- */
    {
      id: 'expressionism',
      no: 17,
      name: '表现主义风格',
      en: 'Expressionism',
      group: '绘画流派',
      desc: '夸张色彩与变形线条，把内心情绪推到前面',
      keywords: ['exaggerated colour', 'distorted line', 'raw emotion', 'skewed perspective'],
      prompt: '[subject], Expressionist painting, exaggerated colours, distorted deformed lines, raw intense emotion, oppressive anxious or explosive mood, bold gestural strokes, skewed perspective, Munch and Kirchner influence, oil on canvas',
      negative: 'pretty, cute, gentle, harmonious pastel, photorealistic',
      tip: '要压迫感就保留 oppressive / anxious。想柔和一点反而会掉成普通的半抽象画。',
      image: 'expressionism.jpg'
    },
    /* ---------- 18 极简主义风格 ---------- */
    {
      id: 'minimalism',
      no: 18,
      name: '极简主义风格',
      en: 'Minimalism',
      group: '现代设计与平面',
      desc: '少量元素 + 大面积留白，干净理性的高级感',
      keywords: ['minimal composition', 'negative space', 'restrained palette', 'single focal point'],
      prompt: '[subject], minimalist composition, few elements, large areas of negative space, restrained limited palette, one single clear focal subject, clean and refined, rational high-end visual, soft even light, subtle texture',
      negative: 'busy, cluttered, ornate, high detail, many objects',
      tip: '极简最常翻车成「像没画完」。加 one clear focal subject 和 subtle texture 提质感。',
      image: 'minimalism.jpg'
    },
    /* ---------- 19 波普艺术风格 ---------- */
    {
      id: 'pop-art',
      no: 19,
      name: '波普艺术风格',
      en: 'Pop Art',
      group: '现代设计与平面',
      desc: '高饱和撞色 + 漫画线条 + 网点纹理',
      keywords: ['saturated clash colours', 'comic outline', 'halftone dots', 'screen print'],
      prompt: '[subject], Pop Art style, high saturation clashing colours, comic-book linework, halftone dot texture, mass consumer symbols, bold graphic impact, Warhol and Lichtenstein influence, screen print feel',
      negative: 'muted, pastel, soft gradient, realistic texture, oil painting brushwork',
      tip: '识别点是网点加黑描边，halftone 和 bold outline 两个都写上。',
      image: 'pop-art.jpg'
    },
    /* ---------- 20 扁平插画风 ---------- */
    {
      id: 'flat-illustration',
      no: 20,
      name: '扁平插画风',
      en: 'Flat Illustration',
      group: '现代设计与平面',
      desc: '去光影去透视，块面色彩 + 清晰造型',
      keywords: ['flat shapes', 'no gradient', 'clear silhouette', 'editorial'],
      prompt: '[subject], flat vector illustration, no complex shading or realistic perspective, simple clean lines, solid block colour, clear silhouette, confident shapes, editorial infographic style, brand-friendly, neat composition',
      negative: 'realistic lighting, gradient mesh, 3d render, texture, oil paint',
      tip: '扁平不等于简陋。加 clear silhouette 和 confident shapes 才有高级感。信息图、品牌插画、新媒体配图都合适。',
      image: 'flat-illustration.jpg'
    },
    /* ---------- 21 厚涂插画风 ---------- */
    {
      id: 'thick-paint-illustration',
      no: 21,
      name: '厚涂插画风',
      en: 'Thick Paint Illustration',
      group: '插画与动画',
      desc: '笔触厚重，人物场景有强体积感与绘画质感',
      keywords: ['thick strokes', 'layered colour', 'sculptural volume', 'painterly'],
      prompt: '[subject], thick-paint digital illustration, heavy brush strokes, rich layered colour, strong sculptural volume, painterly rendering, character design and concept art quality, dramatic value contrast, fantasy friendly',
      negative: 'flat colour, vector, line art only, minimalist, photo',
      tip: '厚涂要「体积感」，volume / sculpted form 写上。角色设定和概念设计的主力风格。',
      image: 'thick-paint-illustration.jpg'
    },
    /* ---------- 22 电影写实风 ---------- */
    {
      id: 'cinematic-realism',
      no: 22,
      name: '电影写实风',
      en: 'Cinematic Realism',
      group: '影像与生活方式',
      desc: '电影级光影 + 镜头语言，剧照般的真实质感',
      keywords: ['film still', 'cinematic lighting', 'natural colour', 'lens language'],
      prompt: '[subject], cinematic realism, true photographic texture, film-grade lighting, natural colour grading, anamorphic lens language, shallow depth of field, movie still composition, subtle film grain, 35mm',
      negative: 'cartoon, anime, vector, flat illustration, oversaturated plastic skin',
      tip: '想要剧照感就加 movie still / 35mm。别加 3d render，会往 CG 跑。',
      image: 'cinematic-realism.jpg'
    },
    /* ---------- 23 商业摄影风 ---------- */
    {
      id: 'commercial-photography',
      no: 23,
      name: '商业摄影风',
      en: 'Commercial Photography',
      group: '影像与生活方式',
      desc: '布光精细、背景干净、主体突出',
      keywords: ['studio lighting', 'clean background', 'hero shot', 'controlled reflection'],
      prompt: '[subject], high-end commercial photography, meticulous studio lighting, clean seamless background, hero subject focus, crisp detail, controlled reflections, advertising campaign quality, brand key visual',
      negative: 'cluttered background, snapshot, casual, heavy film grain, cartoon',
      tip: '主体不一定是产品，人像、食物也行，但「布光精细 + 背景干净」这两点别丢。',
      image: 'commercial-photography.jpg'
    },
    /* ---------- 24 未来主义风格 ---------- */
    {
      id: 'futurism',
      no: 24,
      name: '未来主义风格',
      en: 'Futurism',
      group: '科幻与未来',
      desc: '流线结构 + 科技材质 + 发光界面，理性高速',
      keywords: ['streamlined forms', 'tech materials', 'glowing interface', 'high speed'],
      prompt: '[subject], futuristic design style, streamlined aerodynamic structure, advanced tech materials, glowing glass interface, sense of high speed, cold rational intelligent visual, smart surface light, forward-looking composition',
      negative: 'vintage, rusty, medieval, hand-drawn, warm cosy',
      tip: '和赛博朋克的区别：这条是「干净明亮的未来」，没有废墟、没有雨夜。',
      image: 'futurism.jpg'
    },
    /* ---------- 25 侘寂风格 ---------- */
    {
      id: 'wabi-sabi',
      no: 25,
      name: '侘寂风格',
      en: 'Wabi-Sabi',
      group: '影像与生活方式',
      desc: '自然旧化 + 残缺之美，粗糙材质与低饱和',
      keywords: ['weathered texture', 'imperfect beauty', 'muted earth tones', 'zen stillness'],
      prompt: '[subject], wabi-sabi aesthetic, weathered natural ageing, beauty of imperfection, coarse raw material texture, crack and patina, low saturation earth palette, quiet plain restrained, zen mindful stillness, soft window light, slow living',
      negative: 'glossy, brand new, plastic, neon, maximalist, polished',
      tip: '侘寂靠「粗糙 + 旧化」。加上 crack, patina, raw clay 这类材质词，否则会画得太新。',
      image: 'wabi-sabi.jpg'
    },
    /* ---------- 26 日式极简风 ---------- */
    {
      id: 'japanese-minimal',
      no: 26,
      name: '日式极简风',
      en: 'Japanese Minimalism',
      group: '影像与生活方式',
      desc: '留白 + 自然材质 + 低饱和，安静有秩序',
      keywords: ['negative space', 'natural material', 'quiet order', 'soft daylight'],
      prompt: '[subject], Japanese minimalist aesthetic, generous empty space, low saturation natural palette, natural material textures of wood paper and linen, simple balanced composition, quiet orderly calm, lifestyle and interior editorial, soft daylight',
      negative: 'busy, colourful, ornate, glossy plastic, high contrast',
      tip: '和「极简主义风格」的区别：这条必须有自然材质（木／纸／麻），后者是通用平面极简。',
      image: 'japanese-minimal.jpg'
    },
    /* ---------- 27 韩系清新风 ---------- */
    {
      id: 'korean-fresh',
      no: 27,
      name: '韩系清新风',
      en: 'Korean Fresh Style',
      group: '影像与生活方式',
      desc: '明亮自然光 + 柔和肤色 + 干净背景',
      keywords: ['bright natural light', 'soft skin', 'low saturation', 'airy pastel'],
      prompt: '[subject], Korean fresh lifestyle aesthetic, bright natural light, soft luminous skin, low saturation styling, clean uncluttered background, airy pastel palette, gentle warm mood, candid lifestyle feel, soft overexposed light',
      negative: 'heavy makeup, dark moody, high contrast, grunge, neon',
      tip: '关键词就两个：亮、干净。加 overexposed soft light 立刻出韩系感。',
      image: 'korean-fresh.jpg'
    },
    /* ---------- 28 法式复古风 ---------- */
    {
      id: 'french-vintage',
      no: 28,
      name: '法式复古风',
      en: 'French Vintage',
      group: '影像与生活方式',
      desc: '暖调胶片 + 街边咖啡馆 + 老建筑，慵懒文艺',
      keywords: ['warm film tone', 'café', 'old architecture', 'effortless elegance'],
      prompt: '[subject], French vintage aesthetic, elegant styling, warm film colour tone, sidewalk café and old architecture, relaxed unposed attitude, romantic languid mood, soft 35mm film grain, golden hour',
      negative: 'neon, futuristic, sporty, harsh flash, plastic',
      tip: '暖调胶片 + 老建筑是骨架。再补 golden hour 和 film grain 就稳了。',
      image: 'french-vintage.jpg'
    },
    /* ---------- 29 美式复古风 ---------- */
    {
      id: 'american-vintage',
      no: 29,
      name: '美式复古风',
      en: 'American Vintage',
      group: '影像与生活方式',
      desc: '高对比色彩 + 老式汽车 + 霓虹招牌 + 公路',
      keywords: ['high contrast', 'classic cars', 'neon signage', 'open highway'],
      prompt: '[subject], American vintage aesthetic, high contrast colours, classic cars, neon signage, open highway, denim and chrome details, 1970s film texture, nostalgic and bold',
      negative: 'minimal, pastel soft, futuristic, airy, muted',
      tip: '和法式复古的分工：美式是高对比、公路、霓虹牌；法式是柔和、咖啡馆、老建筑。',
      image: 'american-vintage.jpg'
    },
    /* ---------- 30 洛杉矶阳光风 ---------- */
    {
      id: 'la-sunshine',
      no: 30,
      name: '洛杉矶阳光风',
      en: 'LA Sunshine',
      group: '影像与生活方式',
      desc: '强烈阳光 + 棕榈树 + 海岸公路 + 暖橙色调',
      keywords: ['harsh sunlight', 'palm trees', 'coastal highway', 'warm orange'],
      prompt: '[subject], Los Angeles sunshine aesthetic, strong direct sunlight, palm trees, coastal highway, vintage convertible, warm orange and teal palette, bright youthful west coast vibe, golden haze, 35mm film',
      negative: 'gloomy, rainy, winter, indoor studio, muted grey',
      tip: '橙青互补色（orange and teal）是这条的隐形配方，加上就对了。',
      image: 'la-sunshine.jpg'
    },
    /* ---------- 31 暗黑哥特风 ---------- */
    {
      id: 'dark-gothic',
      no: 31,
      name: '暗黑哥特风',
      en: 'Dark Gothic',
      group: '暗黑与超现实',
      desc: '黑、深红、冷灰，尖顶建筑与烛光玫瑰',
      keywords: ['black and deep red', 'spires', 'candlelight', 'roses'],
      prompt: '[subject], dark gothic style, palette of black deep red and cool grey, gothic spires and cathedral arches, stained glass, candlelight, roses, crosses, mysterious figures, moody chiaroscuro, ornate yet somber, mysterious and opulent',
      negative: 'bright, cheerful, pastel, sunny, cute, minimal',
      tip: '哥特 = 建筑元素 + 阴郁配色，加 stained glass 和 candlelight 更到位。和暗黑奇幻的区别：哥特不一定要有怪物。',
      image: 'dark-gothic.jpg'
    },
    /* ---------- 32 废土末日风 ---------- */
    {
      id: 'wasteland',
      no: 32,
      name: '废土末日风',
      en: 'Wasteland',
      group: '科幻与未来',
      desc: '荒漠废墟、锈蚀金属、破损建筑与低饱和',
      keywords: ['ruins', 'rusted metal', 'desaturated', 'survival'],
      prompt: '[subject], post-apocalyptic wasteland, desolate desert ruins, rusted corroded metal, broken concrete buildings, dust and debris, low saturation dusty palette, sandstorm haze, harsh sun, mood of survival and danger, cinematic wide shot',
      negative: 'lush green, clean futuristic, cosy, cute, colourful garden',
      tip: '废土要脏 —— 加 dust, rust, debris。正面词里别留 clean / polished，会打架。',
      image: 'wasteland.jpg'
    },
    /* ---------- 33 太空歌剧风 ---------- */
    {
      id: 'space-opera',
      no: 33,
      name: '太空歌剧风',
      en: 'Space Opera',
      group: '科幻与未来',
      desc: '星舰、外星文明、宏大战争与史诗叙事',
      keywords: ['starships', 'vast scale', 'alien civilisation', 'epic'],
      prompt: '[subject], space opera, capital starships, deep space vistas, alien civilisations, grand interstellar war, epic scale and narrative, majestic awe-inspiring mood, dramatic volumetric light, sci-fi concept art',
      negative: 'small intimate, mundane, rural, cute cartoon, low scale',
      tip: '太空歌剧的关键是「大」，写 epic scale / massive / vast。想要《星球大战》那种旧科技感就加 used-future grime。',
      image: 'space-opera.jpg'
    },
    /* ---------- 34 Y2K 风格 ---------- */
    {
      id: 'y2k',
      no: 34,
      name: 'Y2K 风格',
      en: 'Y2K',
      group: '现代设计与平面',
      desc: '金属银、果冻质感、镭射渐变与像素元素',
      keywords: ['metallic silver', 'jelly texture', 'laser gradient', 'pixel elements'],
      prompt: '[subject], Y2K aesthetic, millennium internet visual culture, metallic silver and chrome, jelly translucent texture, laser holographic gradient, pixel elements, futuristic retro optimism, glossy digital layout, lens flare',
      negative: 'matte, muted, vintage film, hand-drawn, rustic, natural',
      tip: '高光金属 + 镭射渐变是识别点。补 glossy plastic 和 lens flare 更狠。',
      image: 'y2k.jpg'
    },
    /* ---------- 35 孟菲斯风格 ---------- */
    {
      id: 'memphis',
      no: 35,
      name: '孟菲斯风格',
      en: 'Memphis Style',
      group: '现代设计与平面',
      desc: '几何图形 + 鲜艳撞色 + 波点条纹，活泼复古',
      keywords: ['geometric shapes', 'clashing colour', 'dots and stripes', 'playful'],
      prompt: '[subject], Memphis design style, bold geometric shapes, vivid clashing colours, polka dots stripes and squiggles, irregular playful composition, 1980s post-modern graphic design, light fun and retro, flat graphic layout',
      negative: 'realistic rendering, muted, classical, symmetric, minimal monochrome',
      tip: '孟菲斯和波普都撞色。区别：孟菲斯用几何图形（圆、三角、波浪线），波普用网点加名人符号。',
      image: 'memphis.jpg'
    },
    /* ---------- 36 清新森系风 ---------- */
    {
      id: 'forest-fresh',
      no: 36,
      name: '清新森系风',
      en: 'Forest Fresh',
      group: '影像与生活方式',
      desc: '森林草地、自然光、低饱和绿，清透治愈',
      keywords: ['forest greenery', 'natural light', 'low saturation green', 'airy'],
      prompt: '[subject], fresh forest aesthetic, forest grassland flowers and plants, natural sunlight filtering through leaves, low saturation green palette, natural transparent healing mood, light and airy, soft bokeh, dappled light, film-like',
      negative: 'urban, neon, dark moody, industrial, synthetic plastic',
      tip: '森系的绿一定要「低饱和」，不然会变浓艳。加 dappled light 和 bokeh。',
      image: 'forest-fresh.jpg'
    },
    /* ---------- 37 童话绘本风 ---------- */
    {
      id: 'fairytale-picturebook',
      no: 37,
      name: '童话绘本风',
      en: 'Fairytale Picture Book',
      group: '插画与动画',
      desc: '柔和色彩 + 可爱角色 + 温暖场景，有故事感',
      keywords: ['soft colours', 'cute characters', 'warm scenes', 'storybook'],
      prompt: '[subject], fairytale picture book illustration, soft muted colours, cute lovable characters, warm cosy scenes, narrative storybook composition, imaginative and friendly, gentle lighting, hand-painted, paper texture',
      negative: 'realistic, horror, harsh contrast, photo, dark',
      tip: '绘本感来自「纸纹 + 柔和」，加 paper texture 和 hand-painted 立刻到位。',
      image: 'fairytale-picturebook.jpg'
    },
    /* ---------- 38 儿童插画风 ---------- */
    {
      id: 'children-illustration',
      no: 38,
      name: '儿童插画风',
      en: 'Children Illustration',
      group: '插画与动画',
      desc: '造型圆润可爱、线条简洁安全，明亮柔和',
      keywords: ['round soft shapes', 'bright gentle colour', 'simple safe lines', 'friendly'],
      prompt: '[subject], children illustration, round cute rounded shapes, bright yet gentle colours, simple safe thick outlines, friendly expressive characters, flat clean colouring, suitable for picture books education and family content',
      negative: 'realistic, scary, sharp angles, gritty texture, dark shadow, violence',
      tip: '和童话绘本的区别：这条更「低幼」，线条更粗、造型更圆。适合教育内容和亲子场景。',
      image: 'children-illustration.jpg'
    },
    /* ---------- 39 漫画分镜风 ---------- */
    {
      id: 'manga-storyboard',
      no: 39,
      name: '漫画分镜风',
      en: 'Manga Storyboard',
      group: '插画与动画',
      desc: '黑白线稿 + 分格构图 + 速度线，讲故事节奏',
      keywords: ['black and white line art', 'panel layout', 'speed lines', 'dynamic pose'],
      prompt: '[subject], manga storyboard page, black and white ink line art, panel grid layout, speed lines, dialogue balloon space, dynamic action poses, dramatic camera angle, screentone shading, japanese comic',
      negative: 'full colour, painterly, 3d render, soft gradient, photo',
      tip: '一定要写 panel layout / comic page，否则模型只会给你一张黑白单图。',
      image: 'manga-storyboard.jpg'
    },
    /* ---------- 40 日系动画风 ---------- */
    {
      id: 'japanese-anime',
      no: 40,
      name: '日系动画风',
      en: 'Japanese Anime',
      group: '插画与动画',
      desc: '清晰线条 + 明亮色彩，青春热血的动画质感',
      keywords: ['clean lines', 'bright colour', 'expressive characters', 'key visual'],
      prompt: '[subject], Japanese anime style, clean crisp linework, bright vivid colours, expressive character emotion, detailed background scenery, youthful passionate fantasy mood, anime key visual, cel shading, high quality production art',
      negative: 'photorealistic, 3d render, western cartoon, sketch, muted',
      tip: '这是「通用日系动画」，比吉卜力更现代、更商业化。要赛璐璐质感就加 cel shading。',
      image: 'japanese-anime.jpg'
    },
    /* ---------- 41 浮世绘风格 ---------- */
    {
      id: 'ukiyo-e',
      no: 41,
      name: '浮世绘风格',
      en: 'Ukiyo-e',
      group: '东方美学',
      desc: '平面化构图 + 清晰线条 + 大面积色块',
      keywords: ['flat composition', 'clear outline', 'traditional pattern', 'woodblock'],
      prompt: '[subject], ukiyo-e Japanese woodblock print, flat planar composition, crisp outlines, traditional decorative patterns, large solid colour blocks, waves and figures and landscape, japanese classical aesthetic, Hokusai influence, washi paper texture',
      negative: '3d, photorealistic, western oil painting, soft gradient, depth of field',
      tip: '浮世绘是版画，woodblock print 和 flat colour 必须有。想要《神奈川冲浪里》那种浪就写 great wave。',
      image: 'ukiyo-e.jpg'
    },
    /* ---------- 42 敦煌壁画风 ---------- */
    {
      id: 'dunhuang-mural',
      no: 42,
      name: '敦煌壁画风',
      en: 'Dunhuang Mural',
      group: '东方美学',
      desc: '矿物色彩 + 飞天飘带 + 斑驳墙面',
      keywords: ['mineral pigments', 'flying apsaras', 'ribbons and lotus', 'aged texture'],
      prompt: '[subject], Dunhuang cave mural, mineral pigment palette of ochre malachite and azurite, flying apsaras with flowing ribbons, lotus and auspicious clouds, weathered cracked plaster texture, gold leaf accents, solemn mysterious ancient oriental art',
      negative: 'modern, glossy, neon, western style, clean digital, minimal',
      tip: '斑驳墙皮是灵魂，写 cracked plaster / weathered pigment。配色用矿物颜料名（malachite、azurite）比写「绿色」准得多。',
      image: 'dunhuang-mural.jpg'
    },
    /* ---------- 43 宋代美学风 ---------- */
    {
      id: 'song-dynasty',
      no: 43,
      name: '宋代美学风',
      en: 'Song Dynasty Aesthetic',
      group: '东方美学',
      desc: '淡雅色彩 + 留白 + 花鸟山水，克制含蓄',
      keywords: ['elegant muted colour', 'negative space', 'bird and flowers', 'literati'],
      prompt: '[subject], Song dynasty aesthetic, delicate pale muted colours, generous negative space, birds flowers and landscape, refined objects and literati taste, restrained subtle temperament, soft even light, silk painting texture, classical Chinese elegance',
      negative: 'gaudy, saturated, heavy gold, modern graphic, cartoon',
      tip: '宋画的关键是「清雅克制」，负面词里把 gaudy / saturated 钉死。它和唐风是两极。',
      image: 'song-dynasty.jpg'
    },
    /* ---------- 44 唐风美学 ---------- */
    {
      id: 'tang-dynasty',
      no: 44,
      name: '唐风美学',
      en: 'Tang Dynasty Aesthetic',
      group: '东方美学',
      desc: '色彩华丽浓郁，人物丰润大气，服饰纹样精美',
      keywords: ['rich opulent colour', 'plump figures', 'ornate textile', 'prosperity'],
      prompt: '[subject], Tang dynasty aesthetic, rich opulent colours, plump graceful figures, elaborate embroidered textile patterns, prosperous cosmopolitan atmosphere, gold and vermilion, courtly magnificence, classical Chinese fresco feel',
      negative: 'pale muted, minimalist, negative space, modern, western',
      tip: '唐风要「浓」、宋风要「淡」，两条别写反。唐风常配朱红、石绿、金。',
      image: 'tang-dynasty.jpg'
    },
    /* ---------- 45 国潮插画风 ---------- */
    {
      id: 'guochao-illustration',
      no: 45,
      name: '国潮插画风',
      en: 'Guochao Illustration',
      group: '东方美学',
      desc: '传统元素 + 现代潮流图形，高饱和醒目',
      keywords: ['traditional motifs', 'modern trendy graphic', 'saturated', 'decorative'],
      prompt: '[subject], Guochao Chinese trendy illustration, traditional cultural motifs fused with modern graphic trends, highly saturated colours, bold eye-catching composition, decorative symbols and patterns, youthful oriental visual, poster design quality',
      negative: 'classical antique, muted, western, minimalist, retro film',
      tip: '国潮 = 传统元素 + 潮牌排版。补 poster layout / flat graphic，避免画成古画。',
      image: 'guochao-illustration.jpg'
    },
    /* ---------- 46 皮克斯式 3D 动画风 ---------- */
    {
      id: 'pixar-3d-animation',
      no: 46,
      name: '皮克斯式 3D 动画风',
      en: 'Pixar-style 3D Animation',
      group: '3D 与游戏美术',
      desc: '圆润角色 + 明亮色彩 + 细腻材质 + 丰富表情',
      keywords: ['rounded characters', 'bright colour', 'detailed material', 'expressive'],
      prompt: '[subject], Pixar-style 3D animation, rounded appealing character design, bright cheerful colours, finely detailed materials, rich facial expression, warm friendly storytelling mood, soft global illumination, subsurface skin, animated feature film render',
      negative: '2d flat, anime, sketch, photorealistic uncanny, low poly',
      tip: '一定要写 3D render / animated feature film，否则会退成 2D 卡通风。加 subsurface scattering 皮肤更高级。',
      image: 'pixar-3d-animation.jpg'
    },
    /* ---------- 47 迪士尼式童话风 ---------- */
    {
      id: 'disney-fairytale',
      no: 47,
      name: '迪士尼式童话风',
      en: 'Disney Fairytale',
      group: '3D 与游戏美术',
      desc: '梦幻城堡 + 华丽服饰 + 柔和光效，浪漫叙事',
      keywords: ['dream castle', 'ornate costume', 'soft glow', 'romantic'],
      prompt: '[subject], Disney-style fairytale, dreamy castle, ornate costume, soft magical glow, sparkle particles, romantic narrative mood, warm fantasy atmosphere, musical storybook feeling, polished 3d animation render',
      negative: 'gritty realism, horror, muted desaturated, sketch, low quality',
      tip: '和皮克斯的区别：迪士尼更「华丽浪漫魔法」，皮克斯更「圆润日常」。城堡和魔法光效是标志。',
      image: 'disney-fairytale.jpg'
    },
    /* ---------- 48 3D 盲盒风 ---------- */
    {
      id: 'blind-box-3d',
      no: 48,
      name: '3D 盲盒风',
      en: 'Blind Box Figure',
      group: '3D 与游戏美术',
      desc: 'Q 版比例 + 圆润造型 + 塑胶玩具质感',
      keywords: ['chibi proportion', 'rounded form', 'vinyl toy material', 'product shot'],
      prompt: '[subject], blind box collectible figure, chibi proportions, rounded cute form, glossy vinyl PVC material, soft studio lighting, pastel background, product photo of designer toy, high detail render',
      negative: 'realistic human proportion, gritty, flat 2d, textured oil painting',
      tip: '材质词是关键：vinyl / PVC / glossy plastic。补 product photo 和 clean background 才有「实物摆件」感。',
      image: 'blind-box-3d.jpg'
    },
    /* ---------- 49 毛毡手作风 ---------- */
    {
      id: 'felt-craft',
      no: 49,
      name: '毛毡手作风',
      en: 'Felt Handcraft',
      group: '手工与材质',
      desc: '柔软纤维 + 手工缝制痕迹，温暖治愈',
      keywords: ['soft fibre', 'visible stitching', 'muted colour', 'handmade'],
      prompt: '[subject], needle felted wool craft, soft fuzzy fibre texture, visible hand stitching, low saturation cosy colours, cute rounded handmade shape, warm soft lighting, macro craft photography, artisan handmade feel',
      negative: 'glossy plastic, metal, sharp edges, clean digital render, neon',
      tip: '毛毡靠「纤维感」，写 fuzzy / fibrous / wool fibres。加 macro photography 才有手作的细节。',
      image: 'felt-craft.jpg'
    },
    /* ---------- 50 剪纸风格 ---------- */
    {
      id: 'paper-cut',
      no: 50,
      name: '剪纸风格',
      en: 'Paper Cut',
      group: '手工与材质',
      desc: '平面层叠 + 镂空边缘 + 纸张纹理',
      keywords: ['layered paper', 'cut edges', 'folk pattern', 'festive'],
      prompt: '[subject], paper cut art, flat layered paper, laser-cut edges, paper texture and subtle drop shadow, traditional decorative patterns, folk and festive mood, handcraft feel, layered depth',
      negative: 'glossy 3d, photorealistic, oil paint, soft gradient, neon',
      tip: '层叠和投影是立体感的来源，写 layered depth 和 paper shadow。中式剪纸再加 Chinese folk pattern。',
      image: 'paper-cut.jpg'
    },
    /* ---------- 51 美式漫画风 ---------- */
    {
      id: 'american-comic',
      no: 51,
      name: '美式漫画风',
      en: 'American Comic',
      group: '插画与动画',
      desc: '粗线条 + 高对比色块 + 夸张表情与动态构图',
      keywords: ['bold outline', 'high contrast', 'exaggerated expression', 'dynamic'],
      prompt: '[subject], American comic book style, bold thick outlines, high contrast colour blocks, exaggerated expression, dynamic heroic composition, dramatic shading, halftone texture, superhero narrative energy, ink and flat colour',
      negative: 'anime, soft pastel, 3d render, watercolour, muted',
      tip: '美漫和波普都是粗描边。区别是美漫有英雄姿态和戏剧光，波普是网点加消费符号。',
      image: 'american-comic.jpg'
    },
    /* ---------- 52 像素艺术风 ---------- */
    {
      id: 'pixel-art',
      no: 52,
      name: '像素艺术风',
      en: 'Pixel Art',
      group: '3D 与游戏美术',
      desc: '低分辨率方块像素，复古游戏感',
      keywords: ['low resolution pixels', 'retro game', 'limited palette', 'sprite'],
      prompt: '[subject], pixel art, low resolution blocky pixels, crisp pixel edges with no anti-aliasing, limited retro palette, 16-bit game sprite aesthetic, side view or isometric, nostalgic retro game mood',
      negative: 'smooth gradient, vector, photorealistic, blurry, high resolution detail',
      tip: '必须写 no anti-aliasing / crisp pixels，否则模型会给你「模糊的马赛克」。加 16-bit sprite 更明确。',
      image: 'pixel-art.jpg'
    },
    /* ---------- 53 低多边形风 ---------- */
    {
      id: 'low-poly',
      no: 53,
      name: '低多边形风',
      en: 'Low Poly',
      group: '3D 与游戏美术',
      desc: '几何切面 + 简化形体 + 块面色彩',
      keywords: ['geometric facets', 'simplified form', 'flat shading', 'block colour'],
      prompt: '[subject], low poly 3d art, geometric faceted surfaces, simplified forms, flat shading with visible triangular facets, limited block colour palette, clean modern game-art look, subtle ambient occlusion',
      negative: 'smooth subdivision, photorealistic, high detail texture, 2d flat vector',
      tip: '写 triangular facets 和 flat shading。想更高级就补 isometric low poly scene。',
      image: 'low-poly.jpg'
    },
    /* ---------- 54 黏土动画风 ---------- */
    {
      id: 'claymation',
      no: 54,
      name: '黏土动画风',
      en: 'Claymation',
      group: '手工与材质',
      desc: '柔软黏土材质 + 手工塑形痕迹，可爱质朴',
      keywords: ['soft clay', 'fingerprints', 'rounded chunky forms', 'tactile'],
      prompt: '[subject], claymation stop-motion style, soft clay and plasticine material, visible hand-sculpted fingerprints, rounded chunky forms, gentle studio lighting, cute naive playful mood, tactile handmade feel, macro depth of field',
      negative: 'glossy metal, sharp digital, photorealistic human, neon, flat vector',
      tip: '指纹痕迹（fingerprints）是灵魂。加 macro 和 shallow depth of field 更像定格拍摄。',
      image: 'claymation.jpg'
    },
    /* ---------- 55 定格动画风 ---------- */
    {
      id: 'stop-motion',
      no: 55,
      name: '定格动画风',
      en: 'Stop-Motion',
      group: '手工与材质',
      desc: '手工模型 + 微缩场景 + 真实材质，逐帧质感',
      keywords: ['handcrafted models', 'miniature set', 'real materials', 'frame-by-frame'],
      prompt: '[subject], stop-motion animation, handcrafted models, miniature practical set, real fabric wood and paper materials, frame-by-frame tactile quality, warm nostalgic storybook mood, shallow depth of field, studio lighting',
      negative: 'cgi smooth, digital render, photorealistic, flat 2d, neon',
      tip: '和黏土动画的区别：定格更强调「微缩实景 + 多种真实材质」（布、木、纸）。',
      image: 'stop-motion.jpg'
    },
    /* ---------- 56 水彩插画风 ---------- */
    {
      id: 'watercolor',
      no: 56,
      name: '水彩插画风',
      en: 'Watercolour Illustration',
      group: '插画与动画',
      desc: '透明水色 + 自然晕染 + 柔和边缘',
      keywords: ['transparent wash', 'natural bleed', 'soft edges', 'wet-on-wet'],
      prompt: '[subject], watercolour illustration, transparent watercolour washes, natural pigment bleeding, soft feathered edges, light layered build-up, visible paper grain, wet-on-wet blooms, fresh gentle airy mood, white paper breathing space',
      negative: 'opaque acrylic, thick impasto, digital gradient, 3d, neon',
      tip: '湿画法的「晕开」是核心，写 wet-on-wet 和 bleeding。加 paper texture 和 white space 更真。',
      image: 'watercolor.jpg'
    },
    /* ---------- 57 彩铅插画风 ---------- */
    {
      id: 'colored-pencil',
      no: 57,
      name: '彩铅插画风',
      en: 'Coloured Pencil',
      group: '插画与动画',
      desc: '细腻笔触 + 柔和叠色，温暖亲切',
      keywords: ['fine strokes', 'soft layering', 'hand-drawn texture', 'hatching'],
      prompt: '[subject], coloured pencil illustration, fine visible pencil strokes, soft layered blending, hand-drawn paper texture, subtle hatching, warm intimate detail-rich rendering, sketchbook quality',
      negative: 'digital flat colour, oil impasto, 3d render, neon, glossy',
      tip: '要留下「笔痕」，写 visible strokes / hatching，别一味写 smooth blending。',
      image: 'colored-pencil.jpg'
    },
    /* ---------- 58 铅笔素描风 ---------- */
    {
      id: 'pencil-sketch',
      no: 58,
      name: '铅笔素描风',
      en: 'Pencil Sketch',
      group: '插画与动画',
      desc: '黑白灰线条 + 明暗排线，塑造形体结构',
      keywords: ['graphite', 'hatching', 'form modelling', 'black and white'],
      prompt: '[subject], graphite pencil sketch, black white and grey tones, hatching and cross-hatching, structural form modelling, subtle tone transitions, textured sketch paper, hand-drawn foundation, refined academic drawing',
      negative: 'colour, painting, digital render, 3d, thick impasto',
      tip: '形体塑造靠 cross-hatching，写上就不会糊成一团灰。',
      image: 'pencil-sketch.jpg'
    },
    /* ---------- 59 炭笔素描风 ---------- */
    {
      id: 'charcoal-sketch',
      no: 59,
      name: '炭笔素描风',
      en: 'Charcoal Sketch',
      group: '插画与动画',
      desc: '黑白对比更强，笔触粗犷有力',
      keywords: ['strong contrast', 'rough strokes', 'deep blacks', 'expressive'],
      prompt: '[subject], charcoal drawing, strong black and white contrast, rough expressive strokes, smudged shading, rich deep blacks, textured paper tooth, portrait and figure study, raw emotional power',
      negative: 'colour, fine delicate line, digital smooth, glossy, pastel soft',
      tip: '炭笔要「黑得下去」，写 deep blacks 和 rough gesture。人像、人体的表现力最强。',
      image: 'charcoal-sketch.jpg'
    },
    /* ---------- 60 油画写实风 ---------- */
    {
      id: 'realistic-oil-painting',
      no: 60,
      name: '油画写实风',
      en: 'Realistic Oil Painting',
      group: '绘画流派',
      desc: '真实光影 + 细腻色彩过渡 + 古典绘画质感',
      keywords: ['true light', 'smooth transition', 'painterly realism', 'canvas texture'],
      prompt: '[subject], realistic oil painting, accurate light and shadow, smooth delicate colour transitions, thick but controlled material, subtle canvas texture, classical painting craft, elegant composed artistic quality, old master finish',
      negative: 'flat illustration, vector, anime, neon, sketch',
      tip: '和「古典写实油画风」的区别：这条是通用写实油画，后者特指博物馆级古典题材（历史场景、精致服饰）。',
      image: 'realistic-oil-painting.jpg'
    },
    /* ---------- 61 古典写实油画风 ---------- */
    {
      id: 'classical-realism-oil',
      no: 61,
      name: '古典写实油画风',
      en: 'Classical Realism Oil',
      group: '绘画流派',
      desc: '人物结构 + 柔和明暗 + 精致服饰与历史场景',
      keywords: ['figure structure', 'soft chiaroscuro', 'period costume', 'museum quality'],
      prompt: '[subject], classical realistic oil painting, emphasis on figure anatomy, soft chiaroscuro modelling, exquisite period costume, historical scene, museum-grade classical art quality, warm varnish tone, academic master study',
      negative: 'modern clothing, cartoon, digital flat, neon, snapshot photo',
      tip: '想要「博物馆感」就加 warm varnish / aged canvas。精致服饰和历史场景是它的识别点。',
      image: 'classical-realism-oil.jpg'
    },
    /* ---------- 62 幻想史诗风 ---------- */
    {
      id: 'epic-fantasy',
      no: 62,
      name: '幻想史诗风',
      en: 'Epic Fantasy',
      group: '暗黑与超现实',
      desc: '宏大场景 + 英雄人物 + 魔法光效，叙事感强',
      keywords: ['grand scene', 'hero figure', 'magic light', 'mythic'],
      prompt: '[subject], epic fantasy art, grand sweeping scene, heroic figures, glowing magic effects, war and mythic elements, dramatic volumetric god rays, awe-inspiring narrative scale, matte painting quality, concept art',
      negative: 'mundane, small scale, cosy domestic, cartoon, minimal',
      tip: '卷轴感的来源是「规模 + 光效」，写 god rays 和 epic scale。适合奇幻战争、神话题材。',
      image: 'epic-fantasy.jpg'
    },
    /* ---------- 63 暗黑奇幻风 ---------- */
    {
      id: 'dark-fantasy',
      no: 63,
      name: '暗黑奇幻风',
      en: 'Dark Fantasy',
      group: '暗黑与超现实',
      desc: '低明度色彩 + 怪物古堡迷雾，危险神秘',
      keywords: ['low key colour', 'monsters', 'ruined castle', 'mist'],
      prompt: '[subject], dark fantasy art, low key desaturated palette, monsters and skeletons, ruined castle, drifting mist, magic runes, oppressive mysterious dangerous world, dramatic rim light, gritty concept art',
      negative: 'bright cheerful, cute, pastel, sunny, kawaii',
      tip: '和暗黑哥特的区别：暗黑奇幻一定要有「怪物化元素」，哥特是建筑与氛围。',
      image: 'dark-fantasy.jpg'
    },
    /* ---------- 64 东方玄幻风 ---------- */
    {
      id: 'eastern-fantasy',
      no: 64,
      name: '东方玄幻风',
      en: 'Eastern Fantasy',
      group: '东方美学',
      desc: '仙侠人物 + 云海山川 + 法器灵兽',
      keywords: ['xianxia characters', 'sea of clouds', 'magic artifacts', 'spirit beasts'],
      prompt: '[subject], Chinese xuanhuan fantasy, xianxia characters in flowing robes, sea of clouds and towering mountains, magic artifacts and glowing talismans, spirit beasts, ancient Chinese costume detail, ethereal divine light, majestic mythic oriental fantasy, concept art',
      negative: 'western knight, european castle, modern, sci-fi, cartoon',
      tip: '关键词是「云海、法器、灵兽、古风服饰」，加 ethereal glow 才有仙气。',
      image: 'eastern-fantasy.jpg'
    },
    /* ---------- 65 仙侠水墨风 ---------- */
    {
      id: 'xianxia-ink',
      no: 65,
      name: '仙侠水墨风',
      en: 'Xianxia Ink',
      group: '东方美学',
      desc: '水墨山水 + 云雾 + 长袍飞剑 + 留白',
      keywords: ['ink mountains', 'mist', 'flowing robe', 'flying sword'],
      prompt: '[subject], xianxia ink wash art, ink-painted mountains and mist, flowing long robes, flying sword and bamboo, generous negative space, ethereal graceful poetic mood, oriental cultivation aesthetic, minimal monochrome with subtle accent',
      negative: 'heavy colour, western oil painting, cyberpunk, ornate baroque, 3d render',
      tip: '这是「水墨」和「仙侠」的叠加，两个关键词都要有：ink wash 加 xianxia。',
      image: 'xianxia-ink.jpg'
    },
    /* ---------- 66 机械朋克风 ---------- */
    {
      id: 'mechanical-punk',
      no: 66,
      name: '机械朋克风',
      en: 'Mechanical Punk',
      group: '科幻与未来',
      desc: '机械结构 + 钢铁材质 + 巨大装置与引擎细节',
      keywords: ['mechanical structure', 'steel', 'giant machinery', 'gears and engines'],
      prompt: '[subject], mechanical punk style, exposed mechanical structure, heavy steel and iron material, giant machinery, intricate gears and engine detail, oily metal surface, industrial power feel, hardcore tech fantasy, dramatic industrial light',
      negative: 'organic soft, floral, pastel, cute, medieval fantasy',
      tip: '和蒸汽朋克的区别：机械朋克是钢铁引擎（更硬、更工业），蒸汽朋克是黄铜齿轮加维多利亚。',
      image: 'mechanical-punk.jpg'
    },
    /* ---------- 67 生物机械风 ---------- */
    {
      id: 'biomechanical',
      no: 67,
      name: '生物机械风',
      en: 'Biomechanical',
      group: '科幻与未来',
      desc: '人体组织与机械结构融合，诡异而有冲击力',
      keywords: ['flesh fused with machine', 'eerie', 'organic tech', 'hybrid'],
      prompt: '[subject], biomechanical art, human body and biological tissue fused with mechanical structure, organic-mechanical hybrid, eerie unsettling beauty, cold futuristic life-science feel, wet slick surfaces, strong visual impact',
      negative: 'cute, soft pastel, cartoon, wholesome, floral',
      tip: '加 Giger 或 organic-mechanical hybrid 效果最强。这条天生不适合可爱主体。',
      image: 'biomechanical.jpg'
    },
    /* ---------- 68 赛博东方风 ---------- */
    {
      id: 'cyber-oriental',
      no: 68,
      name: '赛博东方风',
      en: 'Cyber Oriental',
      group: '科幻与未来',
      desc: '霓虹科技 + 东方建筑 + 汉字灯牌与龙纹',
      keywords: ['neon tech', 'oriental architecture', 'hanzi signage', 'dragon motifs'],
      prompt: '[subject], cyber oriental style, neon technology fused with Chinese traditional architecture, glowing hanzi signage, dragon motifs and upturned eaves, mechanical prosthetic detail, futuristic oriental cityscape, rain and reflection, magenta and cyan neon',
      negative: 'western cyberpunk only, medieval, pastoral, watercolour, minimal',
      tip: '这是「赛博朋克 × 国风」的混搭。东方元素（汉字灯牌、飞檐、龙纹）必须有，否则就是普通赛博。',
      image: 'cyber-oriental.jpg'
    },
    /* ---------- 69 新怪谈风 ---------- */
    {
      id: 'new-weird',
      no: 69,
      name: '新怪谈风',
      en: 'New Weird',
      group: '暗黑与超现实',
      desc: '日常场景里的诡异细节，平静中带不安',
      keywords: ['mundane scene', 'uncanny detail', 'muted', 'quiet unease'],
      prompt: '[subject], new weird fiction illustration, ordinary everyday scene with subtly wrong details, low saturation palette, uncanny surreal realism, psychological suspense mood, calm surface with quiet unease, flat even light, unsettling stillness',
      negative: 'gore, jump scare, high saturation, epic fantasy, cartoon',
      tip: '新怪谈的恐怖是「平静里的不对劲」。别写 horror / monster，写 subtly wrong 和 uncanny。',
      image: 'new-weird.jpg'
    },
    /* ---------- 70 梦核风格 ---------- */
    {
      id: 'dreamcore',
      no: 70,
      name: '梦核风格',
      en: 'Dreamcore',
      group: '暗黑与超现实',
      desc: '空旷空间 + 柔和光线 + 童年物件，熟悉又陌生',
      keywords: ['empty space', 'soft light', 'childhood objects', 'illogical'],
      prompt: '[subject], dreamcore aesthetic, vast empty spaces, soft hazy light, childhood objects and nostalgic props, illogical dreamlike scene, familiar yet strange atmosphere, pastel haze, liminal dream feeling, low detail realism',
      negative: 'sharp detail, coherent logic, high contrast, action, neon cyberpunk',
      tip: '要有「童年物件 + 空旷 + 柔光」，加 nostalgic / hazy 就对了。',
      image: 'dreamcore.jpg'
    },
    /* ---------- 71 怪核风格 ---------- */
    {
      id: 'weirdcore',
      no: 71,
      name: '怪核风格',
      en: 'Weirdcore',
      group: '暗黑与超现实',
      desc: '废弃空间 + 异常比例 + 失真色彩，荒诞不适',
      keywords: ['abandoned space', 'wrong proportion', 'distorted colour', 'uncanny'],
      prompt: '[subject], weirdcore aesthetic, abandoned interior space, wrong unnatural proportions, strange creatures, distorted oversaturated colours, compressed low quality image artifacts, amateur flash photography, unsettling absurd internet culture vibe',
      negative: 'polished, professional photo, harmonious colour, elegant, minimal',
      tip: '怪核故意要「糊、歪、失真」。低画质滤镜（jpeg artifacts、flash photo）在这里反而是加分项。',
      image: 'weirdcore.jpg'
    },
    /* ---------- 72 Liminal Space 风格 ---------- */
    {
      id: 'liminal-space',
      no: 72,
      name: 'Liminal Space 风格',
      en: 'Liminal Space',
      group: '暗黑与超现实',
      desc: '空无一人的走廊、泳池、商场，熟悉又诡异',
      keywords: ['empty corridor', 'transitional space', 'eerie stillness', 'fluorescent light'],
      prompt: '[subject], liminal space, completely empty transitional space, endless corridor and stairs, abandoned swimming pool and shopping mall, flat fluorescent lighting, eerie lonely suspended atmosphere, familiar yet wrong, wide angle',
      negative: 'people, crowd, warm cosy, action, ornate decoration',
      tip: '必须「无人」。负面词里保留 people / crowd，否则模型总会塞个人进去。',
      image: 'liminal-space.jpg'
    },
    /* ---------- 73 蒸汽波风格 ---------- */
    {
      id: 'vaporwave',
      no: 73,
      name: '蒸汽波风格',
      en: 'Vaporwave',
      group: '现代设计与平面',
      desc: '粉紫蓝渐变 + 复古电脑界面 + 古典雕塑与网格地面',
      keywords: ['pink purple gradient', 'retro computer UI', 'classical sculpture', 'grid floor'],
      prompt: '[subject], vaporwave aesthetic, pink purple blue gradient, retro 90s computer interface, classical marble sculpture, palm trees, neon grid floor, sun setting on the horizon, nostalgic psychedelic electronic mood, VHS glitch',
      negative: 'natural daylight, rustic, hand-drawn, medieval, clean modern',
      tip: '配方固定：粉紫渐变 + 石膏像 + 网格地面 + 落日。四个都有就是标准蒸汽波。',
      image: 'vaporwave.jpg'
    },
    /* ---------- 74 复古未来主义风 ---------- */
    {
      id: 'retro-futurism',
      no: 74,
      name: '复古未来主义风',
      en: 'Retro-Futurism',
      group: '科幻与未来',
      desc: '过去时代想象的未来：圆润飞船、老式仪表、银色金属',
      keywords: ['rounded spaceship', 'analog dials', 'silver metal', 'optimistic tech'],
      prompt: '[subject], retro-futurism, the future as imagined by past generations, rounded chrome spaceship, analog dials and gauges, brushed silver metal, warm amber instrument light, optimistic techno-utopian mood, 1960s space age design',
      negative: 'dystopian grime, cyberpunk neon, medieval, rustic, modern minimal',
      tip: '和赛博朋克正好相反：这条是「乐观的旧未来」。加 space age / 1960s 更准。',
      image: 'retro-futurism.jpg'
    },
    /* ---------- 75 红金国潮风 ---------- */
    {
      id: 'red-gold-guochao',
      no: 75,
      name: '红金国潮风',
      en: 'Red-Gold Guochao',
      group: '东方美学',
      desc: '中国红 + 鎏金色 + 传统纹样，喜庆华丽醒目',
      keywords: ['chinese red', 'gilded gold', 'traditional pattern', 'festive poster'],
      prompt: '[subject], red and gold Chinese festive design, Chinese red with gilded gold, traditional auspicious patterns, lantern and cloud motifs, modern typographic layout, celebratory opulent eye-catching mood, festive poster design, flat graphic quality',
      negative: 'muted, minimalist, pastel, western, dark moody, grunge',
      tip: '适合节日、品牌海报。要「喜庆」就保持红金高饱和加对称构图。',
      image: 'red-gold-guochao.jpg'
    }
  ]
};
