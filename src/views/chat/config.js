/* eslint-disable react/display-name */
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from '../../components/BotAvatar/BotAvatar';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import Todos from '../../components/Todos/Todos';
import EndChatView from '../../components/EndChatView/EndChatView';
import RatingView from '../../components/RatingView/RatingView';
import VideoChatView from '../../components/VideoChatView/VideoChatView';

const config = {
  initialMessages: [createChatBotMessage(`Hi, What's your name?`)],
  botName: 'T',
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />,
    header: (props) => <ChatHeader {...props} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: 'rgb(91, 115, 232)',
    },
    chatButton: {
      backgroundColor: 'rgb(91, 115, 232)',
      borderBottomRightRadius: '20px',
    },
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
    {
      widgetName: 'videoChatView',
      widgetFunc: (props) => <VideoChatView {...props} />,
      mapStateToProps: ['videoChatView'],
    },
  ],
};

export default config;
