import {ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

import config from './config';

const httpLink = new HttpLink({
  uri: config.API_URL,
  headers: {
    Accept: 'application/json',
  },
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Initialize Apollo Client
const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {fetchPolicy: 'cache-and-network'},
    mutate: {errorPolicy: 'all'},
  },
});

export default apolloClient;
