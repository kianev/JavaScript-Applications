function attachEvents() {
    const appID = "kid_rJrLPPvUW";
    const baseURL = "https://baas.kinvey.com/appdata/" + appID;
    const username = "guest";
    const password = "guest";
    let authHeaders = {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json"
    };

    $.get({
        url: baseURL + "/countries/",
        headers: authHeaders
    }).then(loadCountries)
        .catch(displayError);

    function loadCountries(countries) {
        for (let count of countries) {

           let option = $("<option>")
               .text(count.country)
               .val(count._id);

            $("#sectionCountries").append(option);
        }
    }

    $("#btnListTowns").click(loadTowns);

    function loadTowns() {
            let selectedCountryID = $("#sectionCountries").val();
            $("#sectionTowns").empty();
            $.get({
                url: baseURL + `/towns/?query={"country_id":"${selectedCountryID}"}`,
                headers: authHeaders
            }).then(displayTowns)
                .catch(displayError);


            function displayTowns(towns) {
                for (let town of towns) {
                    let option = $("<option>")
                        .text(town.town)
                        .val(town._id);
                    $("#sectionTowns").append(option);
                }
            }
        }

    $("#addCountry").click(addCountry);

    function addCountry() {
        $(".add").css("display", "block");
        $("#btnAddCountry").click(addCountryToDB);

        function addCountryToDB() {
            let newCountry = $("#newCountry").val();

            $.ajax({
                method: "POST",
                url:  baseURL + "/countries/",
                headers: authHeaders,
                data: JSON.stringify({country: newCountry})
            }).then(loadCountries)
                .catch(displayError);
        }
    }

    $("#btnDeleteCountry").click(deleteCountry);

    function deleteCountry() {
        let selectedCountryID = $("#sectionCountries").val();
        $.ajax({
            method: "DELETE",
            url:  baseURL + "/countries/" + selectedCountryID,
            headers: authHeaders,
        }).then(loadCountries)
            .catch(displayError);
    }

    $("#btnEditCountry").click(editCountry);

    function editCountry() {
        $("#editCountry").css("display", "block");
        let selectedCountryID = $("#sectionCountries").val();

        $("#editCoun").click(editCountryToDB);

        function editCountryToDB() {
            let editCountry = $("#inputEditCountry").val();

            $.ajax({
                method: "PUT",
                url:  baseURL + "/countries/" + selectedCountryID,
                headers: authHeaders,
                data: JSON.stringify({country: editCountry})
            }).then(loadCountries)
                .catch(displayError);
        }
    }

    $("#addTown").click(addTown);

    function addTown() {
        $(".addTown").css("display", "block");
        let selectedCountryID = $("#sectionCountries").val();
        console.log(selectedCountryID);

        $("#btnAddTown").click(addTownToDB);

        function addTownToDB() {
          let newTown = $("#newTown").val();
            $.ajax({
                method: "POST",
                url:  baseURL + "/towns/",
                headers: authHeaders,
                data: JSON.stringify({country_id: selectedCountryID, town: newTown})
            }).then(loadCountries)
                .catch(displayError);
        }

    }

    $("#btnDeleteTown").click(deleteTown);

    function deleteTown() {
        let selectedTownID = $("#sectionTowns").val();

        $.ajax({
            method: "DELETE",
            url:  baseURL + "/towns/" + selectedTownID,
            headers: authHeaders,
        }).then(loadCountries)
            .catch(displayError);
    }

    $("#btnEditTown").click(editTown);

    function editTown() {
        $("#editTown").css("display", "block");
        let selectedTownID = $("#sectionTowns").val();
        let selectedCountryID = $("#sectionCountries").val();
        console.log(selectedCountryID);

        $("#editTownn").click(editTownToDB);

        function editTownToDB() {
            let editTown = $("#inputEditTownName").val();

            $.ajax({
                method: "PUT",
                url:  baseURL + "/towns/" + selectedTownID,
                headers: authHeaders,
                data: JSON.stringify({country_id: selectedCountryID, town: editTown})
            }).then(loadCountries)
                .catch(displayError);
        }
    }

    function displayError(error) {
        console.log(error)
    }

}
