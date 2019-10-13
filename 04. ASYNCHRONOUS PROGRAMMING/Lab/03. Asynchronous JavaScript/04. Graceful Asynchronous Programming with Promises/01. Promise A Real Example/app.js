//Essentially, a Promise is an object that represents an
//intermediate state of an operation

//At their most basic, promises are similar to event listeners,
//but with a few differences:

//A promise can only succeed or fail once.
//It cannot succeed or fail twice and it cannot switch 
//from success to failure or vice versa once the operation has completed.

//If a promise has succeeded or failed and you later add a
//success / failure callback, the correct callback will be called,
//even though the event took place earlier.

//The way that a .then() block works is similar to when 
//you add an event listener to an object using AddEventListener(). 
//It doesn't run until an event occurs (when the promise fulfills). 
//The most notable difference is that a .then() will only run once 
//for each time it is used, whereas an event listener could be 
//invoked multiple times.

//Bear in mind that the value returned by a fulfilled promise becomes 
//the parameter passed to the next .then() block's executor function.

//.then()/.catch() blocks in promises are basically the async equivalent 
//of a try...catch block in sync code. Bear in mind that synchronous 
//try...catch won't work in async code.

// Call the fetch() method to fetch the image, and store it in a variable
fetch('coffee.jpg')
// Use a then() block to respond to the promise's successful completion
// by taking the returned response and running blob() on it to transform it into a blob
    .then(response => response.blob())
// blob() also returns a promise; when it successfully completes it returns
// The blob object in the callback
    .then(myBlob => {
        // Create an object URL that points to the blob object
        let objectURL = URL.createObjectURL(myBlob);
        // Create an <img> element to display the blob (it's an image)
        let image = document.createElement('img');
        // Set the src of the <img> to the object URL so the image displays it
        image.src = objectURL;
        // Append the <img> element to the DOM
        document.body.appendChild(image);
    })
// If there is a problem, log a useful error message to the console
    .catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
    });


//Promise terminology recap

//When a promise is created, it is neither in a success or failure state. 
//It is said to be pending.

//When a promise returns, it is said to be resolved.

//A successfully resolved promise is said to be fulfilled. 
//It returns a value, which can be accessed by chaining a .then() 
//block onto the end of the promise chain. The executor function inside the 
//.then() block will contain the promise's return value.

//An unsuccessful resolved promise is said to be rejected.
//It returns a reason, an error message stating why the promise was rejected.
//This reason can be accessed by chaining a.catch() block onto the end 
//of the promise chain.