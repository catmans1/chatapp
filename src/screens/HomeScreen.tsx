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
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';

import {
  MESSAGE_LATEST_QUERY,
  MESSAGE_MORE_QUERY,
} from '../graphQL/queries/MessageQueries';
import {POST_MESSAGE} from '../graphQL/mutations/MessageMutations';

import useChannel from '../hooks/userChannel';
import useUser from '../hooks/useUser';
import useTablet from '../hooks/useTablet';
import IMessageLocal from '../interfaces/IMessageLocal';
import MessageContainer from '../components/chat/MessageContainer';
import {transformMessage, transformUserAvatar} from '../utils/MessageUtils';
import {
  storeDraftMessage,
  getDraftMessage,
  removeDraftMessage,
} from '../utils/StoreUtils';
import LogError from '../utils/LogError';

function HomeScreen() {
  const navigation = useNavigation();
  const {channel} = useChannel();
  const {user} = useUser();
  const {isTablet} = useTablet();

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
  const [showLoadmore, setShowLoadmore] = useState<boolean>(false);
  const {showActionSheetWithOptions} = useActionSheet();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        if (isTablet) {
          return;
        }
        return (
          <StyleTouchableIcon onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} />
          </StyleTouchableIcon>
        );
      },
      title: channel,
    });
  }, [navigation, channel, isTablet]);

  useEffect(() => {
    // listen message input and store draft message
    if (text?.length > 0) {
      storeDraftMessage(user, channel, text);
    } else {
      removeDraftMessage(user, channel);
    }
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // listen channel, user change
    if (channel?.length > 0 && user?.length > 0) {
      setMessages([]);
      setText('');
      getMessage();
      onGetLatestMessage();
    }
  }, [channel, user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // listen latest message query
    if (latestMessageCalled && !latestMessageLoading && latestMessageData) {
      if (latestMessageData?.fetchLatestMessages) {
        const lastMes = latestMessageData?.fetchLatestMessages?.map(
          (item: IMessageLocal) => {
            return transformMessage(item);
          },
        );
        if (lastMes.length > 10) {
          setShowLoadmore(true);
        }
        setMessages(previous => [...previous, ...lastMes]);
      } else if (latestMessageError) {
        LogError('Get Latest Message Error', latestMessageError);
      }
    }
  }, [latestMessageCalled, latestMessageData, latestMessageLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // listen latest message query
    if (moreMessagesCalled && !moreMessagesLoading && moreMessagesData) {
      if (moreMessagesData?.fetchMoreMessages) {
        const moreMes = moreMessagesData?.fetchMoreMessages?.map(
          (item: IMessageLocal) => {
            return transformMessage(item);
          },
        );
        if (moreMes.length < 10) {
          setShowLoadmore(false);
        } else {
          setShowLoadmore(true);
        }
        setMessages(previous => [...previous, ...moreMes]);
      } else if (moreMessagesError) {
        LogError('Get More Message Error', latestMessageError);
      }
    }
  }, [moreMessagesCalled, moreMessagesData, moreMessagesLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (postMessageCalled && !postMessageLoading && postMessageData) {
      if (postMessageData?.postMessage) {
        // BUG MAY BE HAPPEN
        // MUST COMPARE MESSAGE_ID
        messages[0]._id = postMessageData?.postMessage?.messageId;
        messages[0].sent = true;
        messages[0].pending = false;
        setMessages([...messages]);
      } else if (postMessageError) {
        // BUG MAY BE HAPPEN
        // MUST COMPARE MESSAGE_ID
        LogError('Post Message Error', postMessageError);
        messages[0].sent = false;
        messages[0].pending = false;
        setMessages([...messages]);
      }
    }
  }, [postMessageCalled, postMessageData, postMessageLoading]); // eslint-disable-line react-hooks/exhaustive-deps

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
    [user, channel], // eslint-disable-line react-hooks/exhaustive-deps
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
          if (!props.currentMessage?.sent) {
            showActionSheetWithOptions(
              {
                options: ['Cancel', 'Resend'],
                cancelButtonIndex: 0,
              },
              buttonIndex => {
                if (buttonIndex === 0) {
                  // cancel action
                } else if (buttonIndex === 1) {
                  // Resend action
                  if (props?.currentMessage) {
                    onPostMessage(props?.currentMessage);
                  }
                }
              },
            );
          }
        }}
      />
    );
  }

  function onLoadMoreMessages() {
    LogError('load more messages in channel');
    if (messages.length > 0) {
      getMoreMessages({
        variables: {
          channelId: channel,
          messageId: messages[messages.length - 1]._id,
          old: true,
        },
      });
    }
  }

  return (
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
  );
}

const StyleTouchableIcon = styled.TouchableOpacity`
  padding: 5px;
`;

export default connectActionSheet(HomeScreen);

//https://stackoverflow.com/questions/67782975/how-to-fix-the-module-java-base-does-not-opens-java-io-to-unnamed-module
