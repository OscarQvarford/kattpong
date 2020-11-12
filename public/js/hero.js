const canvas = document.getElementById('hero');
const ctx = canvas.getContext('2d');

let h, w;
let drawIndex = 0;
let animationLength = 0.3;
let endYOffset = 50;
let secondsPassed = 0;

const draw = () => {
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

  if (drawIndex >= 60 * animationLength) {
    clearInterval(animationInterval);

    ctx.strokeText(text, 20, 130);
  } else {
    const easeInOut = (t, b, c, d) => {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }

    ctx.strokeStyle = `rgba(0,0,0,${easeInOut(secondsPassed, 0, 1, 0.3)})`;
    ctx.strokeText(text, 20, easeInOut(secondsPassed, 100, 30, 0.3));
  }

  secondsPassed += 1000 / 60 / 1000;
  drawIndex++;
}

const animationInterval = setInterval(draw, 1000 / 60);

draw();

window.addEventListener('resize', draw);

