(() => {
  // Change this value to adjust the hand-drawn run cycle speed.
  const SHEEP_FPS = 9;
  const FRAME_COUNT = 8;
  const FRAME_PATH = (frame) =>
    `Images/sheep-animation/sheep-${String(frame).padStart(2, '0')}.png`;

  const sheep = document.querySelector('.home-sheep');
  if (!sheep) return;

  const frames = Array.from({ length: FRAME_COUNT }, (_, index) => FRAME_PATH(index + 1));
  frames.forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  let frameIndex = 0;
  let lastFrameTime = performance.now();
  const frameDuration = 1000 / SHEEP_FPS;

  function animateFrames(now) {
    if (now - lastFrameTime >= frameDuration) {
      frameIndex = (frameIndex + 1) % frames.length;
      sheep.src = frames[frameIndex];
      lastFrameTime = now - ((now - lastFrameTime) % frameDuration);
    }

    requestAnimationFrame(animateFrames);
  }

  requestAnimationFrame(animateFrames);
})();
