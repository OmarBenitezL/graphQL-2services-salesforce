const { clone, forEach, get } = require('lodash');
const rp = require('../helpers/Request');

require('es6-promise').polyfill();

var loggedInCache = null;

/**
 * Attempt a login with a given email/username and password
 * Returns a Promise
 * @param email
 * @param password
 * @return Promise.<object>
 */
const login = (email, password) => {
  return rp({
    uri: "http://localhost:4000" + '/user/login',
    method: 'POST',
    body: {
      email: email,
      password: password
    },
    json: true,
    withCredentials: true
  }).then(function (data) {
    if (data.success) {
      loggedInCache = {
        success: true,
        loggedIn: true,
        id: data.id,
        username: data.username,
        permissions: data.permissions
      };
      // Call all the registered callbacks
      forEach(this.onLogin, function (callback) {
        callback(data);
      });
    }

    return data;
  }.bind(this));
};

module.exports = login;
