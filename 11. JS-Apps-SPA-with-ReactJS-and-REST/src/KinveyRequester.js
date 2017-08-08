import $ from 'jquery';

let KinveyRequest = (function () {
    const appID = "kid_rJ6hB_o8W";
    const baseURL = "https://baas.kinvey.com/";
    const appSecret = "9ce29a6fa1b548dcbbf595add542a67f";
    const appAuthHeaders = {
        'Authorization': "Basic " +
        btoa(appID + ":" + appSecret),
    };

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken')
        };
    }

    function loginUser(username, password) {
       return $.ajax({
            method: "POST",
            url: baseURL + "user/" + appID + "/login",
            headers: appAuthHeaders,
            contentType: "application/json",
            data: JSON.stringify({username, password})
        })
    }

    function registerUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseURL + "user/" + appID + "/",
            headers: appAuthHeaders,
            contentType: "application/json",
            data: JSON.stringify({username, password})
        })
    }

    function loadBooks() {
        return $.ajax({
            method: "GET",
            url: baseURL + "appdata/" + appID + "/books",
            headers: getKinveyUserAuthHeaders()
        })
    }

    function createBook(title,author,description) {
        return $.ajax({
            method: "POST",
            url: baseURL + "appdata/" + appID + "/books",
            headers: getKinveyUserAuthHeaders(),
            data: {title:title,author:author,description:description}
        });
    }

    function findBookById(bookId) {
        return $.ajax({
            method: "GET",
            url: baseURL + "appdata/" + appID + "/books/" + bookId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function editBook(bookId, title, author, description) {
        return $.ajax({
            method: "PUT",
            url: baseURL + "appdata/" + appID + "/books/" + bookId,
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, description }
        });
    }

    function deleteBook(bookId) {
        return $.ajax({
            method: "DELETE",
            url: baseURL + "appdata/" + appID + "/books/" + bookId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    return{
        loginUser,
        registerUser,
        loadBooks,
        createBook,
        findBookById,
        editBook,
        deleteBook
    }
})();

export default KinveyRequest;
