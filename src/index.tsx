import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';

import Navigator from './navigators';

import apolloClient from './apolloClient';
import TabletContextProvider from './contexts/TabletContext';
import UserContextProvider from './contexts/UserContext';
import ChannelContextProvider from './contexts/ChannelContext';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <TabletContextProvider>
          <UserContextProvider>
            <ChannelContextProvider>
              <Navigator />
            </ChannelContextProvider>
          </UserContextProvider>
        </TabletContextProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
