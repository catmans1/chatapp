import {gql} from '@apollo/client';

import {MessageFragment} from '../fragments/MessageFragments';

export const POST_MESSAGE = gql`
  mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      ...MessageData
    }
  }
  ${MessageFragment}
`;
