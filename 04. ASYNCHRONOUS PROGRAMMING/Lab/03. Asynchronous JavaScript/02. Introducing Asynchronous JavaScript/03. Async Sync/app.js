//Async operations like promises are put into an event queue, 
//which runs after the main thread has finished processing so 
//that they do not block subsequent JavaScript code from running.

//The queued operations will complete as soon as possible then 
//return their results to the JavaScript environment.

//Promises have some similarities to old-style callbacks. 
//They are essentially a returned object to which you attach 
//callback functions, rather than having to pass callbacks into a function.

//You can chain multiple async operations together using multiple 
//.then() operations, passing the result of one into the next one as 
//an input. This is much harder to do with callbacks, which often ends 
//up with a messy "pyramid of doom" (also known as callback hell).

//Promise callbacks are always called in the strict order they 
//are placed in the event queue.

//Error handling is much better — all errors are handled by a single 
//.catch() block at the end of the block, rather than being individually 
//handled in each level of the "pyramid"

console.log('Starting');

let image;

//Because fetch returns promise and promise is async operation it is put on 
//event loop so promise will start executing after main thread has finished
fetch('coffee.jpg').then((response) => {
    console.log('It worked :)')
    return response.blob();
}).then((myBlob) => {
    let objectURL = URL.createObjectURL(myBlob);
    image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}).catch((error) => {
    console.log('There has been a problem with your fetch operation: ' + error.message);
});

console.log('All done!');