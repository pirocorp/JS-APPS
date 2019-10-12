//setTimeout()
//Execute a specified block of code once after a specified time has elapsed.

//Because timeout callbacks are executed cooperatively,
//there's no guarantee that they will be called after 
//exactly the specified amount of time.
//Instead, they will be called after at least that much time has elapsed. 

//Timeout handlers can't be run until the main thread reaches the point 
//in its execution where it goes through these handlers to find the 
//ones that need to be run.

//setTimeout() parameters

//A function to run, or a reference to function defined elsewhere.

//A number representing the time interval in milliseconds 
//(so 1000 equals one second) to wait before executing the code. 
//If you specify a value of 0 (or omit this value altogether), 
//the function will run immediately. 

//Zero or more values that represent any parameters you want 
//to pass to the function when it is run.

//setTimeout() returns an identifier value that can be used 
//to refer to the timeout later, such as when you want to stop it.

//With anonymous function
let myGreeting = setTimeout(function () {
    alert('Hello, Mr. Universe! (1)');
}, 2000);

// With a named function
let myGreeting2 = setTimeout(function sayHi() {
    alert('Hello, Mr. Universe! (2)');
}, 2000);

// With a function defined separately
function sayHi() {
    alert('Hello Mr. Universe! (3)');
}

let myGreeting3 = setTimeout(sayHi, 2000);

//Passing parameters to a setTimeout() function
function sayHi2(who) {
    alert('Hello ' + who + '! (4)');
}

let myGreeting4 = setTimeout(sayHi2, 2000, 'Mr. Universe');

//Clearing timeouts
//Finally, if a timeout has been created, you can cancel 
//it before the specified time has elapsed by calling clearTimeout()
//passing it the identifier of the setTimeout() call as a parameter
clearTimeout(myGreeting);
clearTimeout(myGreeting2);
clearTimeout(myGreeting3);