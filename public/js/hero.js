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
  const iText = 'pingisförening';
  const iTextWidth = ctx.measureText(iText).width;
  const widthSizeRatio = iTextWidth / textSize;
  const targetWidth = (2 / 3) * w;
  textSize = targetWidth / widthSizeRatio;
  const textMargin = textSize + 10;
  const offsetY = (h / 4) - (textSize / 2) + textMargin / 5;
  ctx.font = `${textSize}px Arial`;

  const addedHeight = 40;
  const heroText = document.getElementById('hero-text');
  const heroTextParagraph = document.querySelector('#hero-text > p');
  heroTextParagraph.style.fontSize = `${(textSize * 2 + 10 + addedHeight) / 8}px`;
  heroText.style.top = `${h / 4 - textSize - addedHeight / 2 + canvas.offsetTop + 20}px`;
  heroText.style.right = '30px';
  ctx.fillStyle = 'rgba(40,40,40,1)';
  ctx.fillRect(w - 40 - heroText.clientWidth, h / 4 - textSize - addedHeight / 2, heroText.clientWidth + 20, textSize * 2 + 10 + addedHeight);

  if (w >= 800)
    ctx.lineWidth = 3;
  else if (w < 800 && w >= 500)
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
    const texts = [firstText, iText];
    for (let i = 0; i < texts.length; i++) {
      const gradient = ctx.createLinearGradient(20, 0, ctx.measureText(texts[i]).width + 20, 0);
      gradient.addColorStop((w - 30 - heroText.clientWidth - 30) / ctx.measureText(texts[i]).width, 'rgba(235, 235, 235, 1)');
      gradient.addColorStop((w - 30 - heroText.clientWidth - 30) / ctx.measureText(texts[i]).width, 'rgba(55, 55, 55, 1)');
      ctx.strokeStyle = gradient;
      if (texts[i] === firstText)
        ctx.strokeText(firstText, 20, offsetY);
      else
        ctx.strokeText(iText, 20, offsetY + textMargin);
    }
    
    ctx.fillRect(beforeiWidth + 20, offsetY - iActualBoundingBoxAscent - (iActualBoundingBoxAscent / 10) + textMargin, iWidth, iWidth);
  }

  if (drawIndex >= 60 * slideAnimationLength && drawIndex >= 60 * bounceAnimationLength) {
    clearInterval(animationInterval);
    postAnimationDraw();

    ctx.beginPath();
    ctx.arc(beforeiWidth + 20 + iWidth / 2,  offsetY - iActualBoundingBoxAscent + textMargin, iWidth / 2, 0, 2 * Math.PI);
    ctx.stroke();
  } else {
    if (drawIndex < 60 * slideAnimationLength) {
      const texts = [firstText, iText];
      for (let i = 0; i < texts.length; i++) {
        const gradient = ctx.createLinearGradient(20, 0, ctx.measureText(texts[i]).width + 20, 0);
        gradient.addColorStop((w - 30 - heroText.clientWidth - 30) / ctx.measureText(texts[i]).width, 'rgba(235, 235, 235, 1)');
        gradient.addColorStop((w - 30 - heroText.clientWidth - 30) / ctx.measureText(texts[i]).width, 'rgba(55, 55, 55, 1)');
        ctx.strokeStyle = gradient;
        if (texts[i] === firstText)
        ctx.strokeText(firstText, 20, easeInOut(secondsPassed, offsetY - 30, 30, 0.3));
        else
        ctx.strokeText(iText, 20, easeInOut(secondsPassed, offsetY - 30, 30, 0.3) + textMargin);
      }

      ctx.fillRect(beforeiWidth + 20, easeInOut(secondsPassed, offsetY - 30, 30, 0.3) - iActualBoundingBoxAscent - (iActualBoundingBoxAscent / 10) + textMargin, iWidth, iWidth);
    } else postAnimationDraw();

    const animationProps = (start, change, time) => {
      ctx.beginPath();
      ctx.arc(beforeiWidth + 20 + iWidth / 2, 
              easeInOut(secondsPassed, start, change, time) - iActualBoundingBoxAscent + textMargin, 
              iWidth / 2, 0, 2 * Math.PI);
      ctx.stroke();
    }

    if (drawIndex < 60 * 0.4)
      animationProps(offsetY - 30, 30, 0.4);
    else if (drawIndex < 60 * 0.6)
      animationProps(offsetY, -10, 0.2);
    else if (drawIndex < 60 * 0.8)
      animationProps(offsetY, -10, 0.2);
  }

  secondsPassed += 1000 / 60 / 1000;
  drawIndex++;
}

const animationInterval = setInterval(draw, 1000 / 60);

draw();

window.addEventListener('resize', draw);
