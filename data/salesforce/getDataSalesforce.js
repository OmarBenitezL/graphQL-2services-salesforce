const nforce = require('nforce');

const getSalesforceData = async (accountName) => {
  console.log('looking for', accountName);
  const org = nforce.createConnection({
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    redirectUri: 'http://localhost:3000/',
    apiVersion: 'v43.0',
    environment: 'production',
    mode: 'single'
  });
  let account = null;
  // authenticate and return OAuth token
  await org.authenticate({
    username: "user",
    password: "passoword+SecreyKey"
  });
  const res = await org.query({ query: `select id, name, phone, AccountNumber from account where name = '${accountName}' limit 5` });
  if(res.records[0]._fields.phone === null){
    res.records[0]._fields.phone = '';
  }
  if(res.records[0]._fields.accountnumber === null){
    res.records[0]._fields.accountnumber = '';
  }
  return res.records[0]._fields;
};

module.exports = getSalesforceData;

