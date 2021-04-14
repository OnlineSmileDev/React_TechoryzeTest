/* eslint-disable eqeqeq */
import apiCall from '../../libs/apiCall';
import ApiConstants from '../../api/ApiConstants';
import socketIOClient from 'socket.io-client';

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
    // console.log(this.state.messages);

    const socket = socketIOClient(ApiConstants.BASE_URL);

    socket.on('incomingMessage', (data) => {
      this.actionProvider.realTimeMessage(data);
    });

    const lowercase = message.toLowerCase();
    if (this.state.messages.length === 1) {
      this.actionProvider.handleEnvironment(message);
      apiCall(
        ApiConstants.UPDATE_CONVERSATION,
        {
          key: 'user',
          value: message,
        },
        'POST'
      );
    }

    if (this.state.messages.length === 5) {
      apiCall(
        ApiConstants.UPDATE_CONVERSATION,
        {
          key: 'problem',
          value: message,
        },
        'POST'
      ).then(() => {
        this.actionProvider.handleWorries();
      });
    }

    if (this.state.messages.length > 7) {
      apiCall(ApiConstants.GET_CONVERSATION, 'GET').then((json) => {
        if (json.data[0].chat_accpet) {
          socket.emit('message', {
            text: message,
            sender: '6047cb45047eabf185e8be81',
            receiver: '6047cb45047eabf185e8be83',
          });
        }
      });
    }
  }
}

export default MessageParser;
