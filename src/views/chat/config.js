/* eslint-disable react/display-name */
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from '../../components/BotAvatar/BotAvatar';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import Todos from '../../components/Todos/Todos';
import EndChatView from '../../components/EndChatView/EndChatView';
import RatingView from '../../components/RatingView/RatingView';

const config = {
  initialMessages: [createChatBotMessage(`Hi, What's your name?`)],
  botName: 'T',
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
    header: (props) => <ChatHeader {...props} />,
  },
  widgets: [
    {
      widgetName: 'todos',
      widgetFunc: (props) => <Todos {...props} />,
      mapStateToProps: ['todos'],
    },
    {
      widgetName: 'endChatView',
      widgetFunc: (props) => <EndChatView {...props} />,
      mapStateToProps: ['endChatView'],
    },
    {
      widgetName: 'ratingView',
      widgetFunc: (props) => <RatingView {...props} />,
      mapStateToProps: ['ratingView'],
    },
  ],
};

export default config;
