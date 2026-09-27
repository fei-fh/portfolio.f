(() => {
  // Change this value to adjust the hand-drawn run cycle speed.
  const SHEEP_FPS = 9;
  const FRAME_COUNT = 8;
  const FRAME_PATH = (frame) =>
    `Images/sheep-animation/sheep-${String(frame).padStart(2, '0')}.png`;

  const sheep = document.querySelector('.home-sheep');
  const sheepPath = document.querySelector('.home-sheep-path');
  const sheepRunner = document.querySelector('.home-sheep-runner');
  const homePortrait = document.querySelector('.home-portrait');
  const sheepTrack = document.querySelector('.home-sheep-track');
  const sheepMessage = document.querySelector('.home-sheep-message');
  if (!sheep || !sheepPath || !sheepRunner || !homePortrait || !sheepTrack) return;

  const frames = Array.from({ length: FRAME_COUNT }, (_, index) => FRAME_PATH(index + 1));

  let frameIndex = 0;
  let lastFrameTime = performance.now();
  const frameDuration = 1000 / SHEEP_FPS;
  let travelPhase = 0;
  let lastTravelTime = performance.now();

  function fitSheep() {
    if (!homePortrait.naturalWidth || !sheep.naturalWidth || !sheepTrack.clientHeight) return;
    const styles = getComputedStyle(sheepTrack);
    sheepRunner.style.width = `${parseFloat(styles.getPropertyValue('--sheep-width'))}px`;
  }

  window.addEventListener('resize', fitSheep);
  homePortrait.addEventListener('load', fitSheep);
  sheep.addEventListener('load', fitSheep, { once: true });
  document.fonts.ready.then(fitSheep);
  fitSheep();

  function updateTravel(now) {
    const styles = getComputedStyle(sheepTrack);
    const durationValue = styles.getPropertyValue('--sheep-crossing-duration').trim();
    const duration = Math.max(100, parseFloat(durationValue) * (durationValue.endsWith('ms') ? 1 : 1000));
    travelPhase = (travelPhase + Math.min(now - lastTravelTime, 100) / duration) % 2;
    lastTravelTime = now;

    const width = sheepPath.offsetWidth;
    const height = sheepPath.offsetHeight;
    const maxJump = Math.max(
      Math.abs(parseFloat(styles.getPropertyValue('--sheep-small-jump'))),
      Math.abs(parseFloat(styles.getPropertyValue('--sheep-big-jump')))
    );
    // Reserve room for both the rotated image and the rotated vertical bounce.
    const reserve = (height / 2 + maxJump) * Math.sin(7 * Math.PI / 180) + 2;
    const viewportWidth = sheepTrack.clientWidth;
    const left = viewportWidth * parseFloat(styles.getPropertyValue('--sheep-left-boundary')) + reserve;
    const right = Math.max(left, viewportWidth * parseFloat(styles.getPropertyValue('--sheep-right-boundary')) - width - reserve);
    const progress = (1 - Math.cos(travelPhase * Math.PI)) / 2;
    const x = left + (right - left) * progress;
    sheepRunner.style.transform = `translateX(${x}px)`;
    sheep.style.setProperty('--sheep-facing', travelPhase < 1 ? 1 : -1);

    if (sheepMessage) {
      const isMobile = viewportWidth <= 768;
      if (isMobile) {
        const naturalLeft = x + (width - sheepMessage.offsetWidth) / 2;
        const minLeft = 12;
        const maxLeft = Math.max(minLeft, viewportWidth - sheepMessage.offsetWidth - 12);
        const messageLeft = Math.min(maxLeft, Math.max(minLeft, naturalLeft));
        sheepMessage.style.setProperty('--sheep-message-shift', `${messageLeft - naturalLeft}px`);
      } else {
        sheepMessage.style.setProperty('--sheep-message-shift', '0px');
      }
      if (!isMobile) {
        sheepMessage.style.top = `${sheepTrack.clientHeight - sheepRunner.offsetTop - sheepMessage.offsetHeight - 66}px`;
      }
    }
  }

  function updateHorizontalPath() {
    sheepPath.style.setProperty('--sheep-path-shift', '0px');
    sheepPath.style.setProperty('--sheep-path-angle', '0deg');
    if (sheepMessage && window.innerWidth <= 768) {
      sheepMessage.style.top = `${sheepPath.offsetHeight + 18}px`;
    }
  }

  function animateFrames(now) {
    updateTravel(now);
    updateHorizontalPath();

    if (now - lastFrameTime >= frameDuration) {
      frameIndex = (frameIndex + 1) % frames.length;
      sheep.src = frames[frameIndex];
      lastFrameTime = now - ((now - lastFrameTime) % frameDuration);
    }

    requestAnimationFrame(animateFrames);
  }

  const startAnimation = () => {
    Promise.all(frames.slice(1).map((src) => new Promise((resolve) => {
      const image = new Image();
      image.onload = image.onerror = resolve;
      image.src = src;
    }))).then(() => requestAnimationFrame(animateFrames));
  };
  const scheduleAnimation = () => {
    if ('requestIdleCallback' in window) requestIdleCallback(startAnimation, { timeout: 800 });
    else setTimeout(startAnimation, 0);
  };
  if (homePortrait.complete) scheduleAnimation();
  else homePortrait.addEventListener('load', scheduleAnimation, { once: true });
})();
