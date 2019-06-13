const graphql = require('graphql');
const getStudent = require('../data/restApi/students/getStudents');
const getSalesforceData = require('../data/salesforce/getDataSalesforce');
const getOtherData = require('../data/otherService/getOtherData');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: {
    id:             { type: GraphQLString },
    name:           { type: GraphQLString },
    phone:          { type: GraphQLString },
    accountnumber:  { type: GraphQLString },
  }
});

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: {
    id:           { type: GraphQLString },
    actor_id:     { type: GraphQLInt },
    actor_type:   { type: GraphQLString },
    name:         { type: GraphQLString },
    country_id:   { type: GraphQLInt },
    location_id:  { type: GraphQLInt },
    program_id:   { type: GraphQLInt }
  }
});


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id:         { type: GraphQLInt },
    firstName:  { type: GraphQLString },
    country:    { type: GraphQLString },
    account:    { 
      type: AccountType,
      resolve(parentValue, args){
        return  getSalesforceData('ABC Computing');
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parentValue, args){
        return getOtherData(1)
      }
    }
  }
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type:  GraphQLInt } },
      resolve (parentValue, args) {
        return getStudent(args.id);
      }
    },
    account: {
      type: AccountType,
      args: { name: { type:  GraphQLString } },
      resolve (parentValue, args) {
        return getSalesforceData(args.name);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});


