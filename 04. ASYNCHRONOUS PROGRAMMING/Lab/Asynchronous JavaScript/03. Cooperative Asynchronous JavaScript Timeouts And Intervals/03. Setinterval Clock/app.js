//setInterval()
//Execute a specified block of code repeatedly with a 
//fixed time delay between each call.

//This works in a very similar way to setTimeout(),
//except that the function you pass to it as the first parameter
//is executed repeatedly at no less than the number of milliseconds
//given by the second parameter apart, rather than at once.
//You can also pass any parameters required by the function
//being executed in as subsequent parameters of the setInterval() call.

//Just like setTimeout(), setInterval() returns an identifying value 
//you can use later when you need to clear the interval.
function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    document.querySelector('.clock').textContent = time;
}

displayTime();

const createClock = setInterval(displayTime, 1000);