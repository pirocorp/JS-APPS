//Promise.all() static method. This takes an array of promises as an 
//input parameter and returns a new Promise object that will fulfill 
//only if and when all promises in the array fulfill.
Promise.all([a, b, c])
    //If they all fulfill, the chained .then() block's executor function 
    //will be passed an array containing all those results as a parameter.
    .then(values => {
  
    })
    //If any of the promises passed to Promise.all() reject, 
    //the whole block will reject.
    .catch(reason => {

    });