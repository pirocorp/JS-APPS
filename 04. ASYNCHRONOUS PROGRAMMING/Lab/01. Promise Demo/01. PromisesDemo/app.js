let promise = new Promise((resolve, reject) => {
    console.log("Executed");
    setTimeout(() => {
        reject("Nothing happen");
        //resolve("I am ready at last");
    }, 1000);
});

promise
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    });

console.log('Hello');