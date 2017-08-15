import * as requester from './requester';
import observer from './observer';

function saveSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
}

function login(username, password, callback) {
    let userData = {
        username: username,
        password: password
    };

    requester.post('user', 'login', 'basic', userData)
        .then((response) => {
            saveSession(response);
            callback(true);
        }).catch((err) => callback(false))
}

function register(username, password, fullName, email, phone, callback) {
    let userData = {
        username: username,
        password: password,
    };

    requester.post('user', '', 'basic', userData)
        .then(registerSuccessUsers)
        .catch(callback);

    function registerSuccessUsers(userInfo) {
        saveSession(userInfo);
        let user_id = userInfo._id;
        let authorData = {
            user_id,
            fullName,
            email,
            phone
        };

        requester.post('appdata', 'authors', 'kinvey', authorData)
            .then(registerSuccess)
            .catch(callback);

        function registerSuccess(userInfo) {
            callback(true);
        }
    }
}

function logout(callback) {
    requester.post('user', '_logout', 'kinvey', null,)
        .then(logoutSuccess);

    function logoutSuccess(response) {
        sessionStorage.clear();
        observer.onSessionUpdate();
        callback(true);
    }
}

export {login, register, logout};
