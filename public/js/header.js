const hamburger = document.getElementById('hamburger');
const curtain = document.getElementById('curtain');
const lines = document.getElementsByClassName('hamburger-line');
const hamburgerItems = document.getElementsByClassName('hamburger-item');

const curtainValues = ['0', '100vh']

const lineValues = [{
	transform: ['rotate(0)', 'rotate(45deg)'],
	top: ['0', 'calc(2rem / 3 + 1px)']
}, {
	transform: ['rotate(0)', 'rotate(-45deg)']
}, {
	width: ['2rem', '0']
}];

const hamburgerItemsValue = {
	left: ['-50%', '0'],
	opacity: ['0', '1']
};

let isActive = 0;
hamburger.addEventListener('click', () => {
	if (isActive) isActive = 0;
	else isActive = 1;

	if (isActive) curtain.style.display = 'block';
	setTimeout(() => curtain.style.height = curtainValues[isActive], 0);
	if (!isActive) setTimeout(() => {
		curtain.style.display = 'none';
	}, 300);

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

	let hamburgerItemsIndex = (isActive) ? 0 : hamburgerItems.length - 1;
	let slideTime = (isActive) ? 115 : 50;
	const hamburgerItemLoop = () => {
		setTimeout(() => {
			if (hamburgerItemsIndex < hamburgerItems.length && hamburgerItemsIndex >= 0) {
				hamburgerItems[hamburgerItemsIndex].style.left = hamburgerItemsValue.left[isActive];
				hamburgerItems[hamburgerItemsIndex].style.opacity = hamburgerItemsValue.opacity[isActive];
				hamburgerItemsIndex = (isActive) ? hamburgerItemsIndex + 1 : hamburgerItemsIndex - 1;
				hamburgerItemLoop();
			}
		}, slideTime);
	}

	hamburgerItemLoop();
});