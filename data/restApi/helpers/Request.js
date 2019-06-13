require("es6-promise").polyfill();
const axios = require("axios");

const rp = (options) =>{
  const reqParams = {
    url: options.uri,
    withCredentials: true
  };

  if (options.method) reqParams.method = options.method;
  if (options.body) reqParams.data = options.body;
  if (options.qs) reqParams.params = options.qs;
  if (options.data) reqParams.data = options.data;
  if (options.headers) reqParams.headers = options.headers;

  return axios(reqParams).then(response => {
    if(response.headers['set-cookie'] !== undefined){
      const cookie = response.headers['set-cookie'];
      response.data.cookie = cookie['0'].substring(0,cookie['0'].indexOf(';'));
    }
    return response.data;
  });
}
module.exports = rp;
