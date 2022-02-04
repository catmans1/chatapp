import React from 'react';
import styled from 'styled-components/native';
import {Avatar, Day, MessageProps, IMessage} from 'react-native-gifted-chat';

import BubbleContainer from './BubbleContainer';

export default function MessageContainer(props: MessageProps<IMessage>) {
  function renderDay() {
    if (props.currentMessage?.createdAt) {
      return <Day {...props} />;
    }
    return null;
  }

  function renderUsername() {
    const username = props.currentMessage?.user.name;
    if (username) {
      return <UsernameText>{username}</UsernameText>;
    }
    return null;
  }

  function renderAvatar() {
    return <Avatar {...props} />;
  }

  function renderBubble() {
    return <BubbleContainer {...props} />;
  }

  function renderLeftSide() {
    return (
      <>
        <AvatarView>
          {renderAvatar()}
          {renderUsername()}
        </AvatarView>
        {renderBubble()}
      </>
    );
  }

  function renderRightSide() {
    return (
      <>
        {renderBubble()}
        <AvatarView>
          {renderAvatar()}
          {renderUsername()}
        </AvatarView>
      </>
    );
  }
  const isSameUserMessage =
    props.currentMessage?.user?._id === props.nextMessage?.user?._id;
  const sameUser = props.currentMessage?.user?._id === props.user._id;

  return (
    <>
      {renderDay()}
      <Container isSameUserMessage={isSameUserMessage}>
        {sameUser ? renderRightSide() : renderLeftSide()}
      </Container>
    </>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 8px;
  margin-bottom: ${(props: {isSameUserMessage: boolean}) =>
    props.isSameUserMessage ? '8px' : '15px'};
`;

const UsernameText = styled.Text`
  font-size: 10px;
  text-align: center;
`;

const AvatarView = styled.View`
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-right: 10px;
`;
