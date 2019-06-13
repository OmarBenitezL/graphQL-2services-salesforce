const Request = require('request-promise');
const url2 = "urlService"

const getOtherData = (id) => {
  const options = {
    url: url2+id,
    json: true
  };
  return  Request(options).then(results => {
    return results.data;
  });
};

module.exports = getOtherData;
