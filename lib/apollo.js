// Wraps our application in what we call an apollo provider
// There are several ways to do this but the best way of doing this is via higher-order component
// Meaning that anytime you have a page and it wants to use apollo you gotta wrap it in higher order component
// This might not be the most elegat solution in terms of code duplication but apparently using the _app.js
// causes there to be some performance issues
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";

export function withApollo(PageComponent) {
    const withApollo = (props) => {
        const client = new ApolloClient({
            uri: "http://localhost:3000/api/graphql", // path in which our graph api is living
            fetch,
        });

        return (
            <ApolloProvider client={client}>{/* this connects the api on a server to the UI/FRONTEND of our code*/}
                <PageComponent {...props} />{/* this is simply as pass through for the components that needs to get pass through*/}
            </ApolloProvider>
        );
    };
    return withApollo;
}
