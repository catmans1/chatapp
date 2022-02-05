import React from 'react';
import styled from 'styled-components/native';
import {Avatar, Day, MessageProps, IMessage} from 'react-native-gifted-chat';

import BubbleContainer from './BubbleContainer';
import {StyleSheet} from 'react-native';

interface IMessageContainer extends MessageProps<IMessage> {
  onOpenActionSheet: () => void;
}

export default function MessageContainer(props: IMessageContainer) {
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
    return (
      <Avatar
        {...props}
        imageStyle={{
          left: [styles.avatarImageLeft],
          right: [styles.avatarImageRight],
        }}
      />
    );
  }

  function renderBubble() {
    return (
      <BubbleContainer {...props} onLongPress={props?.onOpenActionSheet} />
    );
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

const styles = StyleSheet.create({
  avatarImageLeft: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 8,
    marginBottom: 2,
  },
  avatarImageRight: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 2,
  },
});

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
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
`;
