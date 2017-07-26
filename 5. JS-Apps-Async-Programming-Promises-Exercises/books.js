const baseBookURL = "https://baas.kinvey.com/appdata/kid_B16iHg8Lb/Book/";
const token = "Basic " + btoa("guest:guest");

function attachEvents() {
    $(".load").click(loadBooks);
    $(".add").click(addBook);

    function loadBooks() {
        let requestBooks = {
            method: "GET",
            url: baseBookURL,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };

        $.ajax(requestBooks)
            .then(displayBooks)
            .catch(displayError);

        function displayBooks(books) {
            $("#books").empty();
            for (let book of books) {
                let bookLoaded = `<div class="book" data-id="${book._id}">
                                    <label>Title</label>
                                    <input type="text" class="title" value="${book.title}"/>
                                    <label>Author</label>
                                    <input type="text" class="author" value="${book.author}"/>
                                    <label>ISBN</label>
                                    <input type="text" class="isbn" value="${book.isbn}"/>
                                    <button id="update">Update</button>
                                    <button id="delete">Delete</button>
                                    </div>`;

                $("#books").append(bookLoaded);
            }
        }
    }

    function addBook() {
        let inputs = $(this).parent().find("input");

        let addBookRequest = {
            method: "POST",
            url: baseBookURL,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({title: $(inputs[0]).val(), author: $(inputs[1]).val(), isbn: $(inputs[2]).val()})
        };

        $.ajax(addBookRequest)
            .then(loadBooks)
            .catch(displayError);

        for (let input of inputs) {
            $("input").val("");
        }
    }


}

function displayError(error) {
    console.log(error);
}
