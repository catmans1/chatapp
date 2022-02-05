import 'react-native';

import {transformUserAvatar, transformMessage} from '../../utils/MessageUtils';
import {JoyseAvatar, SamAvatar} from '../../assets';

describe('Transform User Avatar', () => {
  it('should return the correct object', () => {
    expect(transformUserAvatar('Joyse')).toBe(JoyseAvatar);
    expect(transformUserAvatar('Sam')).toBe(SamAvatar);
  });
});

describe('Transform Message', () => {
  it('should return the correct object', () => {
    const message = {
      messageId: 'messageId',
      text: 'string',
      datetime: new Date(),
      userId: 'Sam',
    };
    const matchObject = {
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
    expect(transformMessage(message)).toMatchObject(matchObject);
  });
});
