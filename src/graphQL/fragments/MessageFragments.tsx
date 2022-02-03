import {gql} from '@apollo/client';

export const MessageFragment = gql`
  fragment MessageData on Message {
    messageId
    text
    datetime
    userId
  }
`;
