const curtain = document.getElementById('curtain');
const lines = document.getElementsByClassName('hamburger-line');
const hamburgerItems = Array.from(document.getElementsByClassName('hamburger-item'));
export const styleDataset = [
    {
        element: curtain,
        properties: {
            visibility: {
                values: ['hidden', 'visible'],
                delay: [300, 0]
            },
            height: {
                values: ['0', '100vh']
            }
        }
    },
    {
        element: lines[0],
        properties: {
            transform: {
                values: ['rotate(0)', 'rotate(45deg)']
            },
            top: {
                values: ['0', 'calc(2rem / 3 + 1px)']
            }
        }
    },
    {
        element: lines[1],
        properties: {
            transform: {
                values: ['rotate(0)', 'rotate(-45deg)']
            }
        }
    },
    {
        element: lines[2],
        properties: {
            width: {
                values: ['2rem', '0']
            }
        }
    },
    {
        element: hamburgerItems,
        properties: {
            left: {
                values: ['-50%', '0'],
                delay: [0, 120, 50]
            },
            opacity: {
                values: ['0', '1'],
                delay: [0, 120, 50]
            }
        }
    }
];
