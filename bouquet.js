window.addEventListener('load', () => {
  const c = setTimeout(() => {
    document.body.classList.remove('not-loaded');
    clearTimeout(c);
  }, 1000);

  const bouquetPage =
    document.querySelector('.bouquet-page') ||
    document.querySelector('.flower-scene') ||
    document.body;

  if (!bouquetPage) return;

  bouquetPage.addEventListener('pointerdown', (e) => {
    const flower = document.createElement('span');
    flower.className = 'tap-flower';

    const emojis = ['💐', '🌸', '🌷', '🌹', '🌺', '🌼', '🪻'];
    flower.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const x = e.clientX;
    const y = e.clientY;

    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    const drift = Math.floor(Math.random() * 80 - 40);
    const size = Math.floor(Math.random() * 16 + 18);
    const duration = (Math.random() * 1 + 1.5).toFixed(2);

    flower.style.setProperty('--drift', `${drift}px`);
    flower.style.fontSize = `${size}px`;
    flower.style.animationDuration = `${duration}s`;

    bouquetPage.appendChild(flower);

    flower.addEventListener('animationend', () => {
      flower.remove();
    });
  });
});