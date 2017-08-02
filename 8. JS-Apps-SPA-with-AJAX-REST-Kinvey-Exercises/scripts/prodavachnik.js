function startApp() {

    const appID = "kid_By7gzcpUW";
    const baseURL = "https://baas.kinvey.com/";
    const appSecret = "6195cebc681644bdb9574d305e5948a2";
    const appAuthHeaders = {
        'Authorization': "Basic " +
        btoa(appID + ":" + appSecret),
    };

    sessionStorage.clear();
    showHideMenuLinks();
    showView("viewHome");

    // Bind the navigation menu links
    $("#linkHome").click(showHomeView);
    $("#linkLogin").click(showLoginView);
    $("#linkRegister").click(showRegisterView);
    $("#linkListAds").click(listAds);
    $("#linkCreateAd").click(showCreateAdView);
    $("#linkLogout").click(logoutUser);

    // Bind the form submit buttons
    $("#formLogin").submit(loginUser);
    $("#formRegister").submit(registerUser);
    $("#buttonCreateAd").click(createAd);
    $("#buttonEditAd").click(editAd);

    // Bind the info / error boxes: hide on click
    $("#infoBox, #errorBox").click(function () {
        $(this).fadeOut();
    });

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });


    function showHideMenuLinks() {
        $("#linkHome").show();
        if(sessionStorage.getItem("authToken")){
            // We have logged in user
            $("#linkLogin").hide();
            $("#linkRegister").hide();
            $("#linkListAds").show();
            $("#linkCreateAd").show();
            $("#linkLogout").show();
        }else{
            // No logged in user
            $("#linkLogin").show();
            $("#linkRegister").show();
            $("#linkListAds").hide();
            $("#linkCreateAd").hide();
            $("#linkLogout").hide();
        }
    }

    function showView(viewName) {
        // Hide all views and show the selected view only
        $("main > section").hide();
        $("#" + viewName).show();
    }

    function showHomeView() {
        showView("viewHome");
    }

    function showLoginView() {
        showView("viewLogin");
        $("#formLogin").trigger("reset");
    }

    function showRegisterView() {
        showView("viewRegister");
        $("#formRegister").trigger("reset");
    }

    function listAds() {
        $("#ads").empty();
        showView("viewAds");

        $.ajax({
            method: "GET",
            url: baseURL + "appdata/" + appID + "/ads",
            headers: getKinveyUserAuthHeaders(),
            success: loadAddsuccess,
            error: handleAjaxError
        });

        function loadAddsuccess(ads) {
            let table = $(`<table>
                                <tr>
                                   <th>Title</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Date Published</th>
                                     <th>Publisher</th>
                                    <th>Actions</th>
                                </tr>
                             </table>`);

            for (let ad of ads) {
                let tr = $("<tr>");
                displayTableRow(tr, ad);
                tr.appendTo(table);
            }

            $("#ads").append(table);
        }

        function displayTableRow(tr, ad) {
            let readMoreLink = $('<a href="#">[Read more]</a>')
                .click(displayAdInfo.bind(this, ad));
            let links = [readMoreLink];

            if (ad._acl.creator == sessionStorage["userId"]) {
                let deleteLink = $('<a href="#">[Delete]</a>')
                    .click(deleteAd.bind(this, ad));
                let editLink = $('<a href="#">[Edit]</a>')
                    .click(loadAdForEdit.bind(this, ad));
                links = [readMoreLink, ' ',deleteLink, ' ', editLink];
            }

            tr.append(
                $("<td>").text(ad.title),
                $("<td>").text(ad.description),
                $("<td>").text(ad.price),
                $("<td>").text(ad.date),
                $("<td>").text(ad.publisher),
                $("<td>").append(links)
            );
        }
    }

    function showCreateAdView() {
        $("#formCreateAd").trigger("reset");
        showView("viewCreateAd");
    }

    function createAd() {
        $.ajax({
            method: "GET",
            url:  baseURL + "user/" + appID + "/" + sessionStorage.getItem("userId"),
            headers: getKinveyUserAuthHeaders(),
            success: getPublisher,
            error: handleAjaxError
        });

        function getPublisher(data) {
            let publisher  = data.username;
            let addData = {
                title: $("#formCreateAd input[name=title]").val(),
                description: $("#formCreateAd textarea[name=description]").val(),
                date: $("#formCreateAd input[name=datePublished]").val(),
                price: $("#formCreateAd input[name=price]").val(),
                publisher: publisher,
                image: $("#formCreateAd input[name=image]").val()
            };

            $.ajax({
                method: "POST",
                url: baseURL + "appdata/" + appID + "/ads",
                headers: getKinveyUserAuthHeaders(),
                data: addData,
                success: createAdsuccess,
                error: handleAjaxError
            });
        }

        function createAdsuccess(response) {
            listAds();
            showInfo("Add Created!");
        }
    }

    function loadAdForEdit(ad) {
        $.ajax({
            method: "GET",
            url: baseURL + "appdata/" + appID + "/ads/" + ad._id,
            headers: getKinveyUserAuthHeaders(),
            success: loadAdForEditSuccess,
            error: handleAjaxError
        });

        function loadAdForEditSuccess(ad) {
            $("#formEditAd input[name=id]").val(ad._id);
            $("#formEditAd input[name=publisher]").val(ad.publisher);
            $("#formEditAd input[name=title]").val(ad.title);
            $("#formEditAd textarea[name=description]").val(ad.description);
            $("#formEditAd input[name=datePublished]").val(ad.date);
            $("#formEditAd input[name=price]").val(ad.price);
            $("#formEditAd input[name=image]").val(ad.image);
            showView("viewEditAd");
        }
    }

    function editAd() {
        let adData = {
            title: $("#formEditAd input[name=title]").val(),
            description: $("#formEditAd textarea[name=description]").val(),
            date: $("#formEditAd input[name=datePublished]").val(),
            price: $("#formEditAd input[name=price]").val(),
            publisher: $("#formEditAd input[name=publisher]").val(),
            image: $("#formEditAd input[name=image]").val()
        };

        $.ajax({
            method: "PUT",
            url: baseURL + "appdata/" + appID + "/ads/" + $("#formEditAd input[name=id]").val(),
            headers: getKinveyUserAuthHeaders(),
            data: adData,
            success: editAdsuccess,
            error: handleAjaxError
        });

        function editAdsuccess(response) {
            listAds();
            showInfo("Ad edited!");
        }

    }

    function deleteAd(ad) {
        $.ajax({
            method: "DELETE",
            url: baseURL + "appdata/" + appID + "/ads/" + ad._id,
            headers: getKinveyUserAuthHeaders(),
            success: deleteAdSuccess,
            error: handleAjaxError
        });

        function deleteAdSuccess() {
            listAds();
            showInfo("Add deleted!");
        }
    }

    function displayAdInfo(ad) {
        $.ajax({
            method: "GET",
            url: baseURL + "appdata/" + appID + "/ads/" + ad._id,
            headers: getKinveyUserAuthHeaders(),
            success: displayAdInfoSuccess,
            error: handleAjaxError
        });

        $("#viewAdDetails").empty();

        function displayAdInfoSuccess(advert) {
            let html = $("<div>");
            html.append(
                $("<img>").attr("src", advert.image).addClass("addImage"),
                $("<br>"),
                $("<label>").text("Title: "),
                $("<h2>").text(advert.title),
                $("<label>").text("Price: "),
                $("<div>").text(advert.price),
                $("<label>").text("Description: "),
                $("<p>").text(advert.description),
                $("<label>").text("Date Published: "),
                $("<div>").text(advert.date),
                $("<label>").text("Publisher: "),
                $("<div>").text(advert.publisher),
                $("<label>").text("Views: ")
            );

            html.appendTo($("#viewAdDetails"));
            showView("viewAdDetails");
        }
    }

    function loginUser(event) {
        event.preventDefault();

        let userData = {
            username: $("#formLogin input[name=username]").val(),
            password: $("#formLogin input[name=passwd]").val()
        };

            $.ajax({
                method: "POST",
                url: baseURL + "user/" + appID + "/login",
                headers: appAuthHeaders,
                contentType: "application/json",
                data: JSON.stringify(userData),
                success: loginUserSuccess,
                error: handleAjaxError
            });

            function loginUserSuccess(userInfo) {
                saveAuthInSession(userInfo);
                showHideMenuLinks();
                //listAds();
                showInfo("Login successful.");
            }
    }

    function registerUser(event) {
        event.preventDefault();

        let userData = {
            username: $("#formRegister input[name=username]").val(),
            password: $("#formRegister input[name=passwd]").val()
        };

        $.ajax({
            method: "POST",
            url: baseURL + "user/" + appID + "/",
            headers: appAuthHeaders,
            contentType: "application/json",
            data: JSON.stringify(userData),
            success: registerSuccess,
            error: handleAjaxError
        });

        function registerSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('User registration successful.');
        }
    }

    function logoutUser() {
        $.ajax({
            method: "POST",
            url: baseURL + "user/" + appID + "/_logout",
            headers: getKinveyUserAuthHeaders(),
            success: showInfo("Logout successful!"),
            error: handleAjaxError
        });

        sessionStorage.clear();
        $("#loggedInUser").text("");
        showView("viewHome");
        showHideMenuLinks();
        showInfo("Logout successful!")
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem("authToken", userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem("userId", userId);
        let username = userInfo.username;
        sessionStorage.setItem("username", username);
        $("#loggedInUser").text("Welcome, " + username + "!");

        listAds();
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " +
            sessionStorage.getItem('authToken'),
        };
    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
    }

}