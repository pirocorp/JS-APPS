//Recursive setTimeout() guarantees the same delay between the executions.
//The code will run and then wait before it runs again, 
//so the interval will be the same regardless of how long the 
//code takes to run.

//When using setTimeout() recursively, each iteration can calculate 
//a different delay before running the next iteration.

//When your code has the potential to take longer to run than the time 
//interval you’ve assigned, it’s better to use recursive setTimeout()

//recursive setTimeout() to run the passed function every 100 milliseconds
let i = 1;

setTimeout(function run() {
    console.log(`Recursive: ${i}`);
    i++;
    setTimeout(run, 100);
}, 100);


//The example using setInterval() does things somewhat differently. 
//The interval we choose includes the time taken to execute the code we want 
//to run in. Let's say that the code takes 40 milliseconds to run — 
//the interval then ends up being only 60 milliseconds.

//uses setInterval() to accomplish the same effect:
let x = 1;

setInterval(function run() {
    console.log(`setInterval: ${x}`);
    x++
}, 100);