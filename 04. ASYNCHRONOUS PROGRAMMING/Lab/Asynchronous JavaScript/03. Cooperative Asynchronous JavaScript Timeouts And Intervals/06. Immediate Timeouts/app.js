//Using 0 as the value for setTimeout() schedules the execution 
//of the specified callback function as soon as possible 
//but only after the main code thread has been run.
setTimeout(function () {
    console.log('World');
}, 0);

console.log('Hello');

//This can be useful in cases where you want to set a block of code 
//to run as soon as all of the main thread has finished running — 
//put it on the async event loop, so it will run straight afterwards.