const gods = ['Apollo', 'Artemis', 'Ares', 'Zeus'];

//Note that not all callbacks are async — some run synchronously
gods.forEach(function (eachName, index) {
    console.log(index + '. ' + eachName);
});