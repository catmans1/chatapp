import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import {GiftedChat, MessageProps, IMessage} from 'react-native-gifted-chat';
import {useLazyQuery, useMutation} from '@apollo/client';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {
  MESSAGE_LATEST_QUERY,
  MESSAGE_MORE_QUERY,
} from '../graphQL/queries/MessageQueries';
import {POST_MESSAGE} from '../graphQL/mutations/MessageMutations';

import useChannel from '../hooks/userChannel';
import useUser from '../hooks/useUser';
import IMessageLocal from '../interfaces/IMessageLocal';
import MessageContainer from '../components/chat/MessageContainer';
import {transformMessage, transformUserAvatar} from '../utils/MessageUtils';
import {
  storeDraftMessage,
  getDraftMessage,
  removeDraftMessage,
} from '../utils/StoreUtils';
import LogError from '../utils/LogError';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {channel} = useChannel();
  const {user} = useUser();

  const giftChatRef: any = useRef();

  const [
    getLatestMessage,
    {
      called: latestMessageCalled,
      data: latestMessageData,
      loading: latestMessageLoading,
      error: latestMessageError,
    },
  ] = useLazyQuery(MESSAGE_LATEST_QUERY);

  const [
    getMoreMessages,
    {
      called: moreMessagesCalled,
      data: moreMessagesData,
      loading: moreMessagesLoading,
      error: moreMessagesError,
    },
  ] = useLazyQuery(MESSAGE_MORE_QUERY);

  const [
    postMessage,
    {
      called: postMessageCalled,
      data: postMessageData,
      loading: postMessageLoading,
      error: postMessageError,
    },
  ] = useMutation(POST_MESSAGE);

  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showLoadmore, setShowLoadmore] = useState<boolean>(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <StyleTouchableIcon onPress={() => navigation.goBack()}>
          <Icon name="left" size={20} />
        </StyleTouchableIcon>
      ),
      title: channel,
    });
  }, [navigation, channel]);

  useEffect(() => {
    // listen message input and store draft message
    if (text?.length > 0) {
      storeDraftMessage(user, channel, text);
    } else {
      removeDraftMessage(user, channel);
    }
  }, [text]);

  useEffect(() => {
    // listen channel, user change
    if (channel?.length > 0 && user?.length > 0) {
      setMessages([]);
      setText('');
      getMessage();
      onGetLatestMessage();
    }
  }, [channel, user]);

  useEffect(() => {
    // listen latest message query
    if (latestMessageCalled && !latestMessageLoading && latestMessageData) {
      if (latestMessageData?.fetchLatestMessages) {
        const lastMes = latestMessageData?.fetchLatestMessages;
        const newMessage: IMessage[] = [];
        lastMes.forEach((item: IMessageLocal) => {
          newMessage.push(transformMessage(item));
        });
        if (lastMes.length < 10) {
          setShowLoadmore(false);
        }
        setMessages(previous => [...previous, ...newMessage]);
      } else if (latestMessageError) {
        LogError('Get Latest Message Error', latestMessageError);
      }
    }
  }, [latestMessageCalled, latestMessageData, latestMessageLoading]);

  useEffect(() => {
    // listen latest message query
    if (moreMessagesCalled && !moreMessagesLoading && moreMessagesData) {
      if (moreMessagesData?.fetchMoreMessages) {
        const moreMes = moreMessagesData?.fetchMoreMessages;
        const newMessage: IMessage[] = [];
        moreMes.forEach((item: IMessageLocal) => {
          newMessage.push(transformMessage(item));
        });
        if (moreMes.length < 10) {
          setShowLoadmore(false);
        } else {
          setShowLoadmore(true);
        }
        setMessages(previous => [...previous, ...newMessage]);
      } else if (moreMessagesError) {
        LogError('Get More Message Error', latestMessageError);
      }
    }
  }, [moreMessagesCalled, moreMessagesData, moreMessagesLoading]);

  useEffect(() => {
    if (postMessageCalled && !postMessageLoading && postMessageData) {
      if (postMessageData?.postMessage) {
        messages[0]._id = postMessageData?.postMessage?.messageId;
        messages[0].sent = true;
        messages[0].pending = false;
        setMessages([...messages]);
      } else if (postMessageError) {
        LogError('Post Message Error', postMessageError);
        messages[0].sent = false;
        messages[0].pending = false;
        setMessages([...messages]);
      }
    }
  }, [postMessageCalled, postMessageData, postMessageLoading]);

  const onSend = useCallback(
    (newMessage = []) => {
      setText('');
      const mes: IMessage = newMessage[0];
      const sendMessage = {...mes, pending: true, sent: false};
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [sendMessage]),
      );
      onPostMessage(sendMessage);
    },
    [user, channel],
  );

  function onGetLatestMessage() {
    try {
      getLatestMessage({
        variables: {
          channelId: channel,
        },
      });
    } catch (error) {
      LogError('Get Latest Message Catch Error', error);
    }
  }

  function onPostMessage(message: IMessage) {
    if (channel?.length > 0 && user?.length > 0) {
      try {
        postMessage({
          variables: {
            channelId: channel,
            text: message.text,
            userId: user,
          },
        });
      } catch (error) {
        LogError('Post Message Catch Error', error);
      }
    }
  }

  async function getMessage() {
    const draft = await getDraftMessage(user, channel);
    if (draft?.length > 0) {
      setText(draft);
      giftChatRef?.current?.textInput?.focus();
    }
  }

  function renderMessage(props: MessageProps<IMessage>) {
    return (
      <MessageContainer
        {...props}
        onOpenActionSheet={() => {
          SheetManager.show('helloworld_sheet', {text: 'Hello World'});
        }}
      />
    );
  }

  function onLoadMoreMessages() {
    LogError('load more messages in channel');
    console.log(
      'messages[messages.length-1]._id',
      messages[messages.length - 1]._id,
    );
    getMoreMessages({
      variables: {
        channelId: channel,
        messageId: messages[messages.length - 1]._id,
        old: true,
      },
    });
  }

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        ref={giftChatRef}
        text={text}
        onInputTextChanged={setText}
        messages={messages}
        onSend={onSend}
        user={{
          _id: user,
          name: user,
          avatar: transformUserAvatar(user),
        }}
        loadEarlier={showLoadmore}
        isLoadingEarlier={moreMessagesLoading}
        onLoadEarlier={onLoadMoreMessages}
        showAvatarForEveryMessage
        scrollToBottom
        renderAvatarOnTop
        renderUsernameOnMessage
        scrollToBottomComponent={() => (
          <Icon name="down" size={20} color="#000" />
        )}
        renderMessage={renderMessage}
      />
      <ActionSheet id="helloworld_sheet">
        <View>
          <Text>Hello World</Text>
        </View>
      </ActionSheet>
    </View>
  );
}

const StyleTouchableIcon = styled.TouchableOpacity`
  padding: 5px;
`;
