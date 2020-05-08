var express = require('express');
var graphqlHTTP = require('express-graphql');
const {schema, root} = require('./_helpers/_graphQL');

var app = express();

app.use(graphqlHTTP({schema: schema, rootValue: root, graphiql: true}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');