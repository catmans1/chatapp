import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat';

export const renderAvatar = (props) => (
  <Avatar
    {...props}
  // containerStyle={{ left: { borderWidth: 3, borderColor: 'red' }, right: { borderWidth: 3, borderColor: 'red' } }}
  // imageStyle={{ left: { borderWidth: 3, borderColor: '' }, right: { borderWidth: 3, borderColor: 'blue' } }}
  />
);

export const renderBubble = (props) => {
  var sameUserInPrevMessage = false;
  if (props.previousMessage.user !== undefined && props.previousMessage.user) {
    props.previousMessage.user._id === props.currentMessage.user._id ? sameUserInPrevMessage = true : sameUserInPrevMessage = false;
  }

  var messageBelongsToCurrentUser = currentUserId == props.currentMessage.user._id;
  return (
    <View>
      {!sameUserInPrevMessage && <View
        style={messageBelongsToCurrentUser ? styles.messageTimeAndNameContainerRight : styles.messageTimeAndNameContainerLeft}
      >

        <Bubble
          {...props}
        />
        <Text style={styles.messageTime}>{moment(props.currentMessage.createdAt).format("LT")}</Text>
        <Text style={styles.messageUsername}>{props.currentMessage.user.name}</Text>
      </View>}
    </View>
  )
}

export const renderBubble1 = (props) => (
  <Bubble
    {...props}
    // renderTime={() => <Text>Time</Text>}
    // renderTicks={() => <Text>Ticks</Text>}
    containerStyle={{
      left: { borderColor: 'teal', borderWidth: 10 },
      right: {},
    }}
    wrapperStyle={{
      left: { flexDirection: 'row', justifyContent: 'space-between', borderColor: 'tomato', borderWidth: 14 },
      right: {},
    }}
    bottomContainerStyle={{
      left: { borderColor: 'red', borderWidth: 4 },
      right: {},
    }}
    tickStyle={{}}
    containerToNextStyle={{
      left: { borderColor: 'navy', borderWidth: 4 },
      right: {},
    }}
    containerToPreviousStyle={{
      left: { borderColor: 'black', borderWidth: 4 },
      right: {},
    }}
  />
);

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: 'pink' }}
    wrapperStyle={{ borderWidth: 10, borderColor: 'white' }}
    textStyle={{ color: 'crimson', fontWeight: '900' }}
  />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    containerStyle={{
      left: { backgroundColor: 'lime' },
      right: { backgroundColor: 'gold' },
    }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    textStyle={{
      left: { color: '#2f3640' },
      right: { color: '#2f3640' },
    }}
  />
);
