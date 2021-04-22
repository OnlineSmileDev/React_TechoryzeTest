/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Chatbot from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './config';
import apiCall from '../../libs/apiCall';
import ApiConstants from '../../api/ApiConstants';
import shortId from 'shortid';
import socketIOClient from 'socket.io-client';
import Video from './Video';
import Modal from 'react-modal';

const socket = socketIOClient(ApiConstants.BASE_URL);

const customStyles = {
  content: {
    width: 'auto',
    height: 'auto',
  },
};

export function Chat({ history }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('chat_auto_messages2', JSON.stringify([]));
    apiCall(
      ApiConstants.CREATE_CONVERSATION,
      {
        userName: '',
      },
      'POST'
    );
    socket.on('incomingSessionVideoOption', (data) => {
      if (data.status === 'Yes') {
        // setTimeout(() => history.push(`/${shortId.generate()}`), 2000);
        setTimeout(() => setIsOpen(true), 3000);
      }
    });
  }, [dispatch]);

  function closeModal() {
    setIsOpen(false);
  }

  const validator = (value) => {
    const messages = JSON.parse(localStorage.getItem('chat_auto_messages2'));

    if (messages.length === 0) {
      return /^[A-Za-z][A-Za-z\'\-]*/.test(value);
    } else if (messages.length === 3) {
      return;
    } else if (messages.length === 5) {
      return true;
    } else if (messages.length >= 8) {
      if (
        messages[messages.length - 1].message ===
        'Another epxert is being connected for help'
      ) {
        return;
      } else if (
        messages[messages.length - 1].message ===
          'Do you want to end the chat?' ||
        messages[messages.length - 1].message.includes('OK. How did') ||
        messages[messages.length - 1].message.includes(
          'Do you want to use video chat'
        )
      ) {
        return;
      } else {
        return true;
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        validator={validator}
        headerText="Evgen Ropaiev"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Video roomId={shortId.generate()} closeModal={closeModal} />
      </Modal>
    </div>
  );
}
