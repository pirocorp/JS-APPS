//So the async keyword is added to functions to tell them to return a 
//promise rather than directly returning the value.
//Fetch + Promises
fetch('coffee.jpg')
    .then(response => response.blob())
    .then(myBlob => {
        let objectURL = URL.createObjectURL(myBlob);
        let image = document.createElement('img');
        image.src = objectURL;
        document.body.appendChild(image);
    })
    .catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
    });

//await only works inside async functions.

//The await keyword causes the JavaScript runtime to pause your code on 
//this line, allowing other code to execute in the meantime, 
//until the async function call has returned its result.

//Fetch + Async Await
async function myFetch2() {
    let response = await fetch('coffee.jpg');
    let myBlob = await response.blob();

    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}

myFetch2();

//Fetch + Async Await + Promises
async function myFetch3() {
    let response = await fetch('tea.jpg');
    return await response.blob();
}

//when we call the myFetch() function, it returns a promise, 
//so we can chain a .then() onto the end of it inside which we 
//handle displaying the blob onscreen.
myFetch3()
    .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        let image = document.createElement('img');
        image.src = objectURL;
        document.body.appendChild(image);
    });