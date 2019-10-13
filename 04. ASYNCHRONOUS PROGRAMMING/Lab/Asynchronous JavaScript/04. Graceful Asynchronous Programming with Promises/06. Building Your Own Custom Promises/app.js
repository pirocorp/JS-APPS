//resolve() and reject() are functions that you call to fulfill or reject 
//the newly-created promise. In this case, the promise fulfills with a 
//string of "Success!".
console.log('App Started!');

let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve('Success!');
    }, 2000);
});

timeoutPromise.then(console.log);