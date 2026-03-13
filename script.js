const tossesInput = document.getElementById('tosses');
const tossesValue = document.getElementById('tossesValue');
const simulateBtn = document.getElementById('simulateBtn');
const totalPointsEl = document.getElementById('totalPoints');
const insidePointsEl = document.getElementById('insidePoints');
const piEstimateEl = document.getElementById('piEstimate');
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

function drawFrame() {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = '#f8fbff';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#5a85c8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, w * 0.4, 0, Math.PI * 2);
  ctx.stroke();
}

function toCanvas(x, y) {
  const px = ((x + 1) / 2) * canvas.width;
  const py = (1 - (y + 1) / 2) * canvas.height;
  return { px, py };
}

function simulate() {
  const tosses = Number(tossesInput.value);
  let inside = 0;

  drawFrame();

  for (let i = 0; i < tosses; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const isInside = x * x + y * y <= 1;
    if (isInside) inside++;

    const { px, py } = toCanvas(x, y);
    ctx.fillStyle = isInside ? '#16a34a' : '#dc2626';
    ctx.fillRect(px, py, 2, 2);
  }

  const piEstimate = (4 * inside) / tosses;
  totalPointsEl.textContent = tosses.toLocaleString();
  insidePointsEl.textContent = inside.toLocaleString();
  piEstimateEl.textContent = piEstimate.toFixed(6);
}

tossesInput.addEventListener('input', () => {
  tossesValue.textContent = tossesInput.value;
});

simulateBtn.addEventListener('click', simulate);

drawFrame();
simulate();
