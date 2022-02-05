import {gql} from '@apollo/client';

import {MessageFragment} from '../fragments/MessageFragments';

export const MESSAGE_LATEST_QUERY = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      ...MessageData
    }
  }
  ${MessageFragment}
`;

export const MESSAGE_MORE_QUERY = gql`
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
