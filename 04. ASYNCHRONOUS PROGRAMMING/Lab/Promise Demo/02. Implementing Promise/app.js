let promise = new MyPromise((resolve, reject) => {
    console.log("Executed");
    setTimeout(() => {
        //reject("Nothing happen");
        resolve("I am ready at last");
    }, 1000);
});

promise
    .then((data) => {
        console.log("First: " + data);
    })
    .then((data) => {
        console.log("Second: " + data);
    })
    .catch((err) => {
        console.error(err);
    });

console.log('Hello');