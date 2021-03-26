/* eslint-disable react/prop-types */
import React from 'react';
import './ChatHeader.css';
import { BsFillCameraVideoFill, BsX } from 'react-icons/bs';

const ChatHeader = (props) => {
  const handleEndChat = (e) => {
    return props.handleEndChat();
  };

  const handleVideo = () => {
    return props.handleVideo();
  };

  return (
    <div className="chat-header-view">
      <button className="chat-header-video-btn" onClick={() => handleVideo()}>
        <BsFillCameraVideoFill className="chat-header-video-icon" />
      </button>
      <h>User</h>
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
