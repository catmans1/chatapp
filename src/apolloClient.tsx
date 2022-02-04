import {ApolloClient, InMemoryCache} from '@apollo/client';

import config from './config';

// Initialize Apollo Client
const apolloClient = new ApolloClient({
  uri: config.API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
  headers: {
    Accept: 'application/json',
  },
});

export default apolloClient;
