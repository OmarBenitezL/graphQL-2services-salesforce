// Libraries
const { merge, reduce } = require('lodash');
const  rp = require('./Request');

function generateEndpoint(endpoint, verb,coockie) {
  return function (params, options) {
    var correctName;
    var paramsToEndpoint = {
      params: params,
      options: options
    };

    if (verb === 'get') {
      correctName = {
        qs: paramsToEndpoint
      };
    } else {
      correctName = {
        body: paramsToEndpoint
      };
    }
    correctName.headers = {
      Cookie: coockie
    }
    var promise = rp(merge({
      uri: "http://localhost:4000" + '/' + endpoint,
      method: verb.toUpperCase(),
      json: true,
    }, correctName));

    return promise;
  };
}

function buildApiRestfulControllers(endpoint, coockie) {
  var httpVerbs = ['get', 'post', 'put', 'delete'];

  var restfulAPI = reduce(httpVerbs, function (prevVal, verb) {
    if (!prevVal[verb]) {
      prevVal[verb] = generateEndpoint(endpoint, verb, coockie);
    }
    return prevVal;
  }, {});

  return restfulAPI;
}

module.exports = buildApiRestfulControllers;
