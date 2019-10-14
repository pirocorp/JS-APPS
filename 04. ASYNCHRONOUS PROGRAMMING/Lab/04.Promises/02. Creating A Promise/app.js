//A Promise object is created using the new keyword and its constructor. 
//This constructor takes as its argument a function, called the 
//"executor function". This function should take two functions as parameters. 
//The first of these functions (resolve) is called when the asynchronous 
//task completes successfully and returns the results of the task as a value. 
//The second (reject) is called when the task fails, and returns the reason 
//for failure, which is typically an error object.
const myFirstPromise = new Promise((resolve, reject) => {
    // do something asynchronous which eventually calls either:
    //
    //   resolve(someValue); // fulfilled
    // or
    //   reject("failure reason"); // rejected
  });

//To provide a function with promise functionality, 
//simply have it return a promise:
function myAsyncFunction(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
};