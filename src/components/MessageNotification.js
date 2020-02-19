import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import styled from '@stream-io/styled-components';
import { themed } from '../styles/theme';
import { withLocalizationContext } from '../context';
import { LSK_NEW_MESSAGE_NOTIFICATION } from '../locale';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 27px;
  padding-left: 5px;
  padding-right: 5px;
  z-index: 10;
  margin-bottom: 0;
  border-radius: 13px;
  background-color: ${({ theme }) => theme.colors.primary};
  transform: translateY(9px);
  ${({ theme }) => theme.messageList.messageNotification.container.css}
`;

const MessageNotificationText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
  ${({ theme }) => theme.messageList.messageNotification.text.css}
`;
/**
 * @example ./docs/MessageNotification.md
 * @extends PureComponent
 */
class MessageNotification extends PureComponent {
  static themePath = 'messageList.messageNotification';
  constructor(props) {
    super(props);
    this.state = {
      notificationOpacity: new Animated.Value(0),
    };
  }
  static propTypes = {
    /** If we should show the notification or not */
    showNotification: PropTypes.bool,
    /** Onclick handler */
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    showNotification: true,
  };

  componentDidMount() {
    Animated.timing(this.state.notificationOpacity, {
      toValue: this.props.showNotification ? 1 : 0,
      duration: 500,
    }).start();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showNotification !== this.props.showNotification) {
      Animated.timing(this.state.notificationOpacity, {
        toValue: this.props.showNotification ? 1 : 0,
        duration: 500,
      }).start();
    }
  }

  render() {
    const { showNotification, localizedStrings } = this.props;
    if (!showNotification) {
      return null;
    } else {
      return (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            opacity: this.state.notificationOpacity,
          }}
        >
          <Container onPress={this.props.onPress}>
            <MessageNotificationText>
              {localizedStrings[LSK_NEW_MESSAGE_NOTIFICATION]}
            </MessageNotificationText>
          </Container>
        </Animated.View>
      );
    }
  }
}

const MessageNotificationWithContext = withLocalizationContext(
  themed(MessageNotification),
);

export { MessageNotificationWithContext as MessageNotification };
