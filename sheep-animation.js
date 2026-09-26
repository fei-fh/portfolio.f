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

  // Normalized samples of the existing lower black hill curve in Images/头图.png.
  const hillSamples = [
    [0, 0.725],
    [0.12, 0.665],
    [0.34, 0.585],
    [0.52, 0.68],
    [0.65, 0.705],
    [0.78, 0.695],
    [0.92, 0.635],
    [1, 0.62],
  ];

  const frames = Array.from({ length: FRAME_COUNT }, (_, index) => FRAME_PATH(index + 1));
  frames.forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  let frameIndex = 0;
  let lastFrameTime = performance.now();
  const frameDuration = 1000 / SHEEP_FPS;
  let travelPhase = 0;
  let lastTravelTime = performance.now();

  function fitSheep() {
    if (!homePortrait.naturalWidth || !sheep.naturalWidth || !sheepTrack.clientHeight) return;
    const styles = getComputedStyle(sheepTrack);
    const width = sheepTrack.clientWidth;
    const height = sheepTrack.clientHeight;
    const scale = Math.max(width / homePortrait.naturalWidth, height / homePortrait.naturalHeight);
    const imageLeft = (width - homePortrait.naturalWidth * scale) * (width <= 768 ? 0.52 : 0.5);
    const imageTop = (height - homePortrait.naturalHeight * scale) / 2;
    let lowestCurve = 0;
    for (let x = 0; x <= width; x += Math.max(1, width / 200)) {
      lowestCurve = Math.max(lowestCurve, imageTop + sampleHill((x - imageLeft) / scale / homePortrait.naturalWidth) * homePortrait.naturalHeight * scale);
    }
    const gap = parseFloat(styles.getPropertyValue('--sheep-path-gap'));
    const landing = Math.abs(parseFloat(styles.getPropertyValue('--sheep-landing-squash')));
    const textSpace = (sheepMessage?.offsetHeight || 28) + 32;
    const available = height - lowestCurve - gap - landing - textSpace;
    const ratio = sheep.naturalHeight / sheep.naturalWidth;
    const fittedWidth = Math.max(1, available / (ratio + Math.sin(7 * Math.PI / 180) / 2));
    sheepRunner.style.width = `${Math.min(parseFloat(styles.getPropertyValue('--sheep-width')), width * 0.42, fittedWidth)}px`;
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
      const gap = parseFloat(styles.getPropertyValue('--sheep-text-sheep-gap'));
      const naturalLeft = x - gap - sheepMessage.offsetWidth;
      const messageLeft = Math.max(16, Math.min(viewportWidth - sheepMessage.offsetWidth - 16, naturalLeft));
      sheepMessage.style.setProperty('--sheep-message-shift', `${messageLeft - naturalLeft}px`);
      sheepMessage.style.top = `${sheepTrack.clientHeight - sheepRunner.offsetTop - sheepMessage.offsetHeight - 16}px`;
    }
  }

  function sampleHill(normalizedX) {
    const x = Math.max(0, Math.min(1, normalizedX));
    const nextIndex = hillSamples.findIndex(([sampleX]) => sampleX >= x);
    if (nextIndex <= 0) return hillSamples[0][1];
    const [x1, y1] = hillSamples[nextIndex - 1];
    const [x2, y2] = hillSamples[nextIndex];
    const progress = (x - x1) / (x2 - x1);
    const eased = progress * progress * (3 - 2 * progress);
    return y1 + (y2 - y1) * eased;
  }

  function updateHillPath() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const imageWidth = homePortrait.naturalWidth || 1600;
    const imageHeight = homePortrait.naturalHeight || 985;
    const scale = Math.max(viewportWidth / imageWidth, viewportHeight / imageHeight);
    const renderedWidth = imageWidth * scale;
    const renderedHeight = imageHeight * scale;
    const positionX = window.matchMedia('(max-width: 768px)').matches ? 0.52 : 0.5;
    const imageLeft = (viewportWidth - renderedWidth) * positionX;
    const imageTop = (viewportHeight - renderedHeight) * 0.5;

    const runnerRect = sheepRunner.getBoundingClientRect();
    const sheepCenterX = runnerRect.right - (sheepPath.offsetWidth / 2);
    const imageX = (sheepCenterX - imageLeft) / scale;
    const normalizedX = imageX / imageWidth;
    const curveY = imageTop + (sampleHill(normalizedX) * imageHeight * scale);
    const pathGap = parseFloat(getComputedStyle(sheepTrack).getPropertyValue('--sheep-path-gap')) || 82;
    const pathShift = curveY + pathGap - runnerRect.top;

    const delta = 0.002;
    const yBefore = sampleHill(normalizedX - delta);
    const yAfter = sampleHill(normalizedX + delta);
    const slope = ((yAfter - yBefore) * imageHeight) / (delta * 2 * imageWidth);
    const angle = Math.max(-7, Math.min(7, Math.atan(slope) * 180 / Math.PI));

    sheepPath.style.setProperty('--sheep-path-shift', `${pathShift}px`);
    sheepPath.style.setProperty('--sheep-path-angle', `${angle}deg`);
  }

  function animateFrames(now) {
    updateTravel(now);
    updateHillPath();

    if (now - lastFrameTime >= frameDuration) {
      frameIndex = (frameIndex + 1) % frames.length;
      sheep.src = frames[frameIndex];
      lastFrameTime = now - ((now - lastFrameTime) % frameDuration);
    }

    requestAnimationFrame(animateFrames);
  }

  requestAnimationFrame(animateFrames);
})();
