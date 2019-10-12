//clearTimeout() and clearInterval() both use the same list of entries 
//to clear from. Interestingly enough, this means that you can use 
//either method to clear a setTimeout() or setInterval().

//For consistency, you should use clearTimeout() to clear setTimeout() 
//entries and clearInterval() to clear setInterval() entries. 
//This will help to avoid confusion.

// Define a counter variable for the number of seconds and set it to zero.
let secondCount = 0;

// Define a global to store the interval when it is active.
let stopWatch;

// Store a reference to the display paragraph in a variable
const displayPara = document.querySelector('.clock');

// Function to calculate the current hours, minutes, and seconds, and display the count
function displayCount() {
    // Calculate current hours, minutes, and seconds
    let hours = Math.floor(secondCount / 3600);
    let minutes = Math.floor((secondCount % 3600) / 60);
    let seconds = Math.floor(secondCount % 60)

    // Display a leading zero if the values are less than ten
    let displayHours = (hours < 10) ? '0' + hours : hours;
    let displayMinutes = (minutes < 10) ? '0' + minutes : minutes;
    let displaySeconds = (seconds < 10) ? '0' + seconds : seconds;

    // Write the current stopwatch display time into the display paragraph
    displayPara.textContent = displayHours + ':' + displayMinutes + ':' + displaySeconds;

    // Increment the second counter by one
    secondCount++;
};

// Store references to the buttons in constants
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

// When the start button is pressed, start running displayCount() once per second using displayInterval()
startBtn.addEventListener('click', () => {
    stopWatch = setInterval(displayCount, 1000);
    startBtn.disabled = true;
});

// When the stop button is pressed, clear the interval to stop the count.
stopBtn.addEventListener('click', () => {
    clearInterval(stopWatch);
    startBtn.disabled = false;
});

// When the reset button is pressed, set the counter back to zero, then immediately update the display
resetBtn.addEventListener('click', () => {
    clearInterval(stopWatch);
    startBtn.disabled = false;
    secondCount = 0;
    displayCount();
});

// Run displayCount() once as soon as the page loads so the clock is displayed
displayCount();