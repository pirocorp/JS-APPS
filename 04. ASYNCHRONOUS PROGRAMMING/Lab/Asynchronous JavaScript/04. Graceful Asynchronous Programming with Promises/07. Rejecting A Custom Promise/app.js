//resolve() and reject() are functions that you call to fulfill or reject 
//the newly-created promise. In this case, the promise fulfills with a 
//string of "Success!".
console.log('App Started!');

function timeoutPromise(message, interval) {
    return new Promise((resolve, reject) => {
        if (message === '' || typeof message !== 'string') {
            reject('Message is empty or not a string');
        } else if (interval < 0 || typeof interval !== 'number') {
            reject('Interval is negative or not a number');
        } else {
            setTimeout(function () {
                resolve(message);
            }, interval);
        }
    });
};

timeoutPromise('Hello there!', 1000)
    .then(console.log)
    .catch(e => console.error('Error: ' + e));