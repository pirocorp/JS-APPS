/* Making webpack understand css as dependencies */
require('../styles.css');

const SampleMath = require('./math');
const Person = require('./person');

const p1 = new Person('John');

console.log(p1.great());

p1.print('body', p1.great())