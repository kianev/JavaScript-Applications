import $ from 'jquery';

const appID = "kid_rJTGV4Jd-";
const baseURL = "https://baas.kinvey.com/";
const appSecret = "9d8b04f11f46498484eb6b1d157d8896";

function makeHeader(auth) {
    let header = {"Authorization": ''};
    switch (auth){
        case "basic":
            header["Authorization"] = "Basic " + btoa(appID + ":" + appSecret);
            break;
        case "kinvey":
            header["Authorization"] = "Kinvey " + sessionStorage.getItem('authToken');
            break;
    }
    return header;
}

function get(module, url, auth) {
    let hostURL = baseURL + module + "/" + appID + "/" + url;
    let header = makeHeader(auth);

    return $.ajax({
        method: "GET",
        url: hostURL,
        headers: header
    });
}

function post(module, url, auth, data) {
    let hostURL = baseURL + module + "/" + appID + "/" + url;
    let header = makeHeader(auth);

    let request = {
        method: "POST",
        url: hostURL,
        headers: header,
    };

    if(data){
        request.data = data;
    }

    return $.ajax(request);
}

function update(module, url, data, auth) {
    let hostURL = baseURL + module + "/" + appID + "/" + url;
    let header = makeHeader(auth);

    let request = {
        method: "PUT",
        url: hostURL,
        headers: header,
        data: data
    };

    return $.ajax(request);
}

function deleteItem(module, url, itemId, auth) {
    const hostURL = baseURL + module + "/" + appID + "/" + url + "/" + itemId;
    const header = makeHeader(auth);

    return $.ajax({
        method: "DELETE",
        url: hostURL,
        headers: header
    });
}


export {get, post, update, deleteItem};
