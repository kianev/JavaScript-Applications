class WomanView{
    constructor(){
    }

    viewWoman(data){
        //code for mustache.js
        $(".wrapper").empty();
        $.get('templates/woman-template.html', function (template) {
            let renderedHTML = Mustache.render(template, data);

            $('.wrapper').html(renderedHTML);
        })

      //code for normal MVC
       /* let womanDiv = $("<div class='woman-detailer'></div>");
        womanDiv.append("<div>Name: " + data.name + "</div>");
        womanDiv.append("<div>Age: " + data.age + "</div>");
        womanDiv.append("<div>Weight: " + data.weigth + "</div>");
        womanDiv.append("<div>Mantalitat: " + data.mantalitat + "</div>");
        $(".wrapper").empty();
        $(".wrapper").append(womanDiv);*/
    }

    listWomen(data){
        //code for mustache.js
        $(".wrapper").empty();

        $.get('templates/list-template.html', function (template) {
            let renderedHTML = Mustache.render(template, {women:data});

            $('.wrapper').html(renderedHTML);

            Sammy(function () {
                let _self = this;

                $(".detailed-button").click(function (ev) {
                    _self.trigger('viewDetailed', { id: $(this).attr('id')})
                });
            });
        })



        //code for normal MVC
        /*  $(".wrapper").empty();
         data.forEach(
           function (entity) {
                let womanDiv = $("<div class='woman'></div>");
                womanDiv.append("<div>" + entity.name + "</div>");
                womanDiv.append("<div>" + entity.age + "</div>");
                womanDiv.append("<button id='" + entity._id + "' class='detailed-button'>View Details</button>");
                $(".wrapper").append(womanDiv);

           }
       );

        Sammy(function () {
            let _self = this;

            $(".detailed-button").click(function (ev) {
                _self.trigger('viewDetailed', { id: $(this).attr('id')})
            });
        });*/
}
}
