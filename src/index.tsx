import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';

import Navigator from './navigators';

import apolloClient from './apolloClient';
import TabletContextProvider from './contexts/TabletContext';
import UserContextProvider from './contexts/UserContext';

export default function App() {
  return (
    <TabletContextProvider>
      <UserContextProvider>
        <ApolloProvider client={apolloClient}>
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </ApolloProvider>
      </UserContextProvider>
    </TabletContextProvider>
  );
}
