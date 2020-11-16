// canvas setup
const canvas = document.getElementById('hero-bg');
const ctx = canvas.getContext('2d');
class Frame {
    constructor(frameIndex) {
        this.text = 'Katedralskolans pingisförening';
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.frameIndex = frameIndex;
        this.updateCanvas();
    }
    updateCanvas() {
        const aspectRatio = this.width / this.height;
        canvas.width = this.width;
        canvas.height = (aspectRatio > (16 / 9)) ?
            this.height / 1.5 :
            this.height / 2;
    }
}
class Heading extends Frame {
    calculateFontSize() {
        let fontSize = this.height;
        ctx.font = `${fontSize}px Arial`;
        const words = this.text.split(' ');
        const wordWidths = words.map(word => ctx.measureText(word).width);
        const longestWordWidth = Math.max(...wordWidths);
        const targetWidth = this.width * (2 / 3);
        fontSize = targetWidth / (longestWordWidth / fontSize);
        ctx.font = `${fontSize}px Arial`;
    }
    constructor(frameIndex) {
        super(frameIndex);
        this.calculateFontSize();
    }
}
const frame = new Frame(0);
const heading = new Heading(0);
/*let h, w;
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
  canvas.height = (w / (h / 2) > (16 / 9)) ?
    h / 1.5:
    h / 2;

  let textSize = h;
  ctx.font = `${textSize}px Arial`;
  const firstText = 'Katedralskolans';
  const iText = 'pingisförening';
  const iTextWidth = ctx.measureText(iText).width;
  const widthSizeRatio = iTextWidth / textSize;
  const targetWidth = (2 / 3) * w;
  textSize = targetWidth / widthSizeRatio;
  const textMargin = textSize + 10;
  const offsetY = (canvas.height / 2) - (textSize / 2) + textMargin / 5;
  ctx.font = `${textSize}px Arial`;

  const addedHeight = 40;
  const heroText = document.getElementById('hero-text');
  const heroTextParagraph = document.querySelector('#hero-text > p');
  heroTextParagraph.style.fontSize = `${(textSize * 2 + 10 + addedHeight) / 8}px`;
  heroText.style.right = '30px';

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
    heroText.style.top = `${canvas.height / 2 - textSize - addedHeight / 2 + canvas.offsetTop + 20}px`;
    ctx.fillStyle = 'rgba(40,40,40,1)';
    ctx.fillRect(w - 40 - heroText.clientWidth, canvas.height / 2 - textSize - addedHeight / 2, heroText.clientWidth + 20, textSize * 2 + 10 + addedHeight);
    
    ctx.fillStyle = 'rgba(255,255,255,1)';
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
      heroText.style.top = `${easeInOut(secondsPassed, canvas.height / 2 - textSize - addedHeight / 2 + canvas.offsetTop + 20 + 30, -30, 0.3)}px`;
      ctx.fillStyle = 'rgba(40,40,40,1)';
      ctx.fillRect(w - 40 - heroText.clientWidth, easeInOut(secondsPassed, canvas.height / 2 - textSize - addedHeight / 2, 30, 0.3) - 30, heroText.clientWidth + 20, textSize * 2 + 10 + addedHeight);

      ctx.fillStyle = 'rgba(255,255,255,1)';
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
*/ 
