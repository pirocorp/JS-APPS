class Person {
    constructor(name) {
        this.name = name;
    };

    great() {
        return `Hello, my name is ${this.name}`;
    };

    print(selector, message) {
        document.querySelector(selector).innerHTML = message;
    };
};

module.exports = Person;