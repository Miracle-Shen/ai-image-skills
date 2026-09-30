/* 子项目 1：AI 生图 · 风格 Prompt
 * 50 种风格，5 个分组。
 *
 * 字段说明：
 *   id       唯一标识（英文小写中划线）
 *   name     中文名
 *   en       英文名（写 prompt 时用得到的那个）
 *   group    所属分组，必须与 projects.js 里的 groups 一致
 *   desc     一句话说清这种风格「看起来是什么样」
 *   keywords 关键词，会以标签形式展示，也可单独复制使用
 *   prompt   Prompt 正文。[subject] 是主体占位符，替换成你要画的内容
 *   negative 负面词（可选）
 *   tip      使用提示：容易翻车的点、和相邻风格的区别
 */
window.AIS_ITEMS = window.AIS_ITEMS || {};

window.AIS_ITEMS['style-prompt'] = {
  note: 'Prompt 里的 [subject] 是主体占位符。把它换成你要画的东西（英文效果更稳），例如 [subject] → a girl reading by a window。风格关键词放在后面不要动。',
  items: [

    /* ============ 动画与插画 ============ */
    {
      id: 'ghibli', no: 1, name: '吉卜力风格', en: 'Studio Ghibli', group: '动画与插画',
      desc: '手绘赛璐璐、通透暖光、茂密绿植，日常里的温柔感',
      keywords: ['studio ghibli style', 'hand-painted 2D animation', 'soft warm lighting', 'nostalgic atmosphere'],
      prompt: '[subject], in the style of Studio Ghibli, hand-painted 2D animation cel, soft warm natural lighting, lush green foliage, gentle rounded character design, wholesome nostalgic atmosphere, delicate watercolor background, muted pastel palette, subtle film grain',
      negative: 'photorealistic, 3d render, harsh shadows, distorted faces, text, watermark, oversaturated',
      tip: '主体写成「日常场景 + 小动作」最稳，例如 a child running through a rice field at dusk。别写具体角色名，模型会画崩。'
    },
    {
      id: 'miyazaki', no: 2, name: '宫崎骏风格', en: 'Hayao Miyazaki', group: '动画与插画',
      desc: '飞行器、风、浮空岛，奇幻冒险的广阔感',
      keywords: ['hayao miyazaki inspired', 'whimsical fantasy', 'windswept motion', 'cel-shaded'],
      prompt: '[subject], Hayao Miyazaki inspired illustration, whimsical fantasy world, flying machines and floating islands, rich hand-drawn detail, expressive windswept motion, warm golden sunlight, cel-shaded character with painterly background',
      negative: 'photorealistic, 3d render, stiff pose, text, watermark',
      tip: '注意：模型里「宫崎骏」和「吉卜力」高度重合。想区分，靠 flying machine / wind / adventure 这类意象词，而不是靠名字。'
    },
    {
      id: 'shinkai', no: 3, name: '新海诚风格', en: 'Makoto Shinkai', group: '动画与插画',
      desc: '高饱和天空、积雨云、光斑，清透又带点伤感',
      keywords: ['makoto shinkai style', 'hyper-detailed anime scenery', 'dramatic sky', 'lens flare'],
      prompt: '[subject], Makoto Shinkai style, hyper-detailed anime scenery, dramatic sky filled with cumulonimbus clouds, strong lens flare, saturated purple and teal gradient, glowing city lights at dusk, photorealistic anime background art, emotional and melancholic atmosphere',
      negative: 'flat lighting, dull colors, rough sketch, text, watermark',
      tip: '这种风格的灵魂是「天空」。主体可以小一点、占画面下部 1/3，把天空留给画面。'
    },
    {
      id: 'pixar', no: 4, name: '皮克斯 3D', en: 'Pixar Style', group: '动画与插画',
      desc: '圆润讨喜的 3D 角色、大眼睛、柔和次表面散射',
      keywords: ['pixar style 3D', 'expressive character', 'subsurface scattering', 'cinematic studio lighting'],
      prompt: '[subject], Pixar style 3D animation, expressive stylized character with large friendly eyes, soft subsurface scattering skin, vibrant colors, cinematic studio lighting, high quality render, cheerful heartwarming mood',
      negative: 'flat 2d, sketch, uncanny realistic face, text, watermark',
      tip: '想避免恐怖谷：明确写 stylized / caricature，不要让模型走写实人脸。'
    },
    {
      id: 'disney', no: 5, name: '迪士尼经典', en: 'Disney Classic', group: '动画与插画',
      desc: '1950 年代手绘线条、圆润造型、水彩背景',
      keywords: ['classic disney animation', 'hand-drawn line art', 'watercolor background', 'fairy tale'],
      prompt: '[subject], classic Disney 1950s animation style, soft hand-drawn line art, rounded appealing shapes, watercolor background, warm nostalgic palette, storybook fairy-tale atmosphere',
      negative: '3d render, modern cgi, harsh outlines, text, watermark',
      tip: '加 1950s 或 classic 能把它和现代迪士尼 3D 分开；不加通常会出成 3D。'
    },
    {
      id: 'dreamworks', no: 6, name: '梦工厂动画', en: 'DreamWorks', group: '动画与插画',
      desc: '棱角分明的角色、夸张表情、动作感强',
      keywords: ['dreamworks animation style', 'angular character design', 'exaggerated expression', 'dynamic pose'],
      prompt: '[subject], DreamWorks animation style, sharp angular character design, bold exaggerated facial expression, cinematic lighting, dynamic action pose, rich textured detail',
      negative: 'soft rounded cutesy style, flat lighting, text, watermark',
      tip: '和皮克斯的区分点：皮克斯「圆」、梦工厂「方」。要棱角感就写 angular / sharp cheekbones。'
    },
    {
      id: 'spiderverse', no: 7, name: '蜘蛛侠平行宇宙', en: 'Spider-Verse', group: '动画与插画',
      desc: '漫画网点、色散、手绘抖动线条、街头涂鸦感',
      keywords: ['spider-verse animation style', 'halftone dots', 'chromatic aberration', 'motion blur'],
      prompt: '[subject], Spider-Verse animation style, comic-book halftone dots, chromatic aberration, bold graphic shapes, high-contrast neon colors, motion blur, mixed 2D and 3D look, graffiti energy',
      negative: 'clean render, smooth gradients, muted colors, text, watermark',
      tip: '这种风格「脏」才对。别加 clean / smooth，会把特征洗掉。'
    },
    {
      id: 'retro-anime', no: 8, name: '90 年代复古动画', en: '90s Retro Anime', group: '动画与插画',
      desc: '赛璐璐平涂、胶片颗粒、轻微褪色、VHS 质感',
      keywords: ['1990s retro anime', 'cel animation', 'film grain', 'VHS aesthetic'],
      prompt: '[subject], 1990s retro anime style, cel animation, visible film grain, slightly desaturated colors, hand-drawn line art, VHS tracking texture, nostalgic atmosphere',
      negative: 'modern digital art, crisp vector lines, oversaturated, text, watermark',
      tip: '加 VHS / scanline 会明显加强年代感；不加容易出成现代番剧。'
    },
    {
      id: 'manga', no: 9, name: '日式漫画', en: 'Manga', group: '动画与插画',
      desc: '黑白网点、速度线、排线阴影，分镜感',
      keywords: ['japanese manga style', 'black and white ink', 'screentone', 'speed lines'],
      prompt: '[subject], Japanese manga style, black and white ink drawing, screentone shading, dynamic speed lines, expressive hatching, high contrast, comic panel composition',
      negative: 'color, painted rendering, soft shading, text, watermark',
      tip: '明确写 black and white，否则模型很爱自作主张上色。'
    },
    {
      id: 'comic', no: 10, name: '美式漫画', en: 'Comic Book', group: '动画与插画',
      desc: '粗黑描边、平涂高饱和、网点阴影，超级英雄封面',
      keywords: ['american comic book style', 'bold black outlines', 'flat vibrant colors', 'halftone shading'],
      prompt: '[subject], American comic book style, bold black outlines, flat vibrant colors, halftone dot shading, dramatic low-angle composition, superhero cover art, dynamic energy',
      negative: 'soft painting, watercolor, muted palette, text, watermark',
      tip: '低角度仰视（low-angle）是美漫封面的默认视角，加上它画面立刻「有内味」。'
    },
    {
      id: 'picture-book', no: 11, name: '儿童绘本', en: "Children's Book", group: '动画与插画',
      desc: '柔和粉彩、水粉笔触、造型简单亲和',
      keywords: ['children picture book illustration', 'soft pastel', 'gouache texture', 'simple friendly shapes'],
      prompt: '[subject], children picture book illustration, soft pastel colors, simple friendly shapes, textured gouache brushwork, gentle lighting, whimsical and heartwarming mood',
      negative: 'photorealistic, dark lighting, harsh detail, scary, text, watermark',
      tip: '做儿童内容时负面词务必加 scary / dark / realistic eyes，否则容易出惊悚感。'
    },
    {
      id: 'webtoon', no: 12, name: '韩系条漫', en: 'Korean Webtoon', group: '动画与插画',
      desc: '干净数码线稿、渐变上色、发丝高光、柔和粉调',
      keywords: ['korean webtoon style', 'clean digital line art', 'soft gradient shading', 'manhwa aesthetic'],
      prompt: '[subject], Korean webtoon style, clean digital line art, soft gradient shading, glossy hair highlights, romantic pastel palette, vertical composition, manhwa aesthetic',
      negative: 'rough sketch, heavy texture, muted colors, text, watermark',
      tip: '韩漫的辨识点在「头发」和「皮肤渐变」。加 glossy hair highlights 效果好很多。'
    },

    /* ============ 传统绘画 ============ */
    {
      id: 'oil-painting', no: 13, name: '油画', en: 'Oil Painting', group: '传统绘画',
      desc: '厚涂笔触、明暗对比强、颜料堆积的立体感',
      keywords: ['classical oil painting', 'impasto brushstrokes', 'chiaroscuro', 'canvas texture'],
      prompt: '[subject], classical oil painting, thick impasto brushstrokes, rich chiaroscuro lighting, deep saturated earth tones, visible canvas texture, old master technique, museum quality',
      negative: 'digital art, flat colors, smooth gradient, photographic, text, watermark',
      tip: '负面词里一定要写 digital / photographic，不然模型会给你一张「像油画的照片」。'
    },
    {
      id: 'watercolor', no: 14, name: '水彩', en: 'Watercolor', group: '传统绘画',
      desc: '透明水色、颜料自然晕开、留白通透',
      keywords: ['watercolor painting', 'translucent washes', 'wet-on-wet', 'paper texture'],
      prompt: '[subject], watercolor painting, translucent washes, blooming pigment edges, wet-on-wet technique, soft bleeding colors, white paper showing through, delicate ink outline',
      negative: 'thick opaque paint, hard edges, digital gradient, text, watermark',
      tip: '留白是水彩的命。加 white paper showing through 可避免模型把画面填满。'
    },
    {
      id: 'ink-wash', no: 15, name: '中国水墨', en: 'Chinese Ink Wash', group: '传统绘画',
      desc: '墨色浓淡、笔意流动、大量留白',
      keywords: ['traditional chinese ink painting', 'brush strokes', 'negative space', 'rice paper'],
      prompt: '[subject], traditional Chinese ink wash painting, flowing brush strokes, varying ink density from deep black to pale grey, generous negative space, rice paper texture, minimalist composition, subtle color accents',
      negative: 'photorealistic, heavy saturation, dense detail, western oil painting, text, watermark',
      tip: '水墨最怕「画满」。强制写 generous negative space / minimalist，并且主体只占画面 1/3。'
    },
    {
      id: 'gongbi', no: 16, name: '工笔重彩', en: 'Gongbi', group: '传统绘画',
      desc: '极细勾线、层层矿物颜料、华丽精致',
      keywords: ['chinese gongbi painting', 'fine meticulous brushwork', 'mineral pigments', 'silk texture'],
      prompt: '[subject], Chinese Gongbi painting, fine meticulous brushwork, delicate even outlines, layered mineral pigments, rich vermilion red and gold, silk canvas texture, ornate traditional detail',
      negative: 'loose sketchy strokes, watercolor wash, muted palette, text, watermark',
      tip: '工笔和写意的区别就在线条：一定要写 fine meticulous / even outlines，否则会跑成写意。'
    },
    {
      id: 'charcoal', no: 17, name: '炭笔素描', en: 'Charcoal Sketch', group: '传统绘画',
      desc: '黑白灰层次、擦揉质感、粗纸颗粒',
      keywords: ['charcoal drawing', 'smudged shading', 'value contrast', 'paper grain'],
      prompt: '[subject], charcoal drawing on textured paper, smudged graphite shading, dramatic value contrast, expressive loose strokes, monochrome, rough paper grain',
      negative: 'color, digital smooth shading, vector lines, text, watermark',
      tip: '注意 charcoal（炭笔）和 graphite（铅笔）质感不同。要更黑更粗就写 vine charcoal。'
    },
    {
      id: 'colored-pencil', no: 18, name: '彩色铅笔', en: 'Colored Pencil', group: '传统绘画',
      desc: '细密交叉排线、笔触可见、纸纹明显',
      keywords: ['colored pencil illustration', 'cross-hatching', 'visible pencil strokes', 'paper tooth'],
      prompt: '[subject], colored pencil illustration, fine cross-hatching, visible pencil strokes, layered vibrant colors, paper tooth texture, hand-drawn warmth, detailed shading',
      negative: 'smooth digital painting, airbrush, thick paint, text, watermark',
      tip: '交叉排线是识别特征。加 cross-hatching 能明显提升「铅笔味」，不加会变成普通彩绘。'
    },
    {
      id: 'ukiyoe', no: 19, name: '浮世绘', en: 'Ukiyo-e', group: '传统绘画',
      desc: '平涂色块、粗黑轮廓、波浪纹样、江户气质',
      keywords: ['japanese ukiyo-e', 'woodblock print', 'flat color areas', 'bold outlines'],
      prompt: '[subject], Japanese Ukiyo-e woodblock print, flat areas of color, bold black outlines, stylized wave patterns, Hokusai inspired, muted indigo and vermilion palette, Edo period aesthetic, visible woodblock grain',
      negative: '3d shading, photorealistic, soft gradients, digital painting, text, watermark',
      tip: '「平涂 + 无渐变」是关键。负面词加 soft gradients 防止模型自作主张加立体感。'
    },
    {
      id: 'impressionism', no: 20, name: '印象派', en: 'Impressionism', group: '传统绘画',
      desc: '碎笔触、重光色氛围、边缘模糊',
      keywords: ['impressionist oil painting', 'broken brushstrokes', 'light and atmosphere', 'plein air'],
      prompt: '[subject], Impressionist oil painting, broken dappled brushstrokes, emphasis on light and atmosphere over detail, soft blurred edges, pastel palette, Monet inspired, plein air feeling',
      negative: 'sharp outlines, hyperdetailed, black outlines, digital art, text, watermark',
      tip: '印象派要「糊」。负面词写 sharp outlines / crisp detail，越清晰越不对。'
    },
    {
      id: 'post-impressionism', no: 21, name: '后印象派', en: 'Post-Impressionism', group: '传统绘画',
      desc: '旋转笔触、大胆非写实配色、厚涂',
      keywords: ['post-impressionist painting', 'swirling brushstrokes', 'expressive colors', 'van gogh inspired'],
      prompt: '[subject], Post-Impressionist painting, bold swirling brushstrokes, expressive unnatural colors, thick paint texture, Van Gogh inspired, dynamic rhythmic composition, glowing yellow and deep blue',
      negative: 'flat vector, smooth digital gradient, photorealistic, text, watermark',
      tip: '梵高感的两个必备词：swirling brushstrokes + thick paint。缺一个都会「不够梵高」。'
    },
    {
      id: 'surrealism', no: 22, name: '超现实主义', en: 'Surrealism', group: '传统绘画',
      desc: '梦境逻辑、不可能的场景、写实手法画荒诞内容',
      keywords: ['surrealist painting', 'dreamlike scene', 'impossible objects', 'dali inspired'],
      prompt: '[subject], surrealist painting, dreamlike impossible scene, melting and distorted objects, floating elements, hyperreal rendering of unreal content, Dali inspired, vast empty sky, unsettling calm',
      negative: 'ordinary realistic scene, cluttered detail, cartoon, text, watermark',
      tip: '超现实的力量来自「画得很真、但内容不可能」。所以既要 hyperreal 又要 impossible，两个都要写。'
    },
    {
      id: 'art-nouveau', no: 23, name: '新艺术运动', en: 'Art Nouveau', group: '传统绘画',
      desc: '藤蔓曲线、华丽边框、穆夏式装饰海报',
      keywords: ['art nouveau illustration', 'ornate decorative border', 'alphonse mucha style', 'flowing lines'],
      prompt: '[subject], Art Nouveau illustration, ornate decorative border, flowing organic vine lines, Alphonse Mucha style, muted gold and sage palette, elegant flat color, vintage poster composition',
      negative: 'harsh geometric shapes, brutalist, neon colors, text, watermark',
      tip: '边框是这个风格的招牌。写 ornate decorative border 会自动帮你在画面四周加装饰框。'
    },
    {
      id: 'pop-art', no: 24, name: '波普艺术', en: 'Pop Art', group: '传统绘画',
      desc: '高饱和平涂、粗黑边、网点、丝网印刷感',
      keywords: ['pop art', 'andy warhol inspired', 'bold flat primary colors', 'halftone dots'],
      prompt: '[subject], Pop Art, Andy Warhol inspired, bold flat primary colors, thick black outlines, halftone dots, high saturation, repeated grid motif, silk-screen print look',
      negative: 'realistic shading, muted colors, subtle gradient, text, watermark',
      tip: '想要那种四宫格重复效果，就写 repeated 2x2 grid of the same subject with different color schemes。'
    },

    /* ============ 摄影与电影 ============ */
    {
      id: 'cinematic', no: 25, name: '电影感', en: 'Cinematic', group: '摄影与电影',
      desc: '宽银幕、浅景深、冷暖对冲的调色',
      keywords: ['cinematic film still', 'anamorphic lens', 'teal and orange', 'shallow depth of field'],
      prompt: '[subject], cinematic film still, anamorphic lens, shallow depth of field, dramatic rim lighting, teal and orange color grading, 35mm film, movie poster quality, atmospheric haze',
      negative: 'flat lighting, snapshot, amateur photo, text, watermark',
      tip: '「青橙调」是最省事的电影感开关。teal and orange 两个词就够，不用堆更多。'
    },
    {
      id: 'wes-anderson', no: 26, name: '韦斯·安德森', en: 'Wes Anderson', group: '摄影与电影',
      desc: '绝对对称、正面平视、粉彩色板、冷幽默',
      keywords: ['wes anderson style', 'symmetrical composition', 'pastel palette', 'deadpan'],
      prompt: '[subject], Wes Anderson style, perfectly symmetrical composition, flat frontal framing, pastel color palette, whimsical production design, centered subject, deadpan mood',
      negative: 'asymmetric composition, dutch angle, gritty realism, harsh colors, text, watermark',
      tip: '对称是硬要求。负面词一定加 asymmetric，模型手很痒总想搞倾斜构图。'
    },
    {
      id: 'bw-photo', no: 27, name: '黑白摄影', en: 'B&W Photography', group: '摄影与电影',
      desc: '极致黑白对比、粗颗粒、侧光塑造',
      keywords: ['black and white photograph', 'high contrast', 'film grain', 'side lighting'],
      prompt: '[subject], black and white photograph, high contrast, deep blacks and bright highlights, sharp film grain, dramatic side lighting, timeless documentary feel',
      negative: 'color, HDR, flat lighting, digital smoothness, text, watermark',
      tip: '写 color 进负面词很关键 —— 模型对「黑白」的理解经常只是在画面上盖一层灰。'
    },
    {
      id: 'film-kodak', no: 28, name: '胶片质感', en: 'Kodak Film', group: '摄影与电影',
      desc: '柯达暖调、细腻颗粒、高光柔化溢出',
      keywords: ['kodak portra 400', 'warm golden tones', 'film grain', 'halation'],
      prompt: '[subject], Kodak Portra 400 film photograph, warm golden tones, fine film grain, soft halation around highlights, slight light leak, nostalgic analog color, natural skin tones',
      negative: 'digital look, HDR, oversharpened, cold tones, text, watermark',
      tip: 'halation（高光溢出）是胶片感的隐藏开关，比单纯加 grain 有效得多。'
    },
    {
      id: 'macro', no: 29, name: '微距摄影', en: 'Macro Photography', group: '摄影与电影',
      desc: '极浅景深、超高细节、水珠与纹理',
      keywords: ['extreme macro photography', 'shallow depth of field', 'ultra fine detail', 'bokeh'],
      prompt: '[subject], extreme macro photography, shallow depth of field, ultra fine detail, water droplets, soft bokeh background, studio lighting, 100mm macro lens',
      negative: 'wide shot, deep focus, cluttered background, blurry subject, text, watermark',
      tip: '主体必须是「小东西」。如果你写 a person，模型会给你一张奇怪的大特写。'
    },
    {
      id: 'long-exposure', no: 30, name: '长曝光', en: 'Long Exposure', group: '摄影与电影',
      desc: '丝滑运动拖影、光轨、水面如雾',
      keywords: ['long exposure photography', 'motion blur', 'light trails', 'ND filter'],
      prompt: '[subject], long exposure photography, silky smooth motion blur, glowing light trails, dreamy flowing water like mist, tripod stability, ND filter, ethereal atmosphere',
      negative: 'frozen motion, harsh flash, cluttered detail, text, watermark',
      tip: '长曝光需要「动的东西」才成立 —— 水、车流、云、人流。静止主体配它会显得很空。'
    },
    {
      id: 'double-exposure', no: 31, name: '双重曝光', en: 'Double Exposure', group: '摄影与电影',
      desc: '两层半透明叠合、人影与风景互融',
      keywords: ['double exposure photograph', 'translucent layers', 'ghostly blend', 'high contrast'],
      prompt: '[subject], double exposure photograph, overlapping translucent layers, ghostly blend of figure and landscape, high contrast, artistic composite, moody monochrome with one accent color',
      negative: 'single flat subject, cluttered layers, muddy overlap, text, watermark',
      tip: '这种风格靠「两层」成立：写清哪两层（人物 + 风景 / 建筑 + 树）。只写一层模型不会叠。'
    },
    {
      id: 'cyanotype', no: 32, name: '蓝晒', en: 'Cyanotype', group: '摄影与电影',
      desc: '普鲁士蓝、白线剪影、手涂纸边',
      keywords: ['cyanotype print', 'prussian blue', 'sun printing', 'antique process'],
      prompt: '[subject], cyanotype blueprint print, deep Prussian blue and white only, sun-printed botanical texture, visible paper fibers, hand-coated rough edges, antique photographic process',
      negative: 'full color, digital photo, glossy finish, modern look, text, watermark',
      tip: '颜色锁死在「蓝 + 白」两色。负面词写 full color，否则模型会忍不住补色。'
    },
    {
      id: 'tilt-shift', no: 33, name: '移轴', en: 'Tilt-Shift', group: '摄影与电影',
      desc: '微缩模型感、上下重度虚化、俯视',
      keywords: ['tilt-shift photography', 'miniature effect', 'selective focus', 'top-down view'],
      prompt: '[subject], tilt-shift photography, miniature model effect, narrow selective focus band, heavily blurred foreground and background, saturated colors, elevated top-down view, toy-like scale',
      negative: 'deep focus, eye-level shot, desaturated, text, watermark',
      tip: '必须配俯视角度（elevated / top-down）才像微缩模型。平视加移轴只会像跑焦。'
    },

    /* ============ 数字与未来 ============ */
    {
      id: 'cyberpunk', no: 34, name: '赛博朋克', en: 'Cyberpunk', group: '数字与未来',
      desc: '霓虹雨夜、全息招牌、品红与青、高科技低生活',
      keywords: ['cyberpunk', 'neon rainy street', 'holographic signage', 'magenta and cyan'],
      prompt: '[subject], cyberpunk, neon-drenched rainy street, holographic signage, chrome and glass, magenta and cyan lighting, volumetric fog, high tech low life, blade runner atmosphere',
      negative: 'daylight, pastoral, rustic, warm natural light, text, watermark',
      tip: '两个开关：rainy（湿地面反光）+ neon。干燥的赛博朋克看起来就是普通科幻。'
    },
    {
      id: 'steampunk', no: 35, name: '蒸汽朋克', en: 'Steampunk', group: '数字与未来',
      desc: '黄铜齿轮、维多利亚服饰、蒸汽与仪表',
      keywords: ['steampunk', 'brass gears', 'victorian', 'steam and gauges'],
      prompt: '[subject], steampunk, brass gears and copper pipes, Victorian era clothing, steam vents and pressure gauges, warm amber lighting, intricate clockwork detail, sepia and bronze palette',
      negative: 'modern materials, plastic, neon, futuristic chrome, text, watermark',
      tip: '和柴油朋克的区分：蒸汽朋克偏「黄铜 + 华丽」，柴油朋克偏「钢铁 + 做旧」。'
    },
    {
      id: 'dieselpunk', no: 36, name: '柴油朋克', en: 'Dieselpunk', group: '数字与未来',
      desc: '1940 年代复古未来、铆钉重工业、装饰艺术造型',
      keywords: ['dieselpunk', 'retro-futurism 1940s', 'riveted metal', 'art deco'],
      prompt: '[subject], dieselpunk, 1940s retro-futurism, heavy riveted metal plates, diesel engines, art deco shapes, gritty industrial haze, muted khaki and rust palette',
      negative: 'gleaming chrome, clean futuristic, pastel, delicate, text, watermark',
      tip: '关键词是「重」和「脏」。加 gritty / rust / worn 会立刻和蒸汽朋克拉开差距。'
    },
    {
      id: 'solarpunk', no: 37, name: '太阳朋克', en: 'Solarpunk', group: '数字与未来',
      desc: '白建筑配垂直花园、阳光充沛、乐观乌托邦',
      keywords: ['solarpunk', 'vertical gardens', 'white architecture', 'optimistic utopian'],
      prompt: '[subject], solarpunk, lush vertical gardens on white curved architecture, glass and solar panels, bright optimistic sunlight, clean elegant technology, green and white palette, utopian hopeful mood',
      negative: 'dystopian, dark, rusty, gritty, pollution, text, watermark',
      tip: '太阳朋克是「亮」的朋克。负面词里写 dark / dystopian 很重要，不然模型会往赛博朋克跑。'
    },
    {
      id: 'vaporwave', no: 38, name: '蒸汽波', en: 'Vaporwave', group: '数字与未来',
      desc: '粉紫渐变、低分辨率 CRT、罗马雕塑、消费主义怀旧',
      keywords: ['vaporwave', '90s retro digital', 'pink and cyan gradient', 'CRT texture'],
      prompt: '[subject], vaporwave, 90s retro digital aesthetic, pink and cyan gradient, glitch artifacts, classical roman busts, palm tree silhouettes, low-res CRT texture, surreal consumer nostalgia',
      negative: 'high resolution realism, warm natural tones, gritty detail, text, watermark',
      tip: '和合成波的区别：蒸汽波偏「粉紫 + 静止怀旧」，合成波偏「霓虹网格 + 速度感」。'
    },
    {
      id: 'synthwave', no: 39, name: '合成波', en: 'Synthwave', group: '数字与未来',
      desc: '霓虹网格地平线、线框太阳、80 年代速度感',
      keywords: ['synthwave', '80s retro-futurism', 'neon grid horizon', 'wireframe sun'],
      prompt: '[subject], synthwave, 80s retro-futurism, neon grid horizon, wireframe sun, chrome and purple, glowing outlines, dark background with neon accents, outrun aesthetic',
      negative: 'daylight, pastel softness, rustic, hand-drawn texture, text, watermark',
      tip: '必加 dark background。合成波的霓虹是在暗底上才亮的，放亮底会糊成一片。'
    },
    {
      id: 'lowpoly', no: 40, name: '低多边形', en: 'Low Poly', group: '数字与未来',
      desc: '可见三角面、平面着色、几何简化',
      keywords: ['low poly 3D', 'faceted geometry', 'flat shaded polygons', 'minimal palette'],
      prompt: '[subject], low poly 3D art, visible triangular faceted geometry, flat shaded polygons, minimal color palette, stylized simple shapes, clean render, subtle gradient background',
      negative: 'high detail, smooth surface, photorealistic, organic curves, text, watermark',
      tip: '「能看见三角面」是全部意义。别加 smooth / high detail，加了你就要的是别的风格。'
    },
    {
      id: 'voxel', no: 41, name: '体素艺术', en: 'Voxel Art', group: '数字与未来',
      desc: '方块堆叠、等距视角、锐利边缘',
      keywords: ['voxel art', '3D pixel blocks', 'isometric view', 'magicavoxel render'],
      prompt: '[subject], voxel art, 3D pixel blocks, cubic construction, isometric view, vibrant flat colors, sharp edges, MagicaVoxel render, playful game asset look',
      negative: 'smooth surfaces, realistic texture, organic curves, text, watermark',
      tip: '配等距视角（isometric）最经典。正面视角的体素会显得很平，没有立体魅力。'
    },
    {
      id: 'pixel-art', no: 42, name: '像素艺术', en: 'Pixel Art', group: '数字与未来',
      desc: '有限色板、方形像素、抖动过渡、红白机质感',
      keywords: ['8-bit pixel art', 'limited palette', 'square pixels', 'NES sprite'],
      prompt: '[subject], 8-bit pixel art, limited color palette of 16 colors, visible square pixels, dithering for shading, retro NES sprite aesthetic, crisp edges, no anti-aliasing',
      negative: 'blurry, anti-aliasing, smooth gradient, high resolution, text, watermark',
      tip: 'no anti-aliasing 必须写。模型默认会做抗锯齿，出来的「像素」边缘是糊的。'
    },
    {
      id: 'glitch', no: 43, name: '故障艺术', en: 'Glitch Art', group: '数字与未来',
      desc: 'RGB 错位、扫描线撕裂、数据损坏感',
      keywords: ['glitch art', 'datamoshing', 'RGB channel separation', 'scanline distortion'],
      prompt: '[subject], glitch art, datamoshing effect, RGB channel separation, scanline distortion, corrupted digital artifacts, neon color bleeding, VHS tracking error, high contrast',
      negative: 'clean render, pristine image, soft focus, pastel, text, watermark',
      tip: '底层要有一张「正常图」被破坏。加 corrupted 但别过度，过度后人脸和主体会完全散掉。'
    },

    /* ============ 3D 渲染与手工材质 ============ */
    {
      id: 'unreal5', no: 44, name: 'UE5 写实渲染', en: 'Unreal Engine 5', group: '3D 渲染与手工材质',
      desc: '光线追踪、全局光照、物理准确的材质',
      keywords: ['unreal engine 5 render', 'ray tracing', 'global illumination', 'PBR materials'],
      prompt: '[subject], Unreal Engine 5 render, hyperrealistic PBR materials, ray-traced reflections, global illumination, cinematic depth of field, 8K detail, physically accurate lighting',
      negative: 'cartoon, flat shading, low poly, painterly, text, watermark',
      tip: '这种风格拼的是「光」。加 ray-traced reflections 和 global illumination，画面质感立刻不一样。'
    },
    {
      id: 'octane', no: 45, name: 'Octane 商业渲染', en: 'Octane Render', group: '3D 渲染与手工材质',
      desc: '影棚级布光、干净背景、商品级锐利细节',
      keywords: ['octane render', 'studio lighting', 'subsurface materials', 'commercial quality'],
      prompt: '[subject], Octane Render, professional 3D studio lighting, glossy subsurface materials, clean seamless studio background, razor-sharp product detail, commercial advertising quality',
      negative: 'cluttered background, amateur lighting, noise, grain, text, watermark',
      tip: '适合产品图、图标、单物件。要干净就配 clean seamless background，别让它加场景。'
    },
    {
      id: 'claymation', no: 46, name: '黏土定格', en: 'Claymation', group: '3D 渲染与手工材质',
      desc: '橡皮泥质感、指纹痕迹、手工微缩布景',
      keywords: ['claymation stop-motion', 'plasticine texture', 'handmade set', 'aardman style'],
      prompt: '[subject], claymation stop-motion, plasticine clay texture, visible fingerprints and tool marks, handmade miniature set, soft studio lighting, Aardman style, charming imperfection',
      negative: 'smooth digital render, glossy plastic, photorealistic, text, watermark',
      tip: '「不完美」才是卖点：加 visible fingerprints / imperfection，做得太光滑就假了。'
    },
    {
      id: 'papercut', no: 47, name: '纸雕艺术', en: 'Papercut', group: '3D 渲染与手工材质',
      desc: '多层纸片堆叠、锐利裁边、层间投影',
      keywords: ['layered papercut art', 'stacked paper', 'crisp cut edges', 'soft drop shadows'],
      prompt: '[subject], layered papercut art, stacked colored paper layers, crisp cut edges, soft drop shadows between layers, real depth and dimension, handcrafted paper craft, flat pastel palette',
      negative: 'single flat layer, painting, brushstrokes, digital gradient, text, watermark',
      tip: '关键在「层间阴影」。写 soft drop shadows between layers，否则看起来像平面插画而不是纸雕。'
    },
    {
      id: 'stained-glass', no: 48, name: '玻璃彩绘', en: 'Stained Glass', group: '3D 渲染与手工材质',
      desc: '粗黑铅条分隔、宝石色透光玻璃',
      keywords: ['stained glass art', 'black lead lines', 'translucent colored glass', 'backlit'],
      prompt: '[subject], stained glass window art, thick black lead lines separating shapes, glowing translucent colored glass, jewel tones, church light, luminous backlit detail',
      negative: 'continuous painting, no outlines, matte surface, dull colors, text, watermark',
      tip: '「黑铅条」是结构骨架，必须写 thick black lead lines，否则就是一幅彩色画而已。'
    },
    {
      id: 'dunhuang', no: 49, name: '敦煌壁画', en: 'Dunhuang Mural', group: '3D 渲染与手工材质',
      desc: '矿物颜料色、飞天飘带、斑驳墙面',
      keywords: ['dunhuang mural', 'ancient cave painting', 'mineral pigments', 'flying apsaras'],
      prompt: '[subject], Dunhuang mural style, ancient Chinese cave painting, mineral pigment colors, ochre red and azurite blue, flowing apsaras flying figures with long ribbons, weathered cracked wall texture, Tang dynasty aesthetic',
      negative: 'modern digital art, glossy finish, clean surface, neon colors, text, watermark',
      tip: '做游戏皮肤包很吃这套。加 weathered cracked wall texture 会有壁画特有的「旧」，不加就是普通国风插画。'
    },
    {
      id: 'porcelain', no: 50, name: '青花瓷', en: 'Blue-and-White Porcelain', group: '3D 渲染与手工材质',
      desc: '钴蓝勾线、白釉底、缠枝纹样、开片质感',
      keywords: ['blue and white porcelain', 'cobalt blue on white', 'ming dynasty motif', 'crackle glaze'],
      prompt: '[subject], blue and white porcelain painting, cobalt blue on white ceramic glaze, delicate brushwork, Chinese Ming dynasty motif, crackle glaze texture, elegant flowing traditional pattern',
      negative: 'full color palette, glossy plastic, modern graphic, heavy shadows, text, watermark',
      tip: '和蓝晒很像但基底不同：蓝晒是「纸」，青花是「瓷」。加 ceramic glaze 才会出瓷器那种润泽反光。'
    }
  ]
};
