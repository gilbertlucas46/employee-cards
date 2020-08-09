/**
 * ? Wraps our application in what we call an apollo provider There are several ways to do this
 * ? but the best way of doing this is via higher-order component Meaning that anytime you have a
 * ? page and it wants to use apollo you gotta wrap it in higher order component This might not be the
 * ? most elegat solution in terms of code duplication but apparently using the _app.js
 * ? causes there to be some performance issues
 */

import ApolloClient from 'apollo-boost';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';
// ? if the server side cached has been implemented already them just re-initialize it with the previous cache
import { InMemoryCache } from 'apollo-cache-inmemory'; 

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);  // ?for client side stuff
    // ? initialize apolloClient if it does not existß

    return (
      <ApolloProvider client={client}> {/* this connects the api on a server to the UI/FRONTEND of our code*/}
        <PageComponent {...pageProps} />{/* this is simply as pass through for the components that needs to get pass through*/}
      </ApolloProvider>
    );
  };
// ? setup the getInitial props => gets your data ready initially
  WithApollo.getInitialProps = async ctx => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apollClient = initApolloClient()); // ? for server side stuff

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    // ? If window does not exist then it means its we're on the server
    if (typeof window === 'undefined') {
      // ? If theres no redirect within page route or if response has finished
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }
      // ? get all of the data from the tree
      try {
        /**
         * ? Allows us to get all of the data from the tree before the application is rendered, 
         * ? because theres huge problem with server side rendering and data specifically ifyou 
         * ? just tell it to just go off in serverside rendered, how does it know how long to wait 
         * ? for things to load? or if your data is partially/fully loaded?
         */
        const { getDataFromTree } = await import('@apollo/react-ssr');// Dynamic import
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        );
      } catch (e) {
        console.error(e);
      }

      /**
       * ? getDataFromTree() does not call component will
       * ? unmount so the Head side effect needs
       */
      Head.rewind();
    }

    // ? get apollo state
    const apolloState = apolloClient.cache.extract();

    // ? Return both a wrapped page props aswell as our apollo state
    return {
      ...pageProps,
      apolloState
    };
  };

  return WithApollo;
}

const initApolloClient = (initialState = {}) => {
  // ? restore() is going to be called if we have an initial state
  const cache = new InMemoryCache().restore(initialState); 

  const client = new ApolloClient({
    uri: 'https://employeecards.vercel.app', // ? path in which our graph api is living
    fetch,
    cache
  });
  return client;
};
