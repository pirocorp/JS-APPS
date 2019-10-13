//There will be cases where you want to run a final block of code
//after a promise completes, regardless of whether it fulfilled or rejected.

//Old Style
myPromise
    .then(response => {
        doSomething(response);
        runFinalCode();
    })
    .catch(e => {
        returnError(e);
        runFinalCode();
    });

//In more recent modern browsers, the .finally() method is available, 
///which can be chained onto the end of your regular promise chain allowing 
//you to cut down on code repetition and do things more elegantly. 
//The above code can now be written as follows:
myPromise
    .then(response => {
        doSomething(response);
    })
    .catch(e => {
        returnError(e);
    })
    .finally(() => {
        runFinalCode();
    });