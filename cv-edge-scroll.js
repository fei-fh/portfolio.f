(() => {
  const about = document.getElementById('about');
  const copy = about?.querySelector('.about-copy');
  const gallery = about?.querySelector('.about-gallery');
  const track = about?.querySelector('.about-track');
  if (!about || !copy || !gallery || !track) return;
  const allPhotos = ['IMG_3301.JPG','IMG_2967.JPG','IMG_5206.JPG','IMG_5213.JPG','IMG_3110.JPG','IMG_8779.JPG','IMG_2452.jpg','fxn 2024-11-22 152017.049.jpg','IMG_4948.JPG','IMG_9263.JPG','Weixin Image_2026-09-21_141317_071.jpg','DSC03853.JPG','IMG_1821.jpg','IMG_9891.JPG','cv-1.JPG','cv-3.JPG','cv-2.JPG','IMG_2477.JPG','IMG_1787.JPG','IMG_8984.jpg','IMG_4628.JPG','IMG_5279.JPG','DSC02922.jpg','DSC03515.JPEG','DSC02918.jpg','3c6d2fb830a84247e7f0ee03114779b3.jpg','630911154a69ea6067867bcd41914c.JPG','69FA46D7-CB1B-40F1-9A51-2C9DAF787983-2566-000001DF0EF187B5.JPG','c9a59691a6caac14f03b2ef0994d95.JPG','DSC03085.jpg','DSC05865.JPG','IMG_0130.JPG','Weixin Image_20260922135028_29_12.png','Weixin Image_20260922135036_30_12.png','Weixin Image_20260922135044_31_12.png','Weixin Image_20260922135053_32_12.png','Weixin Image_20260922135111_33_12.png','Weixin Image_20260922135121_34_12.png','Weixin Image_20260922135142_35_12.png','Weixin Image_20260922135210_36_12.jpg','Weixin Image_20260922135225_37_12.jpg','Weixin Image_20260922135258_39_12.png'];
  const figmaPhotos = ['IMG_1821.jpg','IMG_3678.webp','Weixin Image_20260922135121_34_12.png','IMG_8984.jpg','IMG_9263.JPG','Weixin Image_20260922135111_33_12.png','IMG_3332.webp','Weixin Image_2026-09-21_141317_071.jpg'];
  const figmaOriginals = new Set(['IMG_1821.jpg','Weixin Image_20260922135121_34_12.png','IMG_8984.jpg','IMG_9263.JPG','Weixin Image_20260922135111_33_12.png','Weixin Image_2026-09-21_141317_071.jpg']);
  const desktopPhotos = [...figmaPhotos, ...allPhotos.filter((file) => !figmaOriginals.has(file))];
  // Figma desktop composition: x, y, width, height (%), z-index.
  const DESKTOP_COMPOSITIONS = [[[7,5,47,45,2],[59,2,24,54,5],[3,30,22,20,3],[30,40,33,34,6],[71,60,25,22,4],[3,58,22,21,3],[18,64,25,31,7],[47,58,36,25,8]]];
  const MOBILE_COMPOSITIONS = [[[29,18,40,44,3],[1,2,29,28,2],[72,0,26,30,1],[0,37,29,35,4],[70,40,28,29,5],[36,72,28,26,6],[36,0,27,20,2],[2,76,29,23,4],[72,76,25,22,5]],[[0,18,39,44,3],[43,0,27,29,2],[73,8,25,27,1],[40,40,30,33,4],[73,46,25,29,5],[5,76,30,23,6],[4,0,27,17,2],[39,79,28,20,3],[73,81,25,18,4]],[[56,23,42,43,3],[1,0,30,29,2],[37,0,24,24,1],[0,39,27,32,4],[30,34,28,32,5],[38,75,28,24,6],[72,0,25,22,2],[2,77,29,21,3],[73,73,25,26,4]],[[28,30,42,42,3],[0,0,31,29,2],[65,0,32,31,1],[0,41,28,32,4],[74,42,24,29,5],[37,78,27,21,6],[36,0,25,25,2],[3,80,27,19,4],[74,77,24,22,5]],[[0,27,42,43,3],[38,0,27,24,2],[72,5,26,30,1],[43,38,28,31,4],[75,47,23,26,5],[37,78,28,21,6],[0,0,29,23,2],[2,79,28,20,4],[75,79,23,20,5]]];
  const DESKTOP_IMAGE_ADJUSTMENTS = {
    '1-1': { marginTop: '-14px', marginLeft: '89px', paddingLeft: '70px', height: '235.09px', maxHeight: 'none' },
    '1-3': { marginTop: '-65px', marginLeft: '36px', height: '220.59px', maxHeight: 'none' },
    '1-4': { marginTop: '94px', marginLeft: '-4px' },
    '1-5': { marginTop: '-32px', marginLeft: '113px' },
    '1-6': { height: '276.18px', maxHeight: 'none' },
    '1-7': { marginTop: '174px', marginLeft: '64px', height: '282.98px', maxHeight: 'none' },
    '1-8': { marginTop: '116px', marginLeft: '114px', height: '229.5px', maxHeight: 'none' },
    '2-1': { marginTop: '-47px', marginLeft: '-50px', width: '158.06px', height: '218.09px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '2-2': { marginTop: '30px', marginLeft: '-92px', width: '443.52px', height: '183.31px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '2-5': { marginTop: '-166px', marginLeft: '-16px' },
    '2-7': { paddingTop: '23px', paddingBottom: '23px', paddingLeft: '14px', width: '259.5px', height: '293.98px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '2-8': { marginTop: '88px', width: '330.27px', height: '388.5px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '3-1': { marginTop: '-82px', width: '270.06px', height: '350px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '3-2': { marginTop: '155px', marginLeft: '125px' },
    '3-3': { marginTop: '17px', marginRight: '1px', marginLeft: '164px', width: '215.56px', height: '288.59px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '3-4': { marginTop: '20px', marginLeft: '123px' },
    '3-5': { marginTop: '243px' },
    '3-6': { width: '180px', height: '170px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '3-7': { marginTop: '93px' },
    '3-8': { marginTop: '135px', width: '254.27px', maxWidth: 'none' },
    '4-1': { width: '233px', maxWidth: 'none' },
    '4-2': { marginTop: '-13px', marginLeft: '-26px', width: '124px', height: '183px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '4-3': { marginTop: '87px', width: '233.56px', height: '311.59px', maxWidth: 'none', maxHeight: 'none', objectFit: 'cover' },
    '4-4': { marginTop: '-102px' },
    '4-5': { marginTop: '-186px', marginLeft: '-19px', height: '180px', maxHeight: 'none' },
    '4-7': { marginLeft: '108px', height: '297.98px', maxHeight: 'none' },
    '4-8': { paddingBottom: '25px', paddingLeft: '164px', height: '203.5px', maxHeight: 'none' },
    '5-1': { marginTop: '-62px' },
    '5-2': { marginTop: '-129px' },
    '5-3': { marginTop: '-62px', height: '228.59px', maxHeight: 'none' },
    '5-4': { marginTop: '-42px' },
    '5-5': { marginTop: '-148px', height: '300.76px', maxHeight: 'none' },
    '5-8': { marginTop: '47px', paddingRight: '130px', height: '264.5px', maxHeight: 'none' },
    '6-1': { marginTop: '-105px' },
    '6-2': { marginTop: '-109px', marginLeft: '59px' },
    '6-4': { marginTop: '-37px' }
  };
  const DESKTOP_HIDDEN_IMAGES = new Set(['4-6']);
  const desktopAbout = window.matchMedia('(min-width: 821px)');
  let aboutGalleryMode = '';
  const mountAboutGallery = () => {
    const mode = desktopAbout.matches ? 'desktop' : 'mobile';
    if (aboutGalleryMode === mode) return;
    aboutGalleryMode = mode;
    const photos = mode === 'desktop' ? desktopPhotos : allPhotos;
    const compositions = mode === 'desktop' ? DESKTOP_COMPOSITIONS : MOBILE_COMPOSITIONS;
    const fragment = document.createDocumentFragment();
    photos.forEach((file, index) => {
      const patternSize = compositions[0].length;
      const patternIndex = Math.floor(index / patternSize);
      if (index % patternSize === 0) {
        const canvas = document.createElement('div');
        canvas.className = 'about-composition';
        fragment.append(canvas);
      }
      const [x, y, w, h, z] = compositions[patternIndex % compositions.length][index % patternSize];
      const figure = document.createElement('figure');
      figure.className = 'about-photo';
      figure.style.cssText = `--photo-x:${x}%;--photo-y:${y}%;--photo-width:${w}%;--photo-height:${h}%;--photo-z:${z}`;
      const slot = `${patternIndex + 1}-${(index % patternSize) + 1}`;
      if (mode === 'desktop' && DESKTOP_HIDDEN_IMAGES.has(slot)) {
        fragment.lastChild.append(figure);
        return;
      }
      const image = document.createElement('img');
      image.loading = index < 3 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.src = file.endsWith('.webp') ? `Images-web/about/${file}` : optimizedImageSource(`Images/about/${file}`);
      image.alt = `学习、制作与生活记录 ${index + 1}`;
      image.draggable = false;
      if (mode === 'desktop') {
        Object.assign(image.style, DESKTOP_IMAGE_ADJUSTMENTS[slot] || {});
      }
      figure.append(image);
      fragment.lastChild.append(figure);
    });
    track.replaceChildren(fragment);
  };
  document.addEventListener('site:scenechange', (event) => {
    if (event.detail?.id === 'about') mountAboutGallery();
  });
  desktopAbout.addEventListener('change', () => {
    if (about.classList.contains('scene-active')) mountAboutGallery();
  });
  if (about.classList.contains('scene-active')) mountAboutGallery();

  const education = document.querySelector('#cv .education-panel');
  if (education) {
    const title = education.querySelector('.cv-panel-title');
    const records = education.querySelector('.education-records');
    title.classList.add('skills-title', 'education-title');
    Object.assign(education.style, { display: 'grid', gridTemplateColumns: '24% 1fr', columnGap: '3vw', alignItems: 'start', minHeight: '100dvh', padding: '12vh 10vw 7vh' });
    // Deliberately mirror the Skills heading's layout and scrolling behavior.
    Object.assign(title.style, { position: 'sticky', top: '0', left: 'auto', gridColumn: '1', gridRow: '1', margin: '0', paddingTop: '13vh', transform: 'none', alignSelf: 'start', zIndex: 'auto', pointerEvents: 'auto' });
    Object.assign(title.querySelector('h1').style, { fontSize: 'clamp(56px, 6vw, 92px)', whiteSpace: 'nowrap' });
    Object.assign(records.style, { gridColumn: '2', gridRow: '1', width: '100%', margin: '8vh 0 0' });
    records.querySelectorAll('article').forEach((article) => {
      Object.assign(article.style, { display: 'grid', gridTemplateColumns: '200px minmax(0, 1fr)', gap: '2vw', padding: '1.35rem 0' });
      const date = article.querySelector('.record-date');
      const copy = article.querySelector('div');
      if (date) Object.assign(date.style, { whiteSpace: 'nowrap', fontSize: '12px' });
      if (copy) copy.querySelectorAll('p').forEach((line) => { line.style.whiteSpace = 'nowrap'; line.style.maxWidth = 'none'; });
    });
  }

  const work = document.querySelector('#cv .work-panel');
  if (work) {
    const title = work.querySelector('.work-title');
    const rows = work.querySelector('.work-rows');
    title.className = "timeline-title";
    Object.assign(work.style, { display: "grid", gridTemplateColumns: "24% 1fr", columnGap: "3vw", alignItems: "start", minHeight: "100dvh", padding: "12vh 10vw 7vh" });
    Object.assign(rows.style, { gridColumn: "2", width: "100%", margin: "8vh 0 0" });
    rows.querySelectorAll('article > .work-date').forEach((date) => {
      Object.assign(date.style, { whiteSpace: 'nowrap', transform: 'none' });
    });
  }

  const portfolio = document.querySelector('#portfolio .portfolio-overview');
  if (portfolio) {
    const portfolioSection = portfolio.closest('#portfolio');
    const touchPortfolio = window.matchMedia('(hover: none), (pointer: coarse)');
    let academicRevealedAt = -Infinity;
    portfolioSection?.classList.add('portfolio-figma-page');
    portfolio.classList.add('portfolio-figma-overview');
    const renderPortfolio = (view = 'root') => {
      const cards = view === 'academic'
        ? [['1', 'Architecture', '建筑课程', 'architecture', 'Images/sheep-animation/2.png'], ['2', 'Product', '产品设计', 'product', 'Images/sheep-animation/1.3.png'], ['3', 'Art', '现象素描', 'art', 'Images/sheep-animation/3.png']]
        : [['01', 'Academic Works', '学生时代的设计、研究、毕业创作等', 'academic', 'Images/sheep-animation/1.2.png'], ['02', 'Professional Works', '工作期间参与的设计、策划与实际项目', 'professional', 'Images/sheep-animation/1.1.png'], ['03', 'Personal Creation', '自主创作', 'personal', 'Images/sheep-animation/3.png']];
      const background = view === 'academic' ? 'Images-web/portfolio-group2-bg.webp' : 'Images/Portfolio/Group1/1.png';
      const markup = `<img class="portfolio-figma-bg" src="${background}" alt="" aria-hidden="true"><p class="portfolio-figma-word" aria-hidden="true">portfolio</p><nav class="portfolio-figma-menu portfolio-figma-menu--${view} portfolio-sheep-menu" aria-label="${view === 'academic' ? 'Academic Works 分类' : '作品分类'}">${cards.map(([number, title, label, action, sheep], index) => `<button class="portfolio-sheep-option" style="--sheep-index:${index}" type="button" ${view === 'academic' ? `data-category="${action}"` : `data-portfolio-group="${action}"`}><span class="portfolio-sheep-bead" aria-hidden="true"><img src="${sheep}" alt=""></span><span class="portfolio-sheep-copy"><strong><span class="portfolio-sheep-number">${number}</span><span>${title}</span></strong><em>${label}</em></span></button>`).join('')}</nav>`;
      renderPrioritizedImages(portfolio, markup, '.portfolio-figma-bg');
      portfolio.dataset.view = view;
    };
    renderPortfolio();
    const professionalConcept = `<section class="collection-concept"><div class="collection-concept-heading"><p>DESIGN CONCEPT</p><h2>LUMINOUS RIPPLES · GLAZE RESONANCE</h2><h3>漪光釉韵</h3></div><div class="collection-concept-copy"><p>在灞河西岸最后的低密之境，十八里水纹与三彩釉色开启了一场跨越千年的对话。</p><p>盛唐的釉彩是凝固的浪，当代的水波是流动的涟漪。在这片灞河最后珍藏的低密之境，空间化作一方水与火淬炼的乐章。而指尖揉捏的陶土，正将千年的长安水脉与此刻的生活温度，悄然塑成第三种永恒的形状。</p><p>这双声部乐章里：</p><p class="collection-concept-lines">高音是灞河映射进的瞬息波光<br>低音是陶土内封存的千年水脉<br>而休止符——<br>是业主推窗时，那片突然静默的河面</p><p>所谓永恒，不过是灞水与三彩每一次相遇时，那稍纵即逝却又不断重演的韵脚。</p><p>当空间成为盛唐水文与现代水岸生活的双声部乐章，每一处转折都是釉色与水波即兴创作的韵脚。</p></div></section>`;
    const professionalBoard = `<section class="professional-board" aria-label="招商西安湾项目内容"><div class="professional-board-section"><h2>CONCEPT COLLAGE <span>概念拼贴</span></h2><div class="professional-collage"><img src="Images-web/Professional Works/2.webp" alt="漪光釉韵概念拼贴"><img src="Images-web/Professional Works/1.webp" alt="陶土与釉彩概念拼贴"></div></div><div class="professional-board-section">
  <h2>PHOTOS <span>落地照片</span></h2>

  <div class="professional-photos-figma">

    <img class="photo-1"
         src="Images-web/Professional Works/照片/zhaxa (1).webp"
         alt="招商西安湾客厅">

    <img class="photo-2"
         src="Images-web/Professional Works/照片/zhaxa (4).webp"
         alt="招商西安湾空间细节">

    <img class="photo-3"
         src="Images-web/Professional Works/照片/233.webp"
         alt="招商西安湾软装细节">

    <img class="photo-4"
         src="Images-web/Professional Works/照片/zhaxa (2).webp"
         alt="招商西安湾餐厅">

    <img class="photo-5"
         src="Images-web/Professional Works/照片/233.webp"
         alt="招商西安湾空间">

    <img class="photo-6"
         src="Images-web/Professional Works/照片/zhaxa (3).webp"
         alt="招商西安湾室内细节">

    <img class="photo-7"
         src="Images-web/Professional Works/照片/31.webp"
         alt="招商西安湾落地照片">

    <img class="photo-8"
         src="Images-web/Professional Works/照片/32.webp"
         alt="招商西安湾落地照片">

    <img class="photo-9"
         src="Images-web/Professional Works/照片/1.webp"
         alt="招商西安湾落地照片">

  </div>
</div><div class="professional-board-section"><h2>FURNITURE <span>家具产品图纸及照片</span></h2><div class="professional-furniture"><img src="Images/Professional Works/ffe/251114_ZHAXA_270__Custom Lighting Package_18.png" alt="灯具图纸"><img src="Images-web/Professional Works/ffe/251114_ZHAXA_270__Custom Lighting Package_20.webp" alt="灯具图纸"><img src="Images/Professional Works/ffe/微信图片_20260122170031_1531_1224.jpg" alt="家具照片"><img src="Images-web/Professional Works/ffe/CSS ZHAXA 道具图纸 251219_46.webp" alt="家具图纸"><img src="Images-web/Professional Works/ffe/微信图片_20260123113518_1573_1224.webp" alt="家具照片"><img src="Images-web/Professional Works/ffe/CSS ZHAXA 道具图纸 251219_08.webp" alt="家具图纸"><img src="Images/Professional Works/ffe/微信图片_20260122165949_1517_1224.jpg" alt="家具照片"><img src="Images/Professional Works/ffe/CSS ZHAXA 道具图纸 251219_25.png" alt="家具图纸"><img src="Images/Professional Works/ffe/微信图片_20260122170040_1538_1224.jpg" alt="家具照片"></div></div></section>`;
    const professionalBoardWithAddedPhotos = professionalBoard.replace('</div></div></div><div class="professional-board-section"><h2>FURNITURE', '<img class="professional-photo-wide" src="Images-web/Professional Works/照片/zhaxa (2).webp" alt="招商西安湾补充空间照片"></div></div><div class="professional-photo-additions"><img src="Images-web/Professional Works/照片/31.webp" alt="招商西安湾落地照片 31"><img src="Images-web/Professional Works/照片/32.webp" alt="招商西安湾落地照片 32"></div></div><section class="professional-closing-photo"><img src="Images-web/Professional Works/照片/1.webp" alt="招商西安湾项目收尾照片"></section><div class="professional-board-section"><h2>FURNITURE');
    const professionalBoardComplete = professionalBoardWithAddedPhotos;
    const professionalProjects = [
      { key: 'zhijiang-huaying', number: '01', title: '之江花影', cover: 'Images-web/zhijiang-huaying/hero-flower-field.webp', meta: '乡村品牌与文旅策划 · 2024' },
      { key: 'xian-bay', number: '02', title: '招商西安湾', cover: 'Images-web/Professional Works/照片/zhaxa (1).webp' },
      { key: 'gmm-shanghai', number: '03', title: 'GMM SHANGHAI', cover: 'Images-web/Professional Works/GMMSH/主卧套.webp' }
    ];
    const zhijiangAsset = 'Images-web/zhijiang-huaying/';
    const zhijiangImage = (file, alt, className = '') => `<img${className ? ` class="${className}"` : ''} src="${zhijiangAsset}${file}" alt="${alt}" loading="lazy" decoding="async">`;
    const zhijiangPosters = [
      ['flower-january.webp', '一月花神海报'], ['flower-february.webp', '二月花神海报'], ['flower-march.webp', '三月花神海报'],
      ['flower-peony.webp', '四月花神海报'], ['flower-june.webp', '六月花神海报'], ['flower-july.webp', '七月花神海报'],
      ['flower-august.webp', '八月花神海报'], ['flower-september.webp', '九月花神海报'], ['flower-october.webp', '十月花神海报'],
      ['flower-november.webp', '十一月花神海报'], ['flower-december.webp', '十二月花神海报'], ['flower-lotus.webp', '荷花花神海报']
    ];
    const zhijiangDetail = `<article class="zhijiang-case" aria-label="之江花影项目详情">
      <section class="zhijiang-intro">
        <div class="zhijiang-intro-display" aria-hidden="true"><span>FLOWER</span><span>SHADOW</span></div>
        <div class="zhijiang-intro-copy"><p class="zhijiang-kicker">FLOWER SHADOW OF ZHI RIVER</p><h2>之江花影 · 江畔旅拍</h2><p>项目立足杭州建德之江村，以在地花卉、江畔田园与摄影产业为线索，将场地调研、文旅定位、空间体验、衍生产品和 IP 内容组织为一套可持续生长的乡村品牌体验。</p><dl><div><dt>LOCATION</dt><dd>浙江 · 建德 · 之江村</dd></div><div><dt>TYPE</dt><dd>乡村品牌 / 文旅策划 / 场景营造</dd></div><div><dt>YEAR</dt><dd>2023–2024</dd></div></dl></div>
      </section>

      <section class="zhijiang-section zhijiang-research">
        <header class="zhijiang-section-heading"><span>01</span><div><p>FIELD RESEARCH</p><h2>从花海与江畔开始</h2></div></header>
        <div class="zhijiang-research-lead"><p>团队通过实地调研梳理之江村的自然资源、摄影基础与乡村产业。新安江晨雾、花海田园、村落肌理和摄影社群共同构成项目的在地底色。</p>${zhijiangImage('site-context-map-transparent.webp', '之江村场地现状与周边资源分析')}</div>
        <div class="zhijiang-photo-strip">${zhijiangImage('research-flower-field.webp', '之江村花海调研')}${zhijiangImage('research-site-visit.webp', '团队实地调研')}${zhijiangImage('research-workshop.webp', '团队与当地人员讨论')}${zhijiangImage('photography-base.webp', '之江村摄影活动')}</div>
        <div class="zhijiang-landscape-grid">${zhijiangImage('river-landscape.webp', '新安江晨雾景观')}${zhijiangImage('village-landscape.webp', '之江村田园景观')}${zhijiangImage('tea-landscape.webp', '山水与田园景观')}</div>
      </section>

      <section class="zhijiang-section zhijiang-strategy">
        <header class="zhijiang-section-heading"><span>02</span><div><p>POSITIONING &amp; STRATEGY</p><h2>摄影基地与文旅体验</h2></div></header>
        <div class="zhijiang-strategy-copy"><p>以自然景观和摄影艺术特色为基础，项目提出婚纱摄影、美拍旅拍、影视拍摄与短视频创作等复合体验，并通过数字导览、线上消费与一键租赁补全游客从到访到分享的服务链路。</p></div>
        <div class="zhijiang-diagram-pair">${zhijiangImage('strategy-map-transparent.webp', '项目定位与规划策略')}${zhijiangImage('audience-map-transparent.webp', '目标人群与市场定位')}</div>
        <div class="zhijiang-digital-grid">${zhijiangImage('digital-guide.webp', '景点线路导览方案')}${zhijiangImage('digital-commerce.webp', '线上消费方案')}${zhijiangImage('digital-service.webp', '一键租赁服务方案')}</div>
      </section>

      <section class="zhijiang-section zhijiang-space">
        <header class="zhijiang-section-heading"><span>03</span><div><p>SPATIAL EXPERIENCE</p><h2>三处花海打卡装置</h2></div></header>
        <div class="zhijiang-site-pair">${zhijiangImage('site-aerial.webp', '花海栈道场地航拍')}${zhijiangImage('site-masterplan.webp', '花海打卡装置总平面')}</div>
        <p class="zhijiang-section-note">以“之江花韵，江畔旅拍”为主题，项目在花海栈道设置繁梦云廊、环中月境与雾影江台三处艺术打卡节点，让行走、停留与取景形成连续体验。</p>
        <div class="zhijiang-installations">
          <article><div>${zhijiangImage('installation-01-before.webp', '繁梦云廊改造前')}${zhijiangImage('installation-01-visual.webp', '繁梦云廊效果图')}</div><h3><span>01</span>繁梦云廊</h3></article>
          <article><div>${zhijiangImage('installation-02-before.webp', '环中月境改造前')}${zhijiangImage('installation-02-visual.webp', '环中月境效果图')}</div><h3><span>02</span>环中月境</h3></article>
          <article><div>${zhijiangImage('installation-03-before.webp', '雾影江台改造前')}${zhijiangImage('installation-03-visual.webp', '雾影江台效果图')}</div><h3><span>03</span>雾影江台</h3></article>
        </div>
      </section>

      <section class="zhijiang-section zhijiang-outcome">
        <header class="zhijiang-section-heading"><span>04</span><div><p>FROM PROPOSAL TO SITE</p><h2>从方案到落地</h2></div></header>
        <p class="zhijiang-section-note">经过与政府、指导老师和施工团队的多轮沟通，休闲区方案持续调整并进入现场实施。以下三组图像分别对应改造前、空间设想与落地状态。</p>
        <div class="zhijiang-outcome-block"><h3>花影轩</h3><div class="zhijiang-before-after">${zhijiangImage('pavilion-before.webp', '花影轩改造前')}${zhijiangImage('pavilion-visual.webp', '花影轩效果图')}${zhijiangImage('pavilion-outcome.webp', '花影轩落地状态')}</div></div>
        <div class="zhijiang-outcome-block"><h3>林下营地</h3><div class="zhijiang-before-after">${zhijiangImage('forest-camp-before.webp', '林下营地改造前')}${zhijiangImage('forest-camp-visual.webp', '林下营地效果图')}${zhijiangImage('forest-camp-outcome.webp', '林下营地落地状态')}</div></div>
        <div class="zhijiang-outcome-block"><h3>雾森系统</h3><div class="zhijiang-before-after zhijiang-before-after--two">${zhijiangImage('mist-system-visual.webp', '雾森系统效果图')}${zhijiangImage('mist-system-outcome.webp', '雾森系统落地状态')}</div></div>
        <div class="zhijiang-construction">${zhijiangImage('construction-01.webp', '现场施工照片一')}${zhijiangImage('construction-02.webp', '现场施工照片二')}${zhijiangImage('construction-03.webp', '现场施工照片三')}</div>
      </section>

      <section class="zhijiang-section zhijiang-products">
        <header class="zhijiang-section-heading"><span>05</span><div><p>PRODUCTS &amp; SERVICES</p><h2>鲜花 + 日常体验</h2></div></header>
        <div class="zhijiang-product-hero">${zhijiangImage('brand-board.webp', '之江花影品牌视觉板')}<p>将花卉资源延伸为气味文化、食物饮品和手工艺品，使项目从一次到访继续生长为可以携带、分享与回忆的内容。</p></div>
        <div class="zhijiang-package-grid">${zhijiangImage('package-dieline.webp', '鲜花产品包装刀版')}${zhijiangImage('package-blue-layout.webp', '蓝色包装展开设计')}${zhijiangImage('package-pink-layout.webp', '粉色包装展开设计')}${zhijiangImage('package-blue.webp', '蓝色包装样机')}${zhijiangImage('package-pink.webp', '粉色包装样机')}${zhijiangImage('fragrance-card.webp', '鲜花气味文化卡片')}</div>
      </section>

      <section class="zhijiang-section zhijiang-ip">
        <header class="zhijiang-section-heading"><span>06</span><div><p>IP &amp; CONTENT SYSTEM</p><h2>花之之与十二花神</h2></div></header>
        <div class="zhijiang-ip-intro">${zhijiangImage('flower-fairy-ip.webp', '花之之 IP 形象设定')}<p>“花之之”取材于之江、花艺与草莓种植三项在地文化，以梅之红、江之蓝和花之黄建立角色识别。十二花神旅拍影集则把传统花月文化转化为可拍摄、可收藏的视觉内容。</p></div>
        <div class="zhijiang-poster-grid">${zhijiangPosters.map(([file, alt]) => zhijiangImage(file, alt)).join('')}</div>
      </section>

      <footer class="zhijiang-closing"><p>FLOWER SHADOW OF ZHI RIVER</p><h2>让花海、影像与乡村生活<br>成为同一段旅程</h2></footer>
    </article>`;
    const gmmShanghai = {
      index: '03.02.03',
      title: 'GMM SHANGHAI',
      hero: 'Images-web/Professional Works/GMMSH/主卧套.webp',
      collage: 'Collage/collage.png',
      galleryGroups: [
        { layout: 'pair-portrait', images: [['玄关1.png', 'GMM SHANGHAI 玄关一'], ['玄关2.png', 'GMM SHANGHAI 玄关二']] },
        { layout: 'full', images: [['车库.png', 'GMM SHANGHAI 车库']] },
        { layout: 'feature-stack', images: [['b地下玄关.png', 'GMM SHANGHAI 地下玄关'], ['主卫.png', 'GMM SHANGHAI 主卫'], ['客卫.png', 'GMM SHANGHAI 客卫']] },
        { layout: 'pair-landscape', images: [['主卧办公.png', 'GMM SHANGHAI 主卧办公区'], ['主卧.png', 'GMM SHANGHAI 主卧']] },
        { layout: 'full', images: [['主卧套.png', 'GMM SHANGHAI 主卧套']] },
        { layout: 'full', images: [['主卧套-卫生间.png', 'GMM SHANGHAI 主卧套卫生间']] },
        { layout: 'main-narrow', images: [['客卧套.png', 'GMM SHANGHAI 客卧套'], ['壁画.png', 'GMM SHANGHAI 壁画']] },
        { layout: 'feature-stack', images: [['衣帽间.png', 'GMM SHANGHAI 衣帽间'], ['盥洗室.png', 'GMM SHANGHAI 盥洗室'], ['走廊.png', 'GMM SHANGHAI 走廊']] }
      ]
    };
    const gmmConcept = `<section class="collection-concept gmm-concept"><div class="collection-concept-heading"><p>DESIGN CONCEPT <span>设计概念</span></p><h2>FRAMECRAFTED REALMS</h2><h3>帧景叠构</h3></div><div class="collection-concept-copy"><p>将分镜的蒙太奇交给空间——每一帧都是被行走的剧情，每一处停顿都是定格的电影情绪。</p><p>设计在此转化为导演语言，用材质作为滤镜、用结构作为关键帧、用色彩作为声轨，让生活成为一部可被回放、可被打断、可被放大的电影。</p><p>空间的建构方式，正是将这些帧景层层嵌套、错位、重叠、拼贴，共同形成一部非线性叙事的生活剧作。在这里，空间不是风格的统一化建构，将其理解为一组组的场景帧（frame），如同电影分镜；每一帧既承载场景，也激发情绪。</p><p>帧中构景，每一处空间，都是被构图“框定”的情绪单元。</p><p>叠境构情，空间与空间之间不是边界，而是层层情绪的转场。</p><p>场景拼叙，如蒙太奇剪辑，空间中跳接的不是功能，而是情绪。</p></div></section>`;
    const renderGmmImage = ([file, alt]) => `<img src="Images/Professional Works/GMMSH/${file}" alt="${alt}">`;
    const gmmGallery = `<section class="gmm-project-content" aria-label="GMM SHANGHAI 项目效果图"><div class="gmm-collage">${renderGmmImage([gmmShanghai.collage, 'GMM SHANGHAI Collage'])}</div><div class="gmm-gallery">${gmmShanghai.galleryGroups.map(({ layout, images }) => {
      if (layout === 'feature-stack') return `<div class="gmm-gallery-row gmm-gallery-row--feature-stack">${renderGmmImage(images[0])}<div class="gmm-gallery-stack">${images.slice(1).map(renderGmmImage).join('')}</div></div>`;
      return `<div class="gmm-gallery-row gmm-gallery-row--${layout}">${images.map(renderGmmImage).join('')}</div>`;
    }).join('')}</div></section>`;
    let activeProfessionalProject = null;
    let professionalScrollVersion = 0;
    const resetProfessionalScroll = (gallery, getTop = () => 0) => {
      const version = ++professionalScrollVersion;
      const applyScroll = () => {
        if (version !== professionalScrollVersion) return;
        const top = getTop();
        gallery.scrollTop = top;
        gallery.scrollLeft = 0;
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      applyScroll();
      requestAnimationFrame(() => {
        applyScroll();
        requestAnimationFrame(applyScroll);
      });
    };
    const openCollection = ({ index, title, label = '', description = '', image = '', after = '', heroMeta = '', dark = false }) => {
      const gallery = document.getElementById('gallery');
      document.body.classList.remove('is-scrunchie-page', 'is-professional-index');
      document.body.classList.toggle('is-professional-page', Boolean(image));
      document.getElementById('category-index').textContent = `${index} / PORTFOLIO`;
      gallery.className = `collection-gallery${dark ? ' collection-dark' : ''}`;
      const markup = image
        ? `<section class="collection-page collection-page--image"><img src="${image}" alt="${title}"><div class="collection-hero-overlay">${heroMeta ? `<p class="collection-hero-meta">${heroMeta}</p>` : ''}<h1>${title}</h1></div></section>${after}`
        : `<section class="collection-page">${label ? `<p>${label}</p>` : ''}<h1>${title}</h1>${description ? `<span>${description}</span>` : ''}</section>`;
      renderPrioritizedImages(gallery, markup, '.collection-page--image > img');
      document.querySelector('.project-pager')?.remove();
      goTo('portfolio-detail');
    };
    const openProfessionalIndex = (projectKey = null) => {
      const gallery = document.getElementById('gallery');
      document.body.classList.remove('is-scrunchie-page', 'is-professional-page');
      document.body.classList.add('is-professional-index');
      document.getElementById('category-index').textContent = '03.02 / PORTFOLIO';
      gallery.className = 'professional-index';
      const markup = `<section class="professional-index-page"><div class="professional-projects">${professionalProjects.map(({ key, number, title, cover, meta = '' }) => `<button type="button" class="professional-project" data-professional-project="${key}" aria-label="打开 PROJECT ${number} ${title}"><img src="${cover}" alt="${title} 项目封面"><span class="professional-project-shade" aria-hidden="true"></span><span class="professional-project-number">PROJECT ${number}</span><div class="project-copy professional-project-copy"><strong>${title}</strong>${meta ? `<span class="professional-project-meta">${meta}</span>` : ''}</div><span class="professional-project-prompt">CLICK TO EXPLORE</span></button>`).join('')}</div></section>`;
      renderPrioritizedImages(gallery, markup, '.professional-project:first-child > img');
      document.querySelector('.project-pager')?.remove();
      goTo('portfolio-detail');
      activeProfessionalProject = null;
      resetProfessionalScroll(gallery, () => gallery.querySelector(`[data-professional-project="${projectKey}"]`)?.offsetTop || 0);
    };
    const openZhijiangHuaying = () => {
      activeProfessionalProject = 'zhijiang-huaying';
      openCollection({ index: '03.02.01', title: '之江花影', heroMeta: '乡村品牌与文旅策划 · 建德之江村 · 2024', image: `${zhijiangAsset}hero-flower-field.webp`, after: zhijiangDetail, dark: true });
      const gallery = document.getElementById('gallery');
      gallery.classList.add('zhijiang-huaying');
      resetProfessionalScroll(gallery);
    };
    document.querySelector('[data-portfolio-project="zhijiang-huaying"]')?.classList.remove('work-project-link--pending');
    const openXianBay = () => {
      activeProfessionalProject = 'xian-bay';
      openCollection({ index: '03.02.02', title: '招商西安湾', image: 'Images-web/Professional Works/照片/zhaxa (1).webp', after: `${professionalConcept}${professionalBoardComplete}`, dark: true });
      resetProfessionalScroll(document.getElementById('gallery'));
    };
    const openGmmShanghai = () => {
      activeProfessionalProject = 'gmm-shanghai';
      openCollection({ index: gmmShanghai.index, title: gmmShanghai.title, image: gmmShanghai.hero, after: `${gmmConcept}${gmmGallery}`, dark: true });
      const gallery = document.getElementById('gallery');
      gallery.classList.add('gmm-shanghai');
      resetProfessionalScroll(gallery);
    };
    document.getElementById('gallery').addEventListener('click', (event) => {
      const gallery = event.currentTarget;
      const target = event.target;
      if (!activeProfessionalProject || !gallery.classList.contains('collection-gallery') || !(target instanceof Element)) return;
      if (target.closest('img, a, button, input, textarea, select, label, [role="button"], [tabindex]')) return;
      if (target.closest('.collection-hero-overlay, .collection-concept-heading, .collection-concept-copy')) return;
      const blankArea = target === gallery || target.matches('.collection-page--image, .collection-concept, .professional-board, .professional-board-section, .professional-photos-figma, .professional-photo-additions, .professional-closing-photo, .professional-collage, .professional-photos, .professional-photo-pairs, .professional-furniture, .gmm-project-content, .gmm-collage, .gmm-gallery, .gmm-gallery-row, .gmm-gallery-stack, .zhijiang-case, .zhijiang-intro, .zhijiang-section, .zhijiang-closing');
      if (!blankArea) return;
      const projectKey = activeProfessionalProject;
      openProfessionalIndex(projectKey);
    });
    const openScrunchieGallery = () => {
      const pieces = [
        ['01', '宝蓝色发圈', '01-宝蓝色发圈.png'],
        ['02', '浅蓝白边', '02-浅蓝白边.png'],
        ['03', '棕色钩织', '03-棕色钩织.png'],
        ['04', '马卡龙配色', '04-马卡龙配色.png'],
        ['05', '白色红边', '05-白色红边-补绘.png'],
        ['06', '薄荷色长线', '06-薄荷色长线-补绘.png'],
        ['07', '棕色白边', '07-棕色白边-补绘.png'],
        ['08', '灰蓝色', '08-灰蓝色-补绘.png']
      ];
      const embroideryPieces = [
        ['01', '双鱼刺绣', 'group5-table-embroidery.png'],
        ['02', '香菇刺绣', 'group5-motif-02.png'],
        ['03', '饺子刺绣', 'group5-motif-03.png'],
        ['04', '五花肉刺绣', 'group5-motif-04.png'],
        ['05', '年夜饭刺绣一', 'group5-food-01.png'],
        ['06', '年夜饭刺绣二', 'group5-food-02.png'],
        ['07', '年夜饭刺绣三', 'group5-food-03.png'],
        ['08', '年夜饭刺绣四', 'group5-food-04.png']
      ];
      const group5Path = 'Images/personal-creation/Group5/';
      const group6Path = 'Images/personal-creation/group6/';
      const gallery = document.getElementById('gallery');
      document.body.classList.add('is-scrunchie-page');
      document.body.classList.remove('is-professional-page', 'is-professional-index');
      document.getElementById('category-index').textContent = '03.03 / PORTFOLIO';
      gallery.className = 'scrunchie-gallery';
      const switcher = (items, basePath, label) => `<div class="scrunchie-layout craft-switcher" data-craft-switcher><div class="scrunchie-preview"><img src="${basePath}${items[0][2]}" alt="${items[0][1]}"><p class="scrunchie-name">${items[0][0]} / ${items[0][1]}</p></div><nav class="scrunchie-thumbnails" aria-label="${label}">${items.map(([number, name, file], index) => `<button type="button" class="${index === 0 ? 'is-selected' : ''}" data-craft-name="${name}" data-craft-number="${number}" data-craft-src="${basePath}${file}" aria-pressed="${index === 0}"><img src="${basePath}${file}" alt="${name}"><span>${number}</span></button>`).join('')}</nav></div>`;
      const markup = `<section class="scrunchie-page"><header><p>个人创作</p><h1>Personal Creation</h1></header><section class="group5-project" aria-label="春节刺绣项目"><div class="group5-top"><img class="group5-hero" src="${group5Path}group5-dish-main.png" alt="春节年夜饭刺绣作品"><div class="group5-food-grid"><img src="${group5Path}group5-detail-01.png" alt="年夜饭制作过程一"><img src="${group5Path}group5-detail-02.png" alt="年夜饭制作过程二"><img src="${group5Path}group5-detail-03.png" alt="年夜饭制作过程三"><img src="${group5Path}group5-detail-04.png" alt="年夜饭制作过程四"><img class="group5-food-table" src="${group5Path}group5-food-table.png" alt="新年团圆饭餐桌"></div></div><p class="group5-description">This project focuses on the theme of Chinese New Year, showcasing the traditional culinary culture. I named this recipe project À table avec Fei, a design inspired by the dishes on my family’s New Year dinner table.<br>In China, the New Year is not only a celebration but also an important occasion for family reunions. Relatives and friends gather around the table, enjoying this moment.</p><div class="group5-interactive">${switcher(embroideryPieces, group5Path, '刺绣作品')}</div><p class="group5-caption">Crocheting and embroidering are calming hobbies.</p>

<section class="group6-project">
<div class="group6-grid">
  <img src="${group6Path}image 12.png" alt="">
  <img src="${group6Path}image 13.png" alt="">
  <img src="${group6Path}image 14.png" alt="">
  <img src="${group6Path}image 15.png" alt="">
  <img src="${group6Path}image 16.png" alt="">
  <img src="${group6Path}image 18.png" alt="">
  <img src="${group6Path}image 19.png" alt="">
  <img src="${group6Path}image 20.png" alt="">
  <img src="${group6Path}image 21.png" alt="">
  <img src="${group6Path}image 22.png" alt="">
  <img src="${group6Path}image 23.png" alt="">
  <img src="${group6Path}image 24.png" alt="">
  <img src="${group6Path}image 25.png" alt="">
  <img src="${group6Path}image 26.png" alt="">
  <img src="${group6Path}image 27.png" alt="">
  <img src="${group6Path}image 28.png" alt="">
  <img src="${group6Path}image 30.png" alt="">
  <img src="${group6Path}image 31.png" alt="">
  <img src="${group6Path}image 32.png" alt="">
  <img src="${group6Path}image 33.png" alt="">
  <img src="${group6Path}image 34.png" alt="">
  <img src="${group6Path}image 35.png" alt="">
  <img src="${group6Path}image 36.png" alt="">
  <img src="${group6Path}image 37.png" alt="">
</div>
<div class="group6-photos">
    <img src="${group6Path}Group6-1.JPG" alt="Group 6 photo 1">
    <img src="${group6Path}Group6-2.JPG" alt="Group 6 photo 2">
  </div>
</section>

</section><section class="scrunchie-section"; aria-label="发圈作品">${switcher(pieces, 'Images/personal-creation/', '发圈款式')}</section><div class="scrunchie-future-content" aria-label="后续个人创作内容"></div></section>`;
      renderPrioritizedImages(gallery, markup, '.group5-hero');
      
      gallery.addEventListener('click', (event) => {
        const item = event.target.closest('button[data-craft-src]');
        if (!item) return;
        const switcherElement = item.closest('[data-craft-switcher]');
        const image = switcherElement.querySelector('.scrunchie-preview img');
        image.classList.remove('is-changing');
        void image.offsetWidth;
        image.src = optimizedImageSource(item.dataset.craftSrc);
        image.alt = item.dataset.craftName;
        image.classList.add('is-changing');
        switcherElement.querySelector('.scrunchie-name').textContent = `${item.dataset.craftNumber} / ${item.dataset.craftName}`;
        switcherElement.querySelectorAll('.scrunchie-thumbnails button').forEach((button) => {
          const selected = button === item;
          button.classList.toggle('is-selected', selected);
          button.setAttribute('aria-pressed', String(selected));
        });
      });
      document.querySelector('.project-pager')?.remove();
      goTo('portfolio-detail');
      resetMobileScroll(gallery);
    };
    if (!document.getElementById('collection-page-style')) {
      document.head.insertAdjacentHTML('beforeend', '<style id="collection-page-style">#portfolio-detail #gallery.collection-gallery{display:block;width:100%;height:100%;overflow-y:auto;background:#f4f4f3}.collection-page{min-height:100%;padding:18vh 10vw 8vh;color:#171717}.collection-page p{margin:0 0 1rem;font:11px "DM Mono",monospace;letter-spacing:.14em}.collection-page h1{margin:0;font:500 clamp(56px,9vw,130px)/.86 "Playfair Display","Songti SC",serif;letter-spacing:-.065em}.collection-page span{display:block;margin-top:2rem;font:15px/1.8 Arial,"PingFang SC",sans-serif;color:#666}#portfolio-detail #gallery.collection-dark{background:#111}.collection-dark .collection-page{color:#fff}.collection-dark .collection-page span{color:#aaa}body.is-scrunchie-page .site-nav{border-color:rgba(20,20,20,.28)}body.is-scrunchie-page .site-nav .nav-item{color:#777}body.is-scrunchie-page .site-nav .nav-item.active{color:#171717}body.is-scrunchie-page .site-nav .nav-item.active:after{background:#171717}#portfolio-detail #gallery.scrunchie-gallery{display:block;width:100%;height:100%;overflow-y:auto;background:#f8f7f6;color:#171717}.scrunchie-page{min-height:180vh;padding:13vh 9vw 7vh;background:#f8f7f6}.scrunchie-page header p{margin:0 0 .75rem;font:11px "DM Mono",monospace;letter-spacing:.14em}.scrunchie-page header h1{margin:0 0 5vh;font:500 clamp(42px,5vw,76px)/.9 "Playfair Display","Songti SC",serif;letter-spacing:-.055em}.scrunchie-layout{display:grid;grid-template-columns:minmax(0,7fr) minmax(230px,3fr);gap:3vw;align-items:start}.scrunchie-preview{min-height:min(63vh,690px);display:grid;grid-template-rows:1fr auto;place-items:center;background:#f8f7f6;padding:3vh 3vw}.scrunchie-preview img{display:block;width:100%;height:min(56vh,620px);object-fit:contain;opacity:1;transition:opacity .22s ease}.scrunchie-preview img.is-changing{animation:scrunchie-fade .3s ease}.scrunchie-name{justify-self:start;margin:1.2rem 0 0;font:12px "DM Mono",monospace;letter-spacing:.08em}.scrunchie-thumbnails{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.scrunchie-thumbnails button{position:relative;aspect-ratio:1;background:#f8f7f6;border:1px solid transparent;padding:8px;transition:border-color .2s ease}.scrunchie-thumbnails button:hover,.scrunchie-thumbnails button.is-selected{border-color:#171717}.scrunchie-thumbnails img{display:block;width:100%;height:100%;object-fit:contain}.scrunchie-thumbnails span{position:absolute;right:7px;bottom:6px;font:10px "DM Mono",monospace;letter-spacing:.08em}.scrunchie-future-content{min-height:65vh}@keyframes scrunchie-fade{from{opacity:.16}to{opacity:1}}@media(max-width:700px){.scrunchie-page{min-height:165vh;padding:13vh 6vw 6vh}.scrunchie-page header h1{font-size:48px;margin-bottom:4vh}.scrunchie-layout{display:flex;flex-direction:column;gap:1.5rem}.scrunchie-preview{width:100%;min-height:52vh;padding:2vh 4vw}.scrunchie-preview img{height:43vh}.scrunchie-thumbnails{display:flex;width:100%;overflow-x:auto;padding-bottom:4px}.scrunchie-thumbnails button{flex:0 0 108px}.scrunchie-future-content{min-height:55vh}}</style>');
    }
    if (!document.getElementById('group5-project-style')) {
      document.head.insertAdjacentHTML('beforeend', `<style id="group5-project-style">
        .scrunchie-page{min-height:360vh}
        .group5-project{margin-bottom:14vh}
        .group5-top{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(260px,.85fr);gap:5vw;align-items:stretch}
        .group5-hero{display:block;width:100%;height:100%;object-fit:contain;object-position:center;background:#f8f7f6}
        .group5-food-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:auto auto 1fr;gap:8px;height:100%}
        .group5-food-grid img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:cover}
        .group5-food-grid .group5-food-table{grid-column:1/-1;width:100%;height:100%;min-height:0;object-fit:cover}
        .group5-description,.group5-caption{max-width:1000px;margin:2.2rem 0 0;font:14px/1.55 Arial,"PingFang SC",sans-serif;color:#171717}
        .group5-interactive{margin-top:10vh}
        .group5-interactive .scrunchie-preview img{background:transparent}
        .group5-food-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:4vh}
        .group5-food-strip img{display:block;width:100%;aspect-ratio:1;object-fit:cover;background:#f8f7f6}
        .group5-caption{margin-top:2rem}
        .scrunchie-section{margin-top:15vh;padding-top:8vh;border-top:1px solid rgba(20,20,20,.22)}
        .craft-switcher .scrunchie-thumbnails button{cursor:pointer}

        /* ===== GROUP 6 ===== */

.group6-project{
    margin-top:14vh;
}

/* 小作品区域 */
.group6-grid{
    display:grid;
    grid-template-columns:repeat(6,minmax(0,1fr));
    gap:3vw 2.5vw;
    align-items:center;
    padding:4vh 0;
}

/* 每一个独立作品 */
.group6-grid img{
    display:block;
    width:100%;
    height:150px;
    object-fit:contain;
    transition:transform .28s ease;
    transform-origin:center;
    position:relative;
    z-index:1;
    cursor:zoom-in;
}

/* 鼠标经过：单独放大 */
.group6-grid img:hover{
    transform:scale(1.4);
    z-index:20;
}

/* 下面两张 Group6 摄影 */
.group6-photos{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:12px;
    margin-top:8vh;
}

.group6-photos img{
    display:block;
    width:100%;
    height:auto;
}
        @media(max-width:700px){
          .scrunchie-page{min-height:400vh}
          .group5-top{display:flex;flex-direction:column;gap:1.2rem}
          .group5-hero{height:auto;max-height:65vh}
          .group5-food-grid{height:auto;grid-template-rows:repeat(2,30vw) 55vw}
          .group5-description{font-size:13px}
          .group5-interactive{margin-top:7vh}
          .group5-food-strip{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:3vh}
          .scrunchie-section{margin-top:10vh;padding-top:6vh}
        }
      </style>`);
    }
    const reducedPortfolioMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    portfolio.addEventListener('click', (event) => {
      const option = event.target.closest('.portfolio-sheep-option');
      if (!option || portfolio.dataset.motionBypass === 'true') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (portfolio.classList.contains('is-sheep-launching')) return;
      portfolio.classList.add('is-sheep-launching');
      option.classList.add('is-launching');
      const delay = reducedPortfolioMotion.matches ? 0 : 260;
      window.setTimeout(() => {
        if (option.dataset.portfolioGroup === 'academic') {
          academicRevealedAt = performance.now();
          renderPortfolio('academic');
          portfolio.classList.remove('is-sheep-launching');
          return;
        }
        portfolio.dataset.motionBypass = 'true';
        option.click();
        delete portfolio.dataset.motionBypass;
        portfolio.classList.remove('is-sheep-launching');
      }, delay);
    }, true);
    let portfolioMotionFrame = 0;
    portfolio.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch' || reducedPortfolioMotion.matches || portfolioMotionFrame) return;
      portfolioMotionFrame = requestAnimationFrame(() => {
        const bounds = portfolio.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - .5) * 10;
        const y = ((event.clientY - bounds.top) / bounds.height - .5) * 6;
        portfolio.style.setProperty('--portfolio-motion-x', `${x.toFixed(2)}px`);
        portfolio.style.setProperty('--portfolio-motion-y', `${y.toFixed(2)}px`);
        portfolioMotionFrame = 0;
      });
    });
    portfolio.addEventListener('pointerleave', () => {
      portfolio.style.setProperty('--portfolio-motion-x', '0px');
      portfolio.style.setProperty('--portfolio-motion-y', '0px');
    });
    portfolio.addEventListener('click', (event) => {
      if (portfolio.dataset.view === 'academic' && !event.target.closest('button')) renderPortfolio();
    });
    const showAcademicOnIntent = (event) => {
      if ((event.type === 'pointerover' && event.pointerType === 'touch') || (event.type === 'focusin' && touchPortfolio.matches)) return;
      if (portfolio.dataset.view === 'root' && event.target.closest('[data-portfolio-group="academic"]')) {
        academicRevealedAt = performance.now();
        renderPortfolio('academic');
      }
    };
    portfolio.addEventListener('pointerover', showAcademicOnIntent);
    portfolio.addEventListener('focusin', showAcademicOnIntent);
    portfolio.addEventListener('pointerout', (event) => {
      if (event.pointerType === 'touch') return;
      const academicMenu = event.target.closest('.portfolio-figma-menu--academic');
      if (!academicMenu || academicMenu.contains(event.relatedTarget)) return;
      renderPortfolio();
    });
    portfolio.addEventListener('focusout', (event) => {
      if (touchPortfolio.matches) return;
      const academicMenu = event.target.closest('.portfolio-figma-menu--academic');
      if (!academicMenu || academicMenu.contains(event.relatedTarget)) return;
      renderPortfolio();
    });
    portfolio.addEventListener('click', (event) => {
      const academicRoot = event.target.closest('[data-portfolio-group="academic"]');
      if (!academicRoot) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      academicRevealedAt = performance.now();
      renderPortfolio('academic');
    }, true);
    portfolio.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'touch' && portfolio.dataset.view === 'academic' && performance.now() - academicRevealedAt < 700 && event.target.closest('[data-category]')) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    document.addEventListener('click', (event) => {
      const destination = event.target.closest('[data-go]');
      if (destination && destination.dataset.go !== 'portfolio-detail') {
        document.body.classList.remove('is-professional-page', 'is-professional-index');
      }
      if (event.target.closest('[data-go="portfolio"]')) {
        document.body.classList.remove('is-scrunchie-page');
        renderPortfolio();
        return;
      }
      const linkedPortfolioProject = event.target.closest('[data-portfolio-project="zhijiang-huaying"]');
      if (linkedPortfolioProject) {
        event.preventDefault();
        openZhijiangHuaying();
        return;
      }
      const professionalProject = event.target.closest('[data-professional-project]');
      if (professionalProject) {
        event.preventDefault();
        if (professionalProject.dataset.professionalProject === 'zhijiang-huaying') openZhijiangHuaying();
        if (professionalProject.dataset.professionalProject === 'xian-bay') openXianBay();
        if (professionalProject.dataset.professionalProject === 'gmm-shanghai') openGmmShanghai();
        return;
      }
      const group = event.target.closest('[data-portfolio-group]');
      if (!group) return;
      if (group.dataset.portfolioGroup === 'academic') renderPortfolio('academic');
      if (group.dataset.portfolioGroup === 'professional') {
        event.preventDefault();
        openProfessionalIndex();
      }
      if (group.dataset.portfolioGroup === 'personal') {
        event.preventDefault();
        openScrunchieGallery();
      }
    });
  }
})();
