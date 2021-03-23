import apiCall from '../../libs/apiCall';
import ApiConstants from '../../api/ApiConstants';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(ApiConstants.BASE_URL);
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleEnvironment = () => {
    const message = this.createChatBotMessage('What environment?', {
      widget: 'todos',
    });
    this.addMessageToBotState(message);
  };

  handleAnswerEnvironment = (val) => {
    const message = this.createClientMessage(val, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
    const message1 = this.createChatBotMessage(`What's the problem?`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message1);
    apiCall(
      ApiConstants.UPDATE_CONVERSATION,
      {
        key: 'environment',
        value: val,
      },
      'POST'
    );
  };

  handleWorries = () => {
    const message = this.createChatBotMessage(
      `No worries. Connecting you to an expert...`,
      {
        withAvatar: true,
      }
    );
    this.addMessageToBotState(message);
    apiCall(ApiConstants.GET_CONVERSATION, 'GET').then((json) => {
      const message1 = this.createChatBotMessage(
        `You are connected to ${json.data[0].expert}`,
        {
          withAvatar: true,
        }
      );
      this.addMessageToBotState(message1);
    });
  };

  realTimeMessage = (data) => {
    if (data.sender === '6047cb45047eabf185e8be83') {
      const message = this.createChatBotMessage(`${data.text}`, {
        withAvatar: true,
      });
      this.addMessageToBotState(message);
    }
  };

  handleEndChat = () => {
    const message = this.createChatBotMessage('Do you want to end the chat?', {
      withAvatar: true,
      widget: 'endChatView',
    });
    this.addMessageToBotState(message);
    socket.emit('session', {
      status: 'close',
    });
  };

  handleAnswerEndChat = (val) => {
    const message = this.createClientMessage(val, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
    if (val === 'Yes') {
      apiCall(ApiConstants.GET_CONVERSATION, 'GET').then((json) => {
        const message1 = this.createChatBotMessage(
          `OK. How did ${json.data[0].expert} do?`,
          {
            widget: 'ratingView',
          }
        );
        this.addMessageToBotState(message1);
        socket.emit('sessionOption', {
          status: 'Yes',
        });
      });
    } else {
      apiCall(ApiConstants.GET_CONVERSATION, 'GET').then((json) => {
        const message1 = this.createChatBotMessage(
          `Sure. ${json.data[0].expert} is still here.`,
          {
            withAvatar: true,
          }
        );
        this.addMessageToBotState(message1);
        socket.emit('sessionOption', {
          status: 'No',
        });
      });
    }
  };

  handleRating = (val) => {
    var message = '';
    switch (val) {
      case 1:
        message = this.createClientMessage(`⭐`);
        break;
      case 2:
        message = this.createClientMessage(`⭐⭐`);
        break;
      case 3:
        message = this.createClientMessage(`⭐⭐⭐`);
        break;
      case 4:
        message = this.createClientMessage(`⭐⭐⭐⭐`);
        break;
      case 5:
        message = this.createClientMessage(`⭐⭐⭐⭐⭐`);
        break;
      default:
        message = this.createClientMessage(``);
    }
    this.addMessageToBotState(message);

    apiCall(ApiConstants.GET_CONVERSATION, 'GET').then((json) => {
      const message1 = this.createChatBotMessage(
        `Thanks for the feedback ${json.data[0].user}`
      );
      this.addMessageToBotState(message1);
      socket.emit('rating', {
        value: val,
      });
      setTimeout(() => window.location.reload(), 2000);
    });
  };

  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => {
        const lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage.message !== messages.message) {
          return {
            ...state,
            messages: [...state.messages, messages],
          };
        } else {
          return state;
        }
      });
    }
  };
}

export default ActionProvider;
