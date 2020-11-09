const hamburger = document.getElementById('hamburger');
const curtain = document.getElementById('curtain');
const lines = document.getElementsByClassName('hamburger-line');

const lineValues = [{
	transform: ['rotate(0)', 'rotate(45deg)'],
	top: ['0', 'calc(2rem / 3 + 1px)']
}, {
	transform: ['rotate(0)', 'rotate(-45deg)']
}, {
	width: ['2rem', '0']
}];

const curtainValues = ['0', '100vh']

let isActive = 0;
hamburger.addEventListener('click', () => {
	if (isActive) isActive = 0;
	else isActive = 1;

	curtain.style.height = curtainValues[isActive];

	for (let i = 0; i < lines.length; i++) {
		switch (i) {
			case 0:
				lines[0].style.transform = lineValues[0].transform[isActive];
				lines[0].style.top = lineValues[0].top[isActive];
				break;
			case 1:
				lines[1].style.transform = lineValues[1].transform[isActive];
				break;
			case 2:
				lines[2].style.width  = lineValues[2].width[isActive];
				break;
		}
	}
});