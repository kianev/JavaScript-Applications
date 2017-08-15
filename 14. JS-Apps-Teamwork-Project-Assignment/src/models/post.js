import {post, get, update, deleteItem} from './requester';

function create(title, content, callback) {
    let postData = {
        title: title,
        content: content
    };
    post('appdata', 'posts?sort={"_kmd.lmt": -1}', 'kinvey', postData,)
        .then(callback);
}

function loadPosts(callback) {
    get('appdata', 'posts', 'kinvey')
        .then(callback);
}

function loadRecentPosts(callback) {
    get('appdata', 'posts?limit=3&sort={"_kmd.lmt": -1}', 'kinvey')
        .then(callback);
}

function loadPostDetails(postId, onPostSuccess) {
    get('appdata', 'posts/' + postId, 'kinvey')
        .then(onPostSuccess);
}

function loadAuthorsDetails(userId, onAuthorsSuccess) {
    get('appdata', `authors?query={"user_id":"${userId}"}`, 'kinvey')
        .then(onAuthorsSuccess);
}

function edit(postId, name, description, callback) {
    let postDetails = {
        title: name,
        content: description
    };
    update('appdata', 'posts/' + postId, postDetails, 'kinvey')
        .then(callback(true))
        .catch(callback);
}

function deletePost(postId, callback) {
    deleteItem('appdata', 'posts', postId, 'kinvey')
        .then(callback);

}


export {create, loadPosts, loadPostDetails, loadAuthorsDetails, edit, deletePost, loadRecentPosts};