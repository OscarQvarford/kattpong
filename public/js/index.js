import { StyleChange } from './styleChange.js';
const hamburger = document.getElementById('hamburger');
let isActive = 0;
hamburger.addEventListener('click', () => {
    if (isActive)
        isActive = 0;
    else
        isActive = 1;
    const styleChange = new StyleChange(isActive);
    styleChange.changeStyle();
});
