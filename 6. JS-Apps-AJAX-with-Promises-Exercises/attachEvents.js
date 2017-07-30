function attachEvents() {
    const appID = "kid_r12st5F8-";
    const baseURL = "https://baas.kinvey.com/appdata/kid_r12st5F8-/players/";
    const username = "guest";
    const password = "guest";

    let authHeaders = {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json"
    };

    $("#addPlayer").click(addPlayer);

    loadPlayers();

    function loadPlayers() {
        $.get({
            url: baseURL,
            headers: authHeaders
        }).then(displayPlayers);

        $("#players").empty();

        function displayPlayers(players) {
            for (let player of players) {

                $("#players").append(
                    $("<div>").addClass("player").attr("data-id", player._id)
                        .append($("<div>").addClass("row")
                            .append($("<label>").text("Name: "))
                            .append($("<label>").text(player.name)))
                        .append($("<div>").addClass("row")
                            .append($("<label>").text("Money: "))
                            .append($("<label>").text(player.money)))
                        .append($("<div>").addClass("row")
                            .append($("<label>").text("Bullets: "))
                            .append($("<label>").text(player.bullets)))
                        .append($("<button>").addClass("play").text("Play").click(function(){prepareCanvas(player)}))
                        .append($("<button>").addClass("delete").text("Delete").click(deletePlayer))
                );
            }
        }
    }

    function prepareCanvas(player) {
        $("#save").trigger("click");

        $("#canvas").css("display", "block");
        $("#save").css("display", "inline-block");
        $("#reload").css("display", "inline-block");
        loadCanvas(player);
    }

    function addPlayer() {
        let newPlayer = $("#addName").val();

        $.ajax({
            method: "POST",
            url: baseURL,
            headers: authHeaders,
            data: JSON.stringify({name: newPlayer, money: 500, bullets: 6})
        }).then(loadPlayers);
        $("#addName").val("");
    }

    function deletePlayer() {
        let playerID = $(this).parent().attr("data-id");

        $.ajax({
            method: "DELETE",
            url: baseURL + playerID,
            headers: authHeaders
        }).then(loadPlayers);
    }

}
