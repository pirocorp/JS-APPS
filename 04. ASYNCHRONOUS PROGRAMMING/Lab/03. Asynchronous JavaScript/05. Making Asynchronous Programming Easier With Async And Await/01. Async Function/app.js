//async keyword is added to functions to tell them to return a 
//promise rather than directly returning the value

//Invoking the function now returns a promise.
async function hello() { return "Hello" };
console.log(hello());

//You can also create an async function expression
let hello1 = async function () { return "Hello (1)" };
console.log(hello1());

//And you can use arrow functions:
let hello2 = async () => { return "Hello (2)" };
console.log(hello2());

//To actually consume the value returned when the promise fulfills, 
//since it is returning a promise, we could use a .then() block:
hello().then((value) => console.log(value))

//The await keyword
//This can be put in front of any async promise-based function to pause your 
//code on that line until the promise fulfills, then return the resulting 
//value. In the meantime, other code that may be waiting for a chance to 
//execute gets to do so.

//You can use await when calling any function that returns a Promise, 
//including web API functions.
async function hello3() {
    //The Promise.resolve() method returns a Promise object that is resolved with a given value
    return greeting = await Promise.resolve("Hello (3)");
};

hello3().then(console.log);