(() => {
  const bird = document.createElement('span');
  bird.className = 'bird-cursor';
  bird.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 83C34 78 31 61 37 51C28 50 20 54 13 57C20 47 30 41 42 39C39 23 50 9 67 4C58 19 52 31 50 46C58 43 68 40 76 43C72 50 67 55 59 58M46 61C44 68 43 76 50 83"/></svg>';
  document.body.appendChild(bird);
  const style = document.createElement('style');
  style.textContent = '.home-signature,.home-caption{transform:translateY(50px)}.home-signature:hover,.home-caption:hover{animation:homeTextDrift .8s ease-in-out infinite alternate}@keyframes homeTextDrift{to{transform:translate(4px,46px);letter-spacing:.03em}}.bird-cursor{position:fixed;z-index:1000;pointer-events:none;width:42px;height:42px;transform:translate(-12%,-58%);opacity:0;transition:opacity .16s ease;filter:drop-shadow(0 2px 4px rgba(0,0,0,.12))}.bird-cursor svg{display:block;width:100%;height:100%;fill:none;stroke:rgba(20,20,20,.72);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}.bird-cursor.is-visible{opacity:1}';
  document.head.appendChild(style);
  document.addEventListener('pointermove', (event) => {
    const active = document.getElementById('home')?.classList.contains('scene-active');
    bird.style.left = `${event.clientX}px`;
    bird.style.top = `${event.clientY}px`;
    bird.classList.toggle('is-visible', active);
  });
})();
