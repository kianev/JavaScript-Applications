let _ = require('lodash');

let findLast = _.findLast([1, 2, 3, 4], (n) => {
    return n % 2 === 0
});

let random = _.random(1.1520, 1.1690);

let objA = {"name": "Pesho", "car": "ford", "age": 23};
objA = _.omit(objA, ['car', 'age']);

let objA1 = { "name": "Stamat" };
let objB = _.cloneDeep(objA1);

console.log(objB);
