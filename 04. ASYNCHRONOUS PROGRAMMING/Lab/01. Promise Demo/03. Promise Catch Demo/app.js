const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //throw new Error("Test error")
        //reject("Nothing happen");
        resolve("I am ready at last");
    }, 1000);
});

//catch wont catch throw
promise
    .then((data) => {
        console.log("Then: ");
        console.log(data);
    })
    .catch((err) => {
        console.log('Catch: ');
        console.error(err);
    });

//------------------------------------------------------------------------------------
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {        
        //reject("Nothing happen");
        resolve("I am ready at last");
    }, 1000);
});

//In this case catch will work and will catch throw 
promise2
    .then((data) => {
        throw new Error("Test error");
    })
    .catch((err) => {
        console.log('Catch: ');
        console.error(err);
    });