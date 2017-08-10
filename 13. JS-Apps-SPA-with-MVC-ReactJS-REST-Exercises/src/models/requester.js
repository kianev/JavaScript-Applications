import $ from 'jquery';

    const appID = "kid_r1J5mAdwb";
    const baseURL = "https://baas.kinvey.com/";
    const appSecret = "ead4ca278c7948d4a1da719cbf2a4de9";

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


export {get, post, update};



