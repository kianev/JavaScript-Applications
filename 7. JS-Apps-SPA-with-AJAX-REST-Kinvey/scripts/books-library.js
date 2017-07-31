function startApp() {
    sessionStorage.clear();

    showHideMenuLinks();

    showView('viewHome');

    // Bind the navigation menu links
    $("#linkHome").click(showHomeView);
    $("#linkLogin").click(showLoginView);
    $("#linkRegister").click(showRegisterView);
    $("#linkListBooks").click(listBooks);
    $("#linkCreateBook").click(showCreateBookView);
    $("#linkLogout").click(logoutUser);

    // Bind the form submit buttons
    $("#formLogin").submit(loginUser);
    $("#formRegister").submit(registerUser);
    $("#buttonCreateBook").click(createBook);
    $("#buttonEditBook").click(editBook);

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

    const appID = "kid_rJ6hB_o8W";
    const baseURL = "https://baas.kinvey.com/";
    const appSecret = "9ce29a6fa1b548dcbbf595add542a67f";
    const appAuthHeaders = {
        'Authorization': "Basic " +
        btoa(appID + ":" + appSecret),
    };


    function showHideMenuLinks() {
        $("#linkHome").show();
        if (sessionStorage.getItem("authToken")) {
            // We have logged in user
            $("#linkLogin").hide();
            $("#linkRegister").hide();
            $("#linkListBooks").show();
            $("#linkCreateBook").show();
            $("#linkLogout").show();
        } else {
            // No logged in user
            $("#linkLogin").show();
            $("#linkRegister").show();
            $("#linkListBooks").hide();
            $("#linkCreateBook").hide();
            $("#linkLogout").hide();
        }
    }

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showHomeView() {
        showView("viewHome")
    }

    function showLoginView() {
        showView("viewLogin");
        $('#formLogin').trigger('reset');
    }

    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }

    function listBooks() {
        $('#books').empty();
        showView('viewBooks');

        $.ajax({
            method: "GET",
            url: baseURL + "appdata/" + appID + "/books",
            headers: getKinveyUserAuthHeaders(),
            success: loadBooksSuccess,
            error: handleAjaxError
        });

        function loadBooksSuccess(books) {
            let table = $(`<table>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                             </table>`);

            for (let book of books) {
                let tr = $("<tr>");
                displayTableRow(tr, book);
                tr.appendTo(table);
            }

            $("#books").append(table);
        }

        function displayTableRow(tr, book) {

            let links = [];
            if (book._acl.creator == sessionStorage['userId']) {
                let deleteLink = $('<a href="#">[Delete]</a>')
                    .click(deleteBook.bind(this, book));
                let editLink = $('<a href="#">[Edit]</a>')
                    .click(loadBookForEdit.bind(this, book));
                links = [deleteLink, ' ', editLink];
            }

            tr.append(
                $("<td>").text(book.title),
                $("<td>").text(book.author),
                $("<td>").text(book.description),
                $("<td>").append(links)
            );
        }
    }

    function showCreateBookView() {
        $('#formCreateBook').trigger('reset');
        showView('viewCreateBook');
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
            //listBooks();
            showInfo('Login successful.');
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
            listBooks();
            showInfo('User registration successful.');
        }
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        listBooks();
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);

    }

    function createBook() {
        let bookData = {
            title: $('#formCreateBook input[name=title]').val(),
            author: $('#formCreateBook input[name=author]').val(),
            description: $('#formCreateBook textarea[name=descr]').val()
        };

        $.ajax({
            method: "POST",
            url: baseURL + "appdata/" + appID + "/books",
            headers: getKinveyUserAuthHeaders(),
            data: bookData,
            success: createBookSuccess,
            error: handleAjaxError
        });

        function createBookSuccess(response) {
            listBooks();
            showInfo('Book created.');
        }
    }

    function editBook() {
        let bookData = {
            title: $('#formEditBook input[name=title]').val(),
            author: $('#formEditBook input[name=author]').val(),
            description: $('#formEditBook textarea[name=descr]').val()
        };

        $.ajax({
            method: "PUT",
            url: baseURL + "appdata/" + appID + "/books/" + $('#formEditBook input[name=id]').val(),
            headers: getKinveyUserAuthHeaders(),
            data: bookData,
            success: editBookSuccess,
            error: handleAjaxError
        });

        function editBookSuccess(response) {
            listBooks();
            showInfo('Book edited.');
        }
    }

    function deleteBook(book) {
        $.ajax({
            method: "DELETE",
            url: baseURL + "appdata/" + appID + "/books/" + book._id,
            headers: getKinveyUserAuthHeaders(),
            success: deleteBookSuccess,
            error: handleAjaxError
        });
        function deleteBookSuccess(response) {
            listBooks();
            showInfo('Book deleted.');
        }

    }

    function loadBookForEdit(book) {
        $.ajax({
            method: "GET",
            url: baseURL + "appdata/" + appID + "/books/" + book._id,
            headers: getKinveyUserAuthHeaders(),
            success: loadBookForEditSuccess,
            error: handleAjaxError
        });

        function loadBookForEditSuccess(book) {
            $('#formEditBook input[name=id]').val(book._id);
            $('#formEditBook input[name=title]').val(book.title);
            $('#formEditBook input[name=author]')
                .val(book.author);
            $('#formEditBook textarea[name=descr]')
                .val(book.description);
            showView('viewEditBook');
        }

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
}
