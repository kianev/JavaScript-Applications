
function attachEvents(){
    let baseUrl = "https://messenger-1ea63.firebaseio.com/";
    function refreshTextField() {
        $("#refresh").click(loadMessages);
        $("#submit").click(createMessage);

        function loadMessages() {
            $.get(baseUrl + ".json")
                .then(displayMessages)
                .catch(displayError);
        }

        function displayMessages(messages) {
            $("#messages").empty();
            let sortedMessages = {};
            messages = Object.keys(messages).sort((a,b) => a.timestamp - b.timestamp)
                .forEach( key => sortedMessages[key] = messages[key]);

            for (let message of Object.keys(sortedMessages)) {
                $("#messages").append(`${sortedMessages[message]["author"]}: ${sortedMessages[message]["content"]}\n`);
            }
        }
        
        function createMessage() {
            let data = {
                author: $("#author").val(),
                content: $("#content").val(),
                timestamp: new Date()
            };

            $.post(baseUrl + ".json", JSON.stringify(data))
                .then(loadMessages);

            $("#author").val("");
            $("#content").val("");

        }

        function displayError() {
            $("#messages").text("Error");
        }
    }



    refreshTextField();
}