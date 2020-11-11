const canvas = document.getElementById('hero');
const ctx = canvas.getContext('2d');

let h, w;

const draw = () => {
  h = window.innerHeight;
  w = window.innerWidth;

  canvas.width = w
  canvas.height = h / 2;

  ctx.font = `${50}px Arial`;
  const text = 'Katedralskolans pingissamfund';
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;
  const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
  widthHeightRatio = textWidth / textHeight;
  ctx.strokeText(text, 5, 100);
}
draw();

window.addEventListener('resize', draw);

