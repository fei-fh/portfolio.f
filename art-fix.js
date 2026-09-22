(() => {
  const artwork = [2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16];
  const renderArt = () => {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    gallery.className = 'art-vertical-gallery';
    gallery.innerHTML = `<h1>Sketches of Phenomena</h1>${artwork.map((number) => `<figure><img src="Images/ph${number}.jpg" alt="Sketch ${number}"></figure>`).join('')}<div class="art-gallery-spacer"></div>`;
    gallery.style.cssText = 'position:relative;display:block;box-sizing:border-box;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;padding:15vh 7vw 8vh;background:#111;';
    const title = gallery.querySelector('h1');
    const figures = [...gallery.querySelectorAll('figure')];
    const spacer = gallery.querySelector('.art-gallery-spacer');
    title.style.cssText = 'display:block;margin:0;color:#fff;font:400 clamp(42px,6vw,72px)/1.05 Georgia,serif;';
    spacer.style.cssText = 'display:block;width:100%;pointer-events:none;';
    const layout = () => {
      const style = getComputedStyle(gallery);
      const left = parseFloat(style.paddingLeft), right = parseFloat(style.paddingRight), topPadding = parseFloat(style.paddingTop);
      const columns = window.innerWidth <= 700 ? 2 : 3;
      const gap = window.innerWidth <= 700 ? 12 : 22;
      const width = (gallery.clientWidth - left - right - gap * (columns - 1)) / columns;
      if (width <= 0) return;
      const heights = Array(columns).fill(0);
      const top = topPadding + title.offsetHeight + 52;
      figures.forEach((figure) => {
        const image = figure.querySelector('img');
        const column = heights.indexOf(Math.min(...heights));
        const aspect = image.naturalWidth ? image.naturalHeight / image.naturalWidth : 1;
        figure.style.cssText = `position:absolute;left:${left + column * (width + gap)}px;top:${top + heights[column]}px;width:${width}px;margin:0;overflow:visible;`;
        image.style.cssText = 'display:block;width:100%;height:auto;max-width:none;object-fit:contain;';
        heights[column] += width * aspect + gap;
      });
      spacer.style.height = `${52 + Math.max(...heights)}px`;
    };
    figures.forEach((figure) => figure.querySelector('img').addEventListener('load', layout, { once: true }));
    requestAnimationFrame(layout);
    window.addEventListener('resize', layout, { passive: true });
  };
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-category="art"]')) requestAnimationFrame(() => requestAnimationFrame(renderArt));
  }, true);
  document.addEventListener('click', (event) => {
    const image = event.target.closest('#gallery.art-gallery figure img');
    if (!image) return;
    const lightbox = document.querySelector('.image-lightbox');
    const card = lightbox?.querySelector('.lightbox-card');
    if (!card) return;
    card.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
    lightbox.classList.add('is-open');
  });
  document.addEventListener('click', (event) => {
    if (event.target.closest('.image-lightbox.is-open .lightbox-card')) {
      document.querySelector('.image-lightbox')?.classList.remove('is-open');
    }
  });
})();
