//A reference to our spinner, so we can animate it.
const spinner = document.querySelector('.spinner p');
//A reference to the <div> element that contains the spinner, 
//used for showing and hiding it.
const spinnerContainer = document.querySelector('.spinner');
//A reference to the Start button.
const btn = document.querySelector('button');
//A reference to the results paragraph.
const result = document.querySelector('.result');

//A rotate count — how much we want to show the spinner 
//rotated on each frame of the animation.
let rotateCount = 0;
//A null start time — will be populated with a start 
//time when the spinner starts spinning.
let startTime = null;
//An uninitialized variable to later store the requestAnimationFrame() 
//call that animates the spinner.
let rAF;

//takes two numerical inputs and returns a random number between the two.
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
};

//animates the spinner.
function draw(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }

    rotateCount = (timestamp - startTime) / 3;

    if (rotateCount > 359) {
        rotateCount %= 360;
    }

    spinner.style.transform = 'rotate(' + rotateCount + 'deg)';
    rAF = requestAnimationFrame(draw);
};

//set up the initial state of the app when the page first loads
result.style.display = 'none';
spinnerContainer.style.display = 'none';

//sets the app back to the original state required to start the game
//again after it has been played
function reset() {
    btn.style.display = 'block';
    result.textContent = '';
    result.style.display = 'none';
};

//run the start() function when it is clicked.
btn.addEventListener('click', start);

//calls draw() to start the spinner spinning and display it in the UI, 
//hides the Start button so we can't mess up the game by starting it 
//multiple times concurrently, and runs a setTimeout() call that 
//runs a setEndgame() function after a random interval 
//between 5 and 10 seconds has passed.
function start() {
    draw();
    spinnerContainer.style.display = 'block';
    btn.style.display = 'none';
    setTimeout(setEndgame, random(5000, 10000));
};

function setEndgame() {
    cancelAnimationFrame(rAF);
    spinnerContainer.style.display = 'none';
    result.style.display = 'block';
    result.textContent = 'PLAYERS GO!!';

    document.addEventListener('keydown', keyHandler);

    function keyHandler(e) {
        console.log(e.key);
        if (e.key === 'a') {
            result.textContent = 'Player 1 won!!';
        } else if (e.key === 'l') {
            result.textContent = 'Player 2 won!!';
        } else {
            return;
        }

        document.removeEventListener('keydown', keyHandler);
        setTimeout(reset, 5000);
    };
}