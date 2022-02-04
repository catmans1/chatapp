/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from 'prop-types'
import React from 'react'
import { View, ViewPropTypes, StyleSheet, Text } from 'react-native'

import { Avatar, Day, utils } from 'react-native-gifted-chat'
import Bubble from './SlackBubble'

const { isSameUser, isSameDay } = utils

export default class Message extends React.Component {

  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props
    return {
      ...props,
      position: 'left',
      isSameUser,
      isSameDay,
    }
  }

  renderDay() {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps()
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps)
      }
      return <Day {...dayProps} />
    }
    return null
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps()
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps)
    }
    return <Bubble {...bubbleProps} />
  }

  renderUsername() {
    const username = this.props.currentMessage.user.name
    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = this.props
      if (this.props.renderUsername) {
        return this.props.renderUsername(usernameProps)
      }
      return (
        <Text
          style={[
            { fontSize: 10, textAlign: 'center', },
          ]}
        >
          {username}
        </Text>
      )
    }
    return null
  }

  renderAvatar() {
    const avatarProps = this.getInnerComponentProps()
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: [styles.slackAvatar, avatarProps.imageStyle],
          right: [styles.slackAvatar, avatarProps.imageStyle],
        }}
      />
    )
  }

  render() {
    const marginBottom = isSameUser(
      this.props.currentMessage,
      this.props.nextMessage,
    )
      ? 5
      : 10
    const { currentMessage } = this.props

    return (
      <>
        {this.renderDay()}
        <View
          style={[
            styles.container,
            { marginBottom },
            this.props.containerStyle,
          ]}
        >
          {currentMessage.user._id !== this.props.user._id ?
            <>
              <View style={styles.avatarView}>
                {this.renderAvatar()}
                {this.renderUsername()}
              </View>
              {this.renderBubble()}
            </>
            :
            <>
              {this.renderBubble()}
              <View style={styles.avatarView}>
                {this.renderAvatar()}
                {this.renderUsername()}
              </View>
            </>}

        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 0,
  },
  avatarView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  slackAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 7,
    marginBottom: 2
  },
})

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
}

Message.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
}
