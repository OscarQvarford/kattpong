import { styleDataset } from './styleChangeData.js';

export class StyleChange {
  valueIndex: number;

  constructor(vi: number) {
    this.valueIndex = vi;
  }

  changeStyle() {
    for (const styleData of styleDataset) {
      const properties = Object.keys(styleData.properties);
      for (const property of properties) {
        let delay: number;
        let delayIsArray: boolean;
        if (styleData.properties[property].hasOwnProperty('delay')) {
          if (Array.isArray(styleData.properties[property].delay)) { 
            delay = styleData.properties[property].delay[this.valueIndex];
            delayIsArray = true;
          } else {
            delay = <number>styleData.properties[property].delay;
            delayIsArray = false;
          }
        } else {
          delay = 0;
        }
        
        setTimeout(() => {
          const element = (Array.isArray(styleData.element)) ?
            styleData.element : [styleData.element];

          const styleVal = styleData.properties[property].values[this.valueIndex];

          let delaySum = 0;
          const delayIncrease = (delayIsArray) ? 
            styleData.properties[property].delay[2] : 0;
          for (const el of element) {
            setTimeout(() => el.style[property] = styleVal, delaySum);

            if (delayIncrease)
              delaySum += delayIncrease;
          }
        }, delay);
      }
    }
  }
}