import { ApolloServer } from 'apollo-server-micro';
/**
 * ? connecting typeDefs and resolvers also removes the issue of 
 * ? having the name type Query cause you can only have one
 * ? type of Query at any given point
 */
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit';
import connectDb from '../../lib/mongoose';
import { employeesResolvers } from '../../api/employees/resolvers';
import Employess from '../../api/employees/Employees.graphql';


// ? Merges all your Query/Mutation resolvers
const resolvers = mergeResolvers([
  employeesResolvers,
]);

// ? Merges all of your typeDefs
const typeDefs = mergeTypeDefs([
  Employess,
]);


const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

const server = apolloServer.createHandler({ path: '/api/graphql' });
export default connectDb(server);
