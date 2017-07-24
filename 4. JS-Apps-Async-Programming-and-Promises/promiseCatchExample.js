console.log("Before promise");

new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject("Failed")
    }, 1000)
})
    .then(function (result) {console.log(result)})
    .catch(function (error) {console.log(error)});

console.log("After promise");

