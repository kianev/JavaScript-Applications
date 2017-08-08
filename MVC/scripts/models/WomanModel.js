class WomanModel {
    constructor(baseURL, appKey, requester, authorizationService) {
        this._baseURL = baseURL;
        this._appKey = appKey;
        this._requester = requester;
        this._authorizationService = authorizationService;
    }

    getWoman(id) {
        let requestURL = this._baseURL + "appdata/" + this._appKey + "/women/" + id;
        let requestHeaders = this._authorizationService.getHeaders();

        return this._requester.get(requestURL, requestHeaders);
    }

    getWomen() {
        let requestURL = this._baseURL + "appdata/" + this._appKey + "/women";
        let requestHeaders = this._authorizationService.getHeaders();

        return this._requester.get(requestURL, requestHeaders);
    }

    postWoman(data) {
        let requestURL = this._baseURL + "appdata/" + this._appKey + "/women";
        let requestHeaders = this._authorizationService.getHeaders();

        return this._requester.post(requestURL, requestHeaders, data);
    }
}
