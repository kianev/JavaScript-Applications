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

    return{
        loginUser,
        registerUser,
        loadBooks
    }
})();

export default KinveyRequest;
