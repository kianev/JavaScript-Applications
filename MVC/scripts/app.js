sessionStorage.setItem("authToken", btoa("guest:guest"));

(function () {
    let router = Sammy(function () {
        let baseURL = "https://baas.kinvey.com/";
        let appkey = "kid_SyRwaCIPZ";
        let appSecret = "b22a71f49eb6471f8757f3eabe509a71";

        let reqiester = new Requester();
        let authentificationService = new AuthentificationService(appkey, appSecret);

        let womanView = new WomanView();
        let womanModel = new WomanModel(baseURL, appkey, reqiester, authentificationService);
        let womanControler = new WomanController(womanModel, womanView);

        this.get('#/home', function () {
            let _self = this;

            $(".wrapper").empty();
            $(".wrapper").append("<button id='list-women'>List all women</button>");

            $("#list-women").click(function () {
                _self.redirect('#/list');
            });

        });

        this.get('#/list', function () {
            womanControler.getWomen();
        });

        this.get('#/woman/:id', function () {
            womanControler.getWoman(this.params['id']);
        });


        this.bind('viewDetailed', function (event, data) {
            this.redirect('#/woman/' + data.id)
        })
    });

    router.run('#/home')
})();