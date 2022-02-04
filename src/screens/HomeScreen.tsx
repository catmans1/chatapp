// import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
// import {View, Text, TouchableOpacity, Platform} from 'react-native';
// import {GiftedChat, IMessage, Send} from 'react-native-gifted-chat';
// import {useLazyQuery, useMutation} from '@apollo/client';
// import Icon from 'react-native-vector-icons/AntDesign';
// import styled from 'styled-components/native';
// import {useNavigation} from '@react-navigation/native';

// import {
//   MESSAGE_LATEST_QUERY,
//   MESSAGE_MORE_QUERY,
// } from '../graphQL/queries/MessageQueries';
// import {POST_MESSAGE} from '../graphQL/mutations/MessageMutations';

// import useChannel from '../hooks/userChannel';
// import useUser from '../hooks/useUser';
// import IMessageLocal from '../interfaces/IMessageLocal';
// import SlackMessage from './SlackMessage';
// import {transformMessage, transformUserAvatar} from '../utils/MessageUtils';

// import initialMessages from './messages';
// import {
//   renderInputToolbar,
//   renderActions,
//   renderComposer,
//   renderSend,
// } from './InputToolbar';
// import {
//   renderAvatar,
//   renderBubble,
//   renderSystemMessage,
//   renderMessage,
//   renderMessageText,
//   renderCustomView,
// } from './MessageContainer';

// function HomeScreen() {
//   const navigation = useNavigation();
//   const {channel} = useChannel();
//   const {user} = useUser();

//   const [
//     getLatestMessage,
//     {
//       called: latestMessageCalled,
//       data: latestMessageData,
//       loading: latestMessageLoading,
//       error: latestMessageError,
//     },
//   ] = useLazyQuery(MESSAGE_LATEST_QUERY);

//   const [
//     getMoreMessage,
//     {
//       data: moreMessageData,
//       loading: moreMessageLoading,
//       error: moreMessageError,
//     },
//   ] = useLazyQuery(MESSAGE_MORE_QUERY);

//   const [
//     postMessage,
//     {
//       data: postMessageData,
//       loading: postMessageLoading,
//       error: postMessageError,
//     },
//   ] = useMutation(POST_MESSAGE);

//   const [text, setText] = useState('');
//   const [messages, setMessages] = useState<IMessage[]>(initialMessages);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <StyleTouchableIcon onPress={() => navigation.goBack()}>
//           <Icon name="left" size={20} />
//         </StyleTouchableIcon>
//       ),
//       title: channel,
//     });
//   }, [navigation, channel]);

//   useEffect(() => {
//     setMessages(initialMessages.reverse());
//   }, []);

//   useEffect(() => {
//     // listen user change
//     if (user?.length > 0) {
//     }
//   }, [user]);

//   useEffect(() => {
//     // listen channel change
//     if (channel?.length > 0) {
//       console.log(channel);
//       setMessages([]);
//       getLatestMessage({
//         variables: {
//           channelId: channel,
//         },
//       });
//     }
//   }, [channel]);

//   useEffect(() => {
//     // listen latest message query
//     if (latestMessageCalled && !latestMessageLoading && latestMessageData) {
//       if (latestMessageData?.fetchLatestMessages) {
//         const messageData = latestMessageData?.fetchLatestMessages;
//         messageData.forEach((item: IMessageLocal) => {
//           const newItem = transformMessage(item);
//           console.log(item, newItem);
//           // setMessages(previous => [...previous, newItem]);
//         });
//       } else if (latestMessageData?.latestMessageError) {
//         console.log(latestMessageData?.latestMessageError);
//       }
//     }
//   }, [latestMessageCalled, latestMessageData, latestMessageLoading]);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);

//   return (
//     <GiftedChat
//       messages={messages}
//       text={text}
//       onInputTextChanged={setText}
//       onSend={onSend}
//       user={{
//         _id: 1,
//         name: 'Aaron',
//         avatar: 'https://placeimg.com/150/150/any',
//       }}
//       alignTop
//       alwaysShowSend
//       scrollToBottom
//       // showUserAvatar
//       renderAvatarOnTop
//       renderUsernameOnMessage
//       bottomOffset={26}
//       onPressAvatar={console.log}
//       renderInputToolbar={renderInputToolbar}
//       renderActions={renderActions}
//       renderComposer={renderComposer}
//       renderSend={renderSend}
//       renderAvatar={renderAvatar}
//       renderBubble={renderBubble}
//       renderSystemMessage={renderSystemMessage}
//       renderMessage={renderMessage}
//       renderMessageText={renderMessageText}
//       // renderMessageImage
//       // renderCustomView={renderCustomView}
//       isCustomViewBottom
//       parsePatterns={linkStyle => [
//         {
//           pattern: /#(\w+)/,
//           style: linkStyle,
//           onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
//         },
//       ]}
//     />
//   );
// }

// const StyleTouchableIcon = styled.TouchableOpacity`
//   padding: 5px;
// `;

// export default HomeScreen;
import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/AntDesign';
import initialMessages from './messages';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from './InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
} from './MessageContainer';

import SlackMessage from './SlackMessage';
import MessageContainer from '../components/chat/MessageContainer';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, []);

  const onSend = (newMessages = []) => {
    console.log(newMessages);
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
  };

  const renderMessage = props => {
    return <MessageContainer {...props} />;
  };

  return (
    <GiftedChat
      messages={messages}
      text={text}
      onInputTextChanged={setText}
      onSend={onSend}
      user={{
        _id: 1,
        name: 'Aaron',
        avatar: 'https://placeimg.com/150/150/any',
      }}
      loadEarlier={false}
      scrollToBottom
      scrollToBottomComponent={() => (
        <Icon name="down" size={20} color="#000" />
      )}
      showUserAvatar
      showAvatarForEveryMessage
      onPressAvatar={console.log}
      // renderInputToolbar={renderInputToolbar}
      // renderActions={renderActions}
      // renderComposer={renderComposer}
      // renderSend={renderSend}
      // renderAvatar={renderAvatar}
      // renderBubble={renderBubble}
      renderMessage={renderMessage}
      // renderMessageText={renderMessageText}
    />
  );
};

export default HomeScreen;
