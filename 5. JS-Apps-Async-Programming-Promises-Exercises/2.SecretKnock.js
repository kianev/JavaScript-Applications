let appID = "kid_BJXTsSi-e";
let appSecret = "447b8e7046f048039d95610c1b039390";

let token = "Basic " + btoa("guest:guest");
let query = "Knock Knock.";
let baseURL = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock";
let requestURL = baseURL + "?query=" + query;
console.log(query);

$.ajax({
    method: "GET",
    url: requestURL,
    headers: {
        'Authorization':token,
        'Content-Type':'application/json'
    },
    success: function (success) {
        console.log(success.answer)
        console.log(success.message)

        $.ajax({
            method: "GET",
            url: baseURL + "?query=" + success.message,
            headers: {
                'Authorization':token,
                'Content-Type':'application/json'
            },
            success: function (success2) {
                console.log(success2.answer)
                console.log(success2.message)

                $.ajax({
                    method: "GET",
                    url: baseURL + "?query=" + success2.message,
                    headers: {
                        'Authorization':token,
                        'Content-Type':'application/json'
                    },
                    success: function (success3) {
                        console.log(success3.answer)

                    },
                    error: function (error3) {
                        console.log(error3);
                    }
                })
            },
            error: function (error2) {
                console.log(error2)
            }
        })
    },
    error: function (error) {
        console.log(error);
    }
});

