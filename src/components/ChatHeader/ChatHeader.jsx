/* eslint-disable react/prop-types */
import React from 'react';
import './ChatHeader.css';
import { BsCameraVideo, BsX } from 'react-icons/bs';
import { VscDeviceCameraVideo } from 'react-icons/vsc';

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
        <VscDeviceCameraVideo className="chat-header-video-icon" />
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
