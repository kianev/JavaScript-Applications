class WomanController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    getWoman(id) {
        let _self = this;

        this.model.getWoman(id).then(
            function (successData) {
                _self.view.viewWoman(successData);
            }).catch(
            function (errorData) {
                console.log(errorData);
            }
        );
    }

    getWomen() {
        let _self = this;

        this.model.getWomen().then(
            function (successData) {
                _self.view.listWomen(successData);
            }).catch(
            function (errorData) {
                console.log(errorData);
            }
        );
    }

    createWoman(data) {
        this.model.postWoman(data).then(
            function (successData) {
                console.log("success");
            }
        ).catch(
            function (errorData) {
                console.log(errorData);
            }
        )
    }
}
