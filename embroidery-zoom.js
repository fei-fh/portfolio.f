(() => {
  const selector = '.image-placeholder[data-image="Images/embroidery1.png"]';
  document.addEventListener('click', (event) => {
    if (event.target.closest(selector)) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  document.addEventListener('pointermove', (event) => {
    const card = event.target.closest(selector); if (!card) return;
    const image = card.querySelector('img'); const box = card.getBoundingClientRect(); const x = event.clientX - box.left;
    if (x > box.width / 2) {
      let side = card.querySelector('.embroidery-side-zoom');
      if (!side) { side = document.createElement('i'); side.className = 'embroidery-side-zoom'; side.style.cssText = "position:absolute;inset:0 0 0 50%;z-index:0;background:url('Images/embroidery2.png') center/cover no-repeat;transition:transform .22s ease;pointer-events:none;"; card.appendChild(side); }
      side.style.transformOrigin = `${(x - box.width / 2) / (box.width / 2) * 100}% ${(event.clientY - box.top) / box.height * 100}%`;
      side.style.transform = 'scale(1.28)'; image.style.transform = '';
    } else { image.style.transformOrigin = `${x / box.width * 100}% ${(event.clientY - box.top) / box.height * 100}%`; image.style.transform = 'scale(1.32)'; card.querySelector('.embroidery-side-zoom')?.style.setProperty('transform',''); }
  });
  document.addEventListener('pointerout', (event) => {
    const card = event.target.closest(selector); if (!card || card.contains(event.relatedTarget)) return;
    card.querySelector('img').style.transform = ''; card.querySelector('.embroidery-side-zoom')?.style.setProperty('transform','');
  });
})();
