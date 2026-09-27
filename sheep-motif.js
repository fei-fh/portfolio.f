(() => {
  const ASSETS = {
    front: 'Images/sheep-animation/1.1.png',
    back: 'Images/sheep-animation/1.2.png',
    side: 'Images/sheep-animation/1.3.png',
    excited: 'Images/sheep-animation/3.png'
  };

  const about = document.getElementById('about');
  const gallery = document.getElementById('gallery');
  const projectOverlay = document.querySelector('.project-overlay');
  const contact = document.getElementById('contact');
  if (!about || !gallery || !contact) return;

  const layer = document.createElement('div');
  layer.className = 'sheep-motif-layer';
  layer.setAttribute('aria-hidden', 'true');

  const createMascot = (className, pose) => {
    const image = document.createElement('img');
    image.className = `sheep-motif ${className}`;
    image.src = ASSETS[pose];
    image.alt = '';
    image.decoding = 'async';
    image.loading = 'lazy';
    image.dataset.pose = pose;
    layer.append(image);
    return image;
  };

  const aboutSheep = createMascot('sheep-motif--about', 'front');
  const portfolioSheep = createMascot('sheep-motif--portfolio', 'side');
  const contactSheep = createMascot('sheep-motif--contact', 'excited');
  document.body.append(layer);

  let activeScene = document.querySelector('.scene.scene-active')?.id || 'home';
  let aboutLastTop = about.scrollTop;
  let aboutIdleTimer;
  let aboutFrame;
  let portfolioLastPosition = 0;
  let portfolioFrame;

  const setPose = (image, pose) => {
    if (image.dataset.pose === pose) return;
    image.dataset.pose = pose;
    image.src = ASSETS[pose];
  };

  const hideMotifs = () => {
    aboutSheep.classList.remove('is-visible');
    portfolioSheep.classList.remove('is-visible');
  };

  document.addEventListener('site:scenechange', (event) => {
    activeScene = event.detail?.id || '';
    hideMotifs();
    if (activeScene === 'about') {
      aboutLastTop = about.scrollTop;
      updateAboutSheep();
    } else if (activeScene === 'portfolio-detail') {
      portfolioLastPosition = gallery.scrollTop || gallery.scrollLeft;
    }
  });

  function updateAboutSheep() {
    aboutFrame = 0;
    if (activeScene !== 'about') return;

    const max = Math.max(0, about.scrollHeight - about.clientHeight);
    const progress = max ? about.scrollTop / max : 0;
    const movement = about.scrollTop - aboutLastTop;
    const visible = progress > .07 && progress < .94;

    aboutSheep.style.setProperty('--about-sheep-y', `${30 + progress * 42}%`);
    aboutSheep.style.setProperty('--sheep-direction', movement < 0 ? -1 : 1);
    aboutSheep.classList.toggle('is-visible', visible);

    if (progress > .84) setPose(aboutSheep, 'back');
    else if (Math.abs(movement) > 1) setPose(aboutSheep, 'side');

    clearTimeout(aboutIdleTimer);
    if (visible && progress <= .84) {
      aboutIdleTimer = setTimeout(() => setPose(aboutSheep, 'front'), 280);
    }
    aboutLastTop = about.scrollTop;
  }

  about.addEventListener('scroll', () => {
    if (!aboutFrame) aboutFrame = requestAnimationFrame(updateAboutSheep);
  }, { passive: true });

  const scrollMetrics = (scroller) => {
    const maxY = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const maxX = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    if (maxY >= maxX) return { position: scroller.scrollTop, max: maxY };
    return { position: scroller.scrollLeft, max: maxX };
  };

  function updatePortfolioSheep(scroller) {
    portfolioFrame = 0;
    const overlayOpen = scroller === projectOverlay && projectOverlay?.classList.contains('is-open');
    if (activeScene !== 'portfolio-detail' || (scroller === projectOverlay && !overlayOpen)) {
      portfolioSheep.classList.remove('is-visible');
      return;
    }

    const { position, max } = scrollMetrics(scroller);
    const progress = max ? position / max : 0;
    const direction = position < portfolioLastPosition ? -1 : 1;
    const visible = max > 0 && progress > .025 && progress < .995;

    portfolioSheep.style.setProperty('--portfolio-sheep-x', `${8 + progress * 84}%`);
    portfolioSheep.style.setProperty('--sheep-direction', direction);
    portfolioSheep.classList.toggle('is-visible', visible);
    setPose(portfolioSheep, progress > .94 ? 'back' : 'side');
    portfolioLastPosition = position;
  }

  const watchPortfolioScroll = (scroller) => {
    if (!scroller) return;
    scroller.addEventListener('scroll', () => {
      if (!portfolioFrame) {
        portfolioFrame = requestAnimationFrame(() => updatePortfolioSheep(scroller));
      }
    }, { passive: true });
  };

  watchPortfolioScroll(gallery);
  watchPortfolioScroll(projectOverlay);

  if (projectOverlay) {
    new MutationObserver(() => {
      portfolioSheep.classList.remove('is-visible');
      if (!projectOverlay.classList.contains('is-open')) {
        return;
      }
      portfolioLastPosition = projectOverlay.scrollTop;
    }).observe(projectOverlay, { attributes: true, attributeFilter: ['class'] });
  }

  const celebrateContact = () => {
    if (activeScene !== 'contact') return;
    contactSheep.classList.remove('is-celebrating');
    void contactSheep.offsetWidth;
    contactSheep.classList.add('is-celebrating');
  };

  contact.querySelectorAll('.contact-copy-status').forEach((status) => {
    new MutationObserver(() => {
      if (status.textContent.trim() === '已复制') celebrateContact();
    }).observe(status, { childList: true });
  });
})();
