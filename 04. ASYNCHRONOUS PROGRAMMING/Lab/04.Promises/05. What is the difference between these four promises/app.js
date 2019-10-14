//Clarification: for these examples, I’m assuming that both doSomething() 
//and doSomethingElse() return promises, and that those promises represent 
//something done outside of the JavaScript event loop 
//(e.g. IndexedDB, network, setTimeout), which is why they’re 
//shown as being concurrent when appropriate.
doSomething()
    .then(function () {
        return doSomethingElse();
    })
    .then(finalHandler);
// Answer:
  
// doSomething
// |-----------------|
//                   doSomethingElse(undefined)
//                   |------------------|
//                                      finalHandler(resultOfDoSomethingElse)
//                                      |------------------|

doSomething()
    .then(function () {
        doSomethingElse();
    })
    .then(finalHandler);
// Answer: 
// doSomething
// |-----------------|
//                   doSomethingElse(undefined)
//                   |------------------|
//                   finalHandler(undefined)
//                   |------------------| 
doSomething()
    .then(doSomethingElse())
    .then(finalHandler);
// Answer:
 
// doSomething
// |-----------------|
// doSomethingElse(undefined)
// |---------------------------------|
//                   finalHandler(resultOfDoSomething)
//                   |------------------|

doSomething()
    .then(doSomethingElse)
    .then(finalHandler);
// Answer:
// 
// doSomething
// |-----------------|
//                   doSomethingElse(resultOfDoSomething)
//                   |------------------|
//                                      finalHandler(resultOfDoSomethingElse)
//                                      |------------------|