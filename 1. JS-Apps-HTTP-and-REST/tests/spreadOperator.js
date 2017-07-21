
/*let max = function () {
    let result = arguments[0];
    for (let i = 0; i < arguments.length; i++) {
        if(result < arguments[i]){
            result = arguments[i];
        }
    }
    return result;
};

console.log(max(1,2));
console.log(max(4,2));
console.log(max(4,7,2));
console.log(max(4,7,2,20,100));*/

//ES6 better code
let max1 = function (...values) {
        return values.reduce((a, b) => a > b ? a : b);
};

console.log(max1(1,2));
console.log(max1(4,2));
console.log(max1(4,7,2));
console.log(max1(4,7,2,20,100));