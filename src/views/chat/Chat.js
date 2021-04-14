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
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: '80%',
  },
};

export function Chat({ history }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    localStorage.setItem('chat_auto_messages2', JSON.stringify([]));
    setIndex(0);
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
    console.log('===>', messages);

    if (messages.length === 0) {
      return true;
    } else if (messages.length === 2) {
      return;
    } else if (messages.length === 4) {
      return true;
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
        headerText="User"
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
