/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Chatbot from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './config';
import apiCall from '../../libs/apiCall';
import ApiConstants from '../../api/ApiConstants';
import Video from './Video';
import shortId from 'shortid';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(ApiConstants.BASE_URL);

export function Chat({ history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    apiCall(
      ApiConstants.CREATE_CONVERSATION,
      {
        userName: '',
      },
      'POST'
    );
    socket.on('incomingSessionVideoOption', (data) => {
      setTimeout(() => history.push(`/${shortId.generate()}`), 2000);
    });
  }, [dispatch]);

  return (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
      headerText="User"
    />
  );
}
