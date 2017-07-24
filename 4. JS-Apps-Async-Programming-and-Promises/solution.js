$(document).ready(function () {
    const kinveyAppId = "kid_ByNrsu7Ib";
    const serviceUrl = "https://baas.kinvey.com/appdata/" + kinveyAppId;
    const kinveyUsername = "peter";
    const kinveyPassword = "p";
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const authHeaders = { "Authorization": "Basic " + base64auth };


    $("#btnLoadPosts").click(loadPosts);
    $("#btnViewPost").click(viewPosts);

    function loadPosts() {
        let getPosts = {
            method: "GET",
            url: serviceUrl + "/posts",
            headers: authHeaders
        };
        $.ajax(getPosts)
            .then(displayPosts)
            .catch(displayError);

        function displayPosts(posts) {
            for (let post of posts) {
                let option = $("<option>")
                    .text(post.title)
                    .val(post._id);

                $("#posts").append(option);
            }
        }

        function displayError(err){
            let errDiv = $("<div>").text("Error: " +
                err.status + ' (' + err.statusText + ')');
            $(document.body).prepend(errDiv);
            setTimeout(function () {
                $(errDiv).fadeOut(function() {
                    $(errDiv).remove();
                });
            }, 3000);
        }
    }

    function viewPosts() {
        let selectedPostId = $("#posts").val();
        let postRequest = {
            method: "GET",
            url: serviceUrl + "/posts/" + selectedPostId,
            headers: authHeaders
        };
        $.ajax(postRequest)
            .then(function (post) {
                $("#post-title").text(post.title);
                $("#post-body").text(post.body);
            })
            .catch(displayError);

        let commentRequest = {
            method: "GET",
            url: serviceUrl + `/comments/?query={"post_id":"${selectedPostId}"}`,
            headers: authHeaders
        };
        $.ajax(commentRequest)
            .then(function (comments) {
                $("#post-comments").empty();
                for (let comment of comments) {
                    let commentItem = $("<li>")
                        .text(comment.text);
                    $("#post-comments")
                        .append(commentItem);
                }
            })
            .catch(displayError);

        function displayError(err){
            let errDiv = $("<div>").text("Error: " +
                err.status + ' (' + err.statusText + ')');
            $(document.body).prepend(errDiv);
            setTimeout(function () {
                $(errDiv).fadeOut(function() {
                    $(errDiv).remove();
                });
            }, 3000);
        }
    }
});

