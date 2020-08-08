import { ApolloServer, gql } from 'apollo-server-micro'; // Micro integration for apollo server

const typeDefs = gql`
    type Query {
        sayHello: String
    }
`

const resolvers = {
    Query: {
        sayHello: () => {
            return "hello levelup"
        }
    }
}

const apolloServer = new ApolloServer({
    typeDefs, resolvers
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default apolloServer.createHandler({
    path: '/api/graphql'
})