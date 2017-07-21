class Car{
    constructor(year){
        this.year = year;
    }
}

let car1 = new Car(2017);

console.log(car1.year);

let fieldName = "year";
console.log(car1[fieldName]);
