const numbers = [1, 2, 3, 4, 5, 6];
let result = 0;
for (let number of numbers) {
    if(number % 2 === 0){
        result += number * 2;
    }
}

console.log(result);

console.log(numbers.filter(e => e % 2 === 0)
                    .map(e =>  e * 2)
                    .reduce((total, e) => total + e));
