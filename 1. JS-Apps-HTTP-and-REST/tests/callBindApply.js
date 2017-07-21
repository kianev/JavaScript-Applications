let greet = function (name) {
    console.log(this.toUpperCase() + " " + name);
};

//greet.call("Hello", "Jane");
//greet.call("Howdy", "Jane");

let greet1 = function (name1, name2) {
    console.log(this.toUpperCase() + " " + name1 + " " + name2);
};

let names = ["Jane", "John"];

greet1.call("hello", names[0], names[1]);

greet1.call("Hello", ...names);
greet1.apply("hello", names);


let greet2 = function (name) {
    console.log("Hello " + name);
};

setTimeout(function () {
    greet2("Jerry");
}, 1000);

setTimeout(greet2.bind(null, "Jerry"), 1000);