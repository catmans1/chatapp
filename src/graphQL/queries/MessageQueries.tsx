import {gql} from '@apollo/client';

import {MessageFragment} from '../fragments/MessageFragments';

export const LATEST_MESSAGE_QUERY = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      ...MessageData
    }
  }
  ${MessageFragment}
`;

export const MORE_MESSAGE_QUERY = gql`
  query FetchMoreMessages(
    $channelId: String!
    $messageId: String!
    $old: Boolean!
  ) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      ...MessageData
    }
  }
  ${MessageFragment}
`;
