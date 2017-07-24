console.log("Before promise");

new Promise(function (resolve, reject) {
    console.log("Promise started");
    setTimeout(function () {
        resolve("Promise resolved")
    }, 1000)
})

.then(function (result) {
    console.log("Then returned: " + result)
});

console.log("After promise");
