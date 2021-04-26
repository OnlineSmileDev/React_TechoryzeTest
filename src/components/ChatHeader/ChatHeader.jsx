/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './ChatHeader.css';
import { BsX } from 'react-icons/bs';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import ApiConstants from '../../api/ApiConstants';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient(ApiConstants.BASE_URL);

const ChatHeader = (props) => {
  const handleEndChat = (e) => {
    return props.handleEndChat();
  };

  const handleVideo = () => {
    return props.handleVideo();
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    socket.on('chatAccept', (data) => {
      if (data) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    });
  }, []);

  return (
    <div className="chat-header-view">
      <button className="chat-header-video-btn" onClick={() => handleVideo()}>
        {modalIsOpen && (
          <VscDeviceCameraVideo className="chat-header-video-icon" />
        )}
      </button>
      <h className="chat-header-name">Evgen Ropaiev</h>
      <button
        className="chat-header-cancel-btn"
        onClick={() => handleEndChat()}
      >
        <BsX className="chat-header-cancel-icon" />
      </button>
    </div>
  );
};

export default ChatHeader;
