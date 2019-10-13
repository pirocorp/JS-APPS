const spinner = document.querySelector('div');
const body = document.querySelector('body');

let rotateCount = 0;
let startTime = null;
let rAF;

let isActive = false;

function draw(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }

    rotateCount = (timestamp - startTime) / 3;

    if (rotateCount > 359) {
        rotateCount %= 360;
    }

    spinner.style.transform = 'rotate(' + rotateCount + 'deg)';

    //This starts the animation off, constantly running the draw() function 
    //at a rate of as close to 60 FPS as possible.
    rAF = requestAnimationFrame(draw);
};

function onBodyClick() {
    if(isActive) {
        //Clearing a requestAnimationFrame() call using cancelAnimationFrame()
        cancelAnimationFrame(rAF)
    } else {
        draw();
    }

    isActive = !isActive;
}

body.addEventListener('click', onBodyClick);