function attachEvents() {
    const baseURL = "https://baas.kinvey.com/";
    const appID = "kid_BJ_Ke8hZg";
    const username = "guest";
    const password = "pass";
    let authHeaders = {
        "Authorization": "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json"
    };

    $("#getVenues").click(loadVenues);

    function loadVenues() {
        let venueDate = $("#venueDate").val();

        let request = {
            method: "POST",
            url: baseURL + "rpc/" + appID + "/custom/calendar?query=" + venueDate,
            headers: authHeaders
        };

        $.ajax(request)
            .then(function (venueIDs) {
                for (let venue of venueIDs) {

                    let requestV = {
                        method: "GET",
                        url: baseURL + "appdata/" + appID + "/venues/" + venue,
                        headers: authHeaders
                    };

                    $.ajax(requestV)
                        .then(displayVenues)
                }
            })
    }

    function displayVenues(venue) {
        $("#venue-info")
            .append($("<div>").addClass("venue").attr("id",venue._id)
                .append($("<span>").addClass("venue-name").text(`${venue.name} `)
                    .append($("<input>").addClass("info").attr("type","button").val("more info").click(showInfo)))
                .append($("<div>").addClass("venue-details").css("display","none")
                    .append($("<table>")
                        .append($("<tr>")
                            .append($("<th>").text("Ticket Price"))
                            .append($("<th>").text("Quantity"))
                            .append($("<th>")))
                        .append($("<tr>")
                            .append($("<td>").addClass("venue-price").text(`${venue.price} lv.`).val(venue.price))
                            .append($("<td>")
                                .append($("<select>").addClass("quantity")
                                    .append($("<option>").val("1").text("1"))
                                    .append($("<option>").val("2").text("2"))
                                    .append($("<option>").val("3").text("3"))
                                    .append($("<option>").val("4").text("4"))
                                    .append($("<option>").val("5").text("5"))))
                            .append($('<input>').addClass("purchase").attr("type", "button").val("Purchase").click(purchase))))
                    .append($("<span>").addClass("head").text("Venue description:"))
                    .append($("<p>").addClass("description").text(`${venue.description}`))
                    .append($("<p>").addClass("description").text(`Starting time:  ${venue.startingHour}`))));

        function showInfo() {
            $('.venue-details').hide();
            $(this).parent().parent().find('.venue-details').show();
        }

        function purchase() {
            let id = $(this).parent().parent().parent().parent().attr('id');
            let name = $(this).parent().parent().parent().parent().parent().find(".venue-name").text();
            let qty = Number($(this).parent().parent().find(".quantity").val());
            let price = Number($(this).parent().parent().find(".venue-price").val());

            $('#venue-info').html(`<span class="head">Confirm purchase</span>
<div class="purchase-info">
  <span>${name}</span>
  <span>${qty} x ${price}</span>
  <span>Total: ${qty * price} lv</span>
  <input type="button" value="Confirm" id="btnConfirm">
</div>
`);

            $("#btnConfirm").click(function () {
                let request = {
                    method: "POST",
                    url: baseURL + "rpc/" + appID + "/custom/purchase?venue=" + id + "&qty=" + qty,
                    headers: authHeaders
                };

                $.ajax(request).then(function (data) {
                    $("#venue-info").html("You may print this page as your ticket" + data.html);
                })
            })
        }
    }

}
