const canvas = document.getElementById('hero');
const ctx = canvas.getContext('2d');

let h, w;
let drawIndex = 0;
let slideAnimationLength = 0.3;
let bounceAnimationLength = 0.8;
let endYOffset = 50;
let secondsPassed = 0;

const draw = () => {
  if (h && w) ctx.clearRect(0, 0, w, h);

  h = window.innerHeight;
  w = window.innerWidth;

  canvas.width = w
  canvas.height = h / 2;

  let textSize = h;
  ctx.font = `${textSize}px Arial`;
  const firstText = 'Katedralskolans';
  const iText = 'pingissamfund';
  const iTextWidth = ctx.measureText(iText).width;
  const widthSizeRatio = iTextWidth / textSize;
  const targetWidth = (2 / 3) * w;
  textSize = targetWidth / widthSizeRatio;
  const textMargin = textSize + 10;
  ctx.font = `${textSize}px Arial`;

  if (w >= 700)
    ctx.lineWidth = 3;
  else if (w < 700 && w >= 500)
    ctx.lineWidth = 2;
  else
    ctx.lineWidth = 1;

  iMetrics = ctx.measureText('i');
  iWidth = iMetrics.width;
  iActualBoundingBoxAscent = iMetrics.actualBoundingBoxAscent;
  beforeiWidth = ctx.measureText(iText.substr(0, iText.indexOf('i'))).width;
  ctx.fillStyle = 'rgba(255,255,255,1)';

  const easeInOut = (t, b, c, d) => {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  }

  const postAnimationDraw = () => {
    ctx.strokeStyle = 'rgba(220, 220, 220, 1)';
    ctx.strokeText(firstText, 20, 130);
    ctx.strokeText(iText, 20, 130 + textMargin);
    
    ctx.fillRect(beforeiWidth + 20, 130 - iActualBoundingBoxAscent - (iActualBoundingBoxAscent / 10) + textMargin, iWidth, iWidth);
  }

  if (drawIndex >= 60 * slideAnimationLength && drawIndex >= 60 * bounceAnimationLength) {
    clearInterval(animationInterval);
    postAnimationDraw();

    ctx.beginPath();
    ctx.arc(beforeiWidth + 20 + iWidth / 2,  130 - iActualBoundingBoxAscent + textMargin, iWidth / 2, 0, 2 * Math.PI);
    ctx.stroke();
  } else {
    if (drawIndex < 60 * slideAnimationLength) {
      ctx.strokeStyle = `rgba(220,220,220,${easeInOut(secondsPassed, 0, 1, 0.3)})`;
      ctx.strokeText(firstText, 20, easeInOut(secondsPassed, 100, 30, 0.3));
      ctx.strokeText(iText, 20, easeInOut(secondsPassed, 100, 30, 0.3) + textMargin);
      ctx.fillRect(beforeiWidth + 20, easeInOut(secondsPassed, 100, 30, 0.3) - iActualBoundingBoxAscent - (iActualBoundingBoxAscent / 10) + textMargin, iWidth, iWidth);
    } else postAnimationDraw();

    const animationProps = (start, change, time) => {
      ctx.beginPath();
      ctx.arc(beforeiWidth + 20 + iWidth / 2, 
              easeInOut(secondsPassed, start, change, time) - iActualBoundingBoxAscent + textMargin, 
              iWidth / 2, 0, 2 * Math.PI);
      ctx.stroke();
    }

    if (drawIndex < 60 * 0.4)
      animationProps(100, 30, 0.4);
    else if (drawIndex < 60 * 0.6)
      animationProps(130, -10, 0.2);
    else if (drawIndex < 60 * 0.8)
      animationProps(130, -10, 0.2);
  }

  secondsPassed += 1000 / 60 / 1000;
  drawIndex++;
}

const animationInterval = setInterval(draw, 1000 / 60);

draw();

window.addEventListener('resize', draw);
