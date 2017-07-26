const baseURL = "https://baas.kinvey.com/appdata/kid_r1Dqv3rIb/biggestCatches/";
const token = "Basic " + btoa("guest:guest");


function attachEvents() {
    $(".load").click(loadCatches);
    $(".add").click(addCatch);

    function loadCatches() {
        let loadRequest = {
            method: "GET",
            url: baseURL,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };

        $.ajax(loadRequest)
            .then(displayCatches)
            .catch(displayError);

        function displayCatches(catches) {
            $("#catches").empty();

            for (let catch1 of catches) {
                $("#catches")
                    .append($("<div>").addClass("catch").attr("data-id", catch1._id)
                    .append($("<label>").text("Angler"))
                    .append($("<input>").attr("type", "text").addClass("angler").val(catch1.angler))
                    .append($("<label>").text("Weight"))
                    .append($("<input>").attr("type", "number").addClass("weight").val(catch1.weight))
                    .append($("<label>").text("Species"))
                    .append($("<input>").attr("type", "text").addClass("species").val(catch1.species))
                    .append($("<label>").text("Location"))
                    .append($("<input>").attr("type", "text").addClass("location").val(catch1.location))
                    .append($("<label>").text("Bait"))
                    .append($("<input>").attr("type", "text").addClass("bait").val(catch1.bait))
                    .append($("<label>").text("Capture Time"))
                    .append($("<input>").attr("type", "number").addClass("captureTime").val(catch1.captureTime))
                    .append($("<button>").addClass("update").text("Update").click(updateCatch))
                    .append($("<button>").addClass("delete").text("Delete").click(deleteCatch))
                );
            }
        }
    }

    function addCatch() {
        let inputs = $(this).parent().find("input");

        let addRequest = {
            method: "POST",
            url: baseURL,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({"angler": $(inputs[0]).val(), "weight": $(inputs[1]).val(),
                "species":$(inputs[2]).val(), "location":$(inputs[3]).val(), "bait":$(inputs[4]).val(),
                "captureTime":$(inputs[5]).val()})
        };

        $.ajax(addRequest)
            .then(loadCatches)
            .catch(displayError);

        for (let input of inputs) {
            $("input").val("");
        }
    }

    function updateCatch() {
        let inputs = $(this).parent().find("input");
        let catchId = $(this).parent().attr("data-id");

        let addRequest = {
            method: "PUT",
            url: baseURL + catchId,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({"angler": $(inputs[0]).val(), "weight": $(inputs[1]).val(),
                "species":$(inputs[2]).val(), "location":$(inputs[3]).val(), "bait":$(inputs[4]).val(),
                "captureTime":$(inputs[5]).val()})
        };

        $.ajax(addRequest)
            .then(loadCatches)
            .catch(displayError);
    }

    function deleteCatch() {
        let catchId = $(this).parent().attr("data-id");

        let addRequest = {
            method: "DELETE",
            url: baseURL + catchId,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };

        $.ajax(addRequest)
            .then(loadCatches)
            .catch(displayError);
    }

    function displayError(error) {
      $("#catches").text("Error");
    }
}

