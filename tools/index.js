module.exports = (function () {
    var loginModule = require ('./login');
    document.write("it works! From Webpack!!!");
    loginModule.login();
})();

