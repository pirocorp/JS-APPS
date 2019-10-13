//The downsides of async/await
//Async/await makes your code look synchronous, 
//and in a way it makes it behave more synchronously. 
//The await keyword blocks execution of all the code that follows until 
//the promise fulfills, exactly as it would with a synchronous operation. 
//It does allow other tasks to continue to run in the meantime, 
//but your own code is blocked.

//This means that your code could be slowed down by a significant number 
//of awaited promises happening straight after one another. 
//Each await will wait for the previous one to finish, 
//whereas actually what you want is for the promises to begin processing 
//simultaneously, like they would do if we weren't using async/await.

//There is a pattern that can mitigate this problem — 
//setting off all the promise processes by storing the Promise objects 
//in variables, and then awaiting them all afterwards. Let's have a look 
//at some examples that prove the concept.

// Define custom promise function
function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("done");
        }, interval);
    });
};

//Demonstration of slow async/await
//Here we simply await all three timeoutPromise() calls directly
//Each subsequent one is forced to wait until the last one finished 
async function timeTestSlow() {
    await timeoutPromise(3000);
    await timeoutPromise(3000);
    await timeoutPromise(3000);
}

//Demonstration of fast async/await
//Here we store the three Promise objects in variables, 
//which has the effect of setting off their associated processes 
//all running simultaneously.
async function timeTestFast() {
    const timeoutPromise1 = timeoutPromise(3000);
    const timeoutPromise2 = timeoutPromise(3000);
    const timeoutPromise3 = timeoutPromise(3000);
    await timeoutPromise1;
    await timeoutPromise2;
    await timeoutPromise3;
};

let startTime = Date.now();

function showElapsedTime() {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    alert("Slow: Time taken in milliseconds: " + timeTaken);
}

timeTestSlow().then(() => {
    showElapsedTime();
});

timeTestFast().then(() => {
    showElapsedTime();
});