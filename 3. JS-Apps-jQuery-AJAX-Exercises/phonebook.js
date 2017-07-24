function attachEvents() {
    let baseUrl = "https://phonebook2-1e8dd.firebaseio.com/phonebook";
    $("#btnLoad").click(loadContacts);
    $("#btnCreate").click(createContact);

    function loadContacts() {
        let requestContacts = {
            method: "GET",
            url: baseUrl + ".json",
            success: displayContacts,
            error: displayError
        };

        $.ajax(requestContacts);
            $("#phonebook").empty();

        function displayContacts(contacts) {
            let keys = Object.keys(contacts);
            for (let key of keys) {
                let contact = contacts[key];
                if(contact.person){
                    let contactInfo = contact.person + ": " + contact.phone;
                    let li = $("<li>").text(contactInfo);
                    $("#phonebook").append(li);
                    li.append("<a href='#'>[Delete]</a>").click(function () {
                        deleteContact(key);
                    });
                }
            }
        }
    }

    function createContact() {
        let person = $("#person").val();
        let phone = $("#phone").val();
        let contact = {person, phone};


        let createContacts = {
            method: "POST",
            url: baseUrl + ".json",
            data: JSON.stringify(contact)
        };

        $.ajax(createContacts);
        loadContacts();

        $("#person").val("");
        $("#phone").val("");

    }

    function deleteContact(key) {
        let delRequest = {
            method: "DELETE",
            url: baseUrl + "/" + key + ".json"
        };

        $.ajax(delRequest)
            .then(loadContacts);
    }

    function displayError() {
        $("#phonebook").text("Error");
    }
}
