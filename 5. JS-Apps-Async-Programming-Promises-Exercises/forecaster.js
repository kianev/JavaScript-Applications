function attachEvents() {
    $("#submit").click(getLocation);

    function getLocation(){
        let town = $("#location").val();
        $("#forecast").css("display", "inline");
        $.get("https://judgetests.firebaseio.com/locations.json")
            .then(getLocationDetails)
            .catch(displayError);

        function getLocationDetails(locations) {
            for (let location of locations) {
                if(location.name === town){
                    let townCode = location.code;

                    let todayForecast = $.get("https://judgetests.firebaseio.com/forecast/today/" + townCode + ".json");
                    let threeDayForecast = $.get("https://judgetests.firebaseio.com/forecast/upcoming/" + townCode + ".json");

                    Promise.all([todayForecast, threeDayForecast])
                        .then(displayForecast)
                        .catch(displayError);

                    function displayForecast([today, threeDay]){
                        $(".symbol").remove();
                        $(".upcoming").remove();
                        $(".forecast-data").remove();

                        let symbols = {
                            ['Sunny']: "&#x2600;",
                            ['Partly sunny']: "&#x26C5;",
                            ['Overcast']: "&#x2601;",
                            ['Rain']: "&#x2614;",
                            ['Degrees']: "&#176;"
                        };

                        $('#current')
                            .append($('<span>').addClass("condition symbol").html(symbols[today.forecast.condition]))
                            .append($('<span>').addClass("condition")
                                .append($('<span>').addClass("forecast-data").text(today.name))
                                .append($('<span>').addClass("forecast-data").html(`${today.forecast.low}${symbols.Degrees}/${today.forecast.high}${symbols.Degrees}`))
                                .append($('<span>').addClass("forecast-data").text(today.forecast.condition))
                            );

                        for (let forecast of threeDay.forecast){
                            $('#upcoming')
                                .append($('<span>').addClass("upcoming")
                                    .append($('<span>').addClass("symbol").html(symbols[forecast.condition]))
                                    .append($('<span>').addClass("forecast-data").html(`${forecast.low}${symbols.Degrees}/${forecast.high}${symbols.Degrees}`))
                                    .append($('<span>').addClass("forecast-data").text(forecast.condition))
                                );
                        }

                        //$('#forecast').css("display", "block");
                    }
                }
            }
        }

        function displayError(err) {
            $("#current .label").text("Error");

        }
    }
}
