const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const loging = require('./data/gendata/login/login');

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4001, async() => {
  await loging();
  console.log('listening');
});