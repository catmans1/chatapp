import {IMessage} from 'react-native-gifted-chat';
import IMessageLocal from 'src/interfaces/IMessageLocal';

import {JoyseAvatar, RussellAvatar, SamAvatar} from '../assets';

export function transformUserAvatar(userId: string): NodeRequire {
  switch (userId) {
    case 'Joyse':
      return JoyseAvatar;
    case 'Russell':
      return RussellAvatar;
    case 'Sam':
      return SamAvatar;
    default:
      return JoyseAvatar;
  }
}

export function transformMessage(message: IMessageLocal): IMessage {
  const newMessage: IMessage = {
    _id: message.messageId,
    text: message.text,
    createdAt: message.datetime,
    user: {
      _id: message.userId,
      name: message.userId,
      avatar: transformUserAvatar(message.userId),
    },
    sent: true,
  };
  return newMessage;
}

export function updateMessage(
  messages: IMessage[],
  messageFrom: IMessageLocal,
): IMessage[] {
  const newMessage = messages.filter(item => {
    if (item?.user?._id === messageFrom.userId) {
      item._id = messageFrom.messageId;
      item.pending = false;
      item.sent = true;
    }
  });
  return newMessage;
}