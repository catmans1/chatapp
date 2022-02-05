import React from 'react';
import styled from 'styled-components/native';
import {
  MessageText,
  Time,
  MessageProps,
  IMessage,
} from 'react-native-gifted-chat';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface IBubbleContainer extends MessageProps<IMessage> {
  onLongPress: () => void;
}

export default function BubbleContainer(props: IBubbleContainer) {
  const isSameUser = props.currentMessage?.user._id == props.user._id;

  function renderMessageText() {
    if (props.currentMessage?.text) {
      const {...messageTextProps} = props;
      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: [styles.standardFont],
            right: [styles.standardFont],
          }}
        />
      );
    }
    return null;
  }

  function renderTime() {
    if (props.currentMessage?.createdAt) {
      const {...timeProps} = props;
      return (
        <Time
          {...timeProps}
          timeTextStyle={{
            left: [styles.timeText],
            right: [styles.timeText],
          }}
        />
      );
    }
    return null;
  }

  function renderTicks() {
    if (props.currentMessage?.user._id !== props.user._id) {
      return null;
    }
    if (props.currentMessage.pending) {
      return (
        <TickView>
          <TickText>Sending</TickText>
        </TickView>
      );
    }
    return (
      <TickView>
        {props.currentMessage?.sent ? (
          <>
            <Icon
              name="checkcircle"
              size={12}
              color="#2ecc71"
              style={{marginRight: 5}}
            />
            <TickText>Sent</TickText>
          </>
        ) : (
          <>
            <Icon
              name="exclamationcircle"
              size={12}
              color="#e74c3c"
              style={{marginRight: 5}}
            />
            <TickText>Error</TickText>
          </>
        )}
      </TickView>
    );
  }

  function renderLeftSide() {
    return (
      <>
        <WrapperView>{renderMessageText()}</WrapperView>
        {renderTime()}
        {renderTicks()}
      </>
    );
  }

  function renderRightSide() {
    return (
      <>
        <TimeView>
          {renderTime()}
          {renderTicks()}
        </TimeView>

        <WrapperView>{renderMessageText()}</WrapperView>
      </>
    );
  }

  return (
    <TouchableView isSameUser={isSameUser} onLongPress={props?.onLongPress}>
      {isSameUser ? renderRightSide() : renderLeftSide()}
    </TouchableView>
  );
}

const styles = StyleSheet.create({
  standardFont: {
    fontSize: 15,
    paddingHorizontal: 5,
    color: 'black',
  },
  timeText: {
    fontSize: 10,
    color: 'black',
  },
});

const TouchableView = styled.TouchableOpacity`
  flex: 1;
  padding-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props: {isSameUser: boolean}) =>
    props.isSameUser ? 'flex-end' : 'flex-start'};
`;

const WrapperView = styled.View`
  min-height: 20px;
  max-width: 68%;
  background-color: white;
  border-radius: 6px;
`;

const TimeView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TickView = styled.View`
  flex-direction: row;
  margin-right: 2px;
  margin-top: -4px;
`;

const TickText = styled.Text`
  font-size: 10px;
  color: gray;
`;
