const canvas = document.getElementById('hero');
const ctx = canvas.getContext('2d');

let h, w;
let drawIndex = 0;
let animationLength = 1000;

const draw = () => {
  //if (h && w) ctx.clearRect(0, 0, h, w);

  h = window.innerHeight;
  w = window.innerWidth;

  canvas.width = w
  canvas.height = h / 2;

  let textSize = h;
  ctx.font = `${textSize}px Arial`;
  const text = 'Katedralskolans pingissamfund';
  const textWidth = ctx.measureText(text).width;
  const widthSizeRatio = textWidth / textSize;
  const targetWidth = (2 / 3) * w;
  textSize = targetWidth / widthSizeRatio;
  ctx.font = `${textSize}px Arial`;
  ctx.strokeText(text, 20, 100);

  drawIndex++;

  if (drawIndex >= animationLength) clearInterval(animationInterval);
}

const animationInterval = setInterval(draw, 1000 / 60);

draw();

window.addEventListener('resize', draw);

