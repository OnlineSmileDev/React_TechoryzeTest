/* eslint-disable react/prop-types */
import React from 'react';
import './ChatHeader.css';
import { BsFillCameraVideoFill, BsX } from 'react-icons/bs';

const ChatHeader = (props) => {
  const handleSubmit = (e) => {
    return props.handleEndChat();
  };

  return (
    <div className="chat-header-view">
      <button className="chat-header-video-btn">
        <BsFillCameraVideoFill className="chat-header-video-icon" />
      </button>
      <h>User</h>
      <button className="chat-header-cancel-btn" onClick={() => handleSubmit()}>
        <BsX className="chat-header-cancel-icon" />
      </button>
    </div>
  );
};

export default ChatHeader;
