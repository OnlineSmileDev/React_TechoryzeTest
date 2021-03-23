import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Chatbot from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './config';
import apiCall from '../../libs/apiCall';
import ApiConstants from '../../api/ApiConstants';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    apiCall(
      ApiConstants.CREATE_CONVERSATION,
      {
        userName: '',
      },
      'POST'
    );
  }, [dispatch]);

  return (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
      headerText="User"
    />
  );
};

export default Main;
