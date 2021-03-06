/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React from 'react';
import VideoCall from '../../helpers/simple-peer';
import '../../styles/video.css';
import io from 'socket.io-client';
import { getDisplayStream } from '../../helpers/media-access';
import ApiConstants from '../../api/ApiConstants';
import {
  ShareScreenIcon,
  MicOnIcon,
  MicOffIcon,
  CamOnIcon,
  CamOffIcon,
} from './Icons';
import { BsX } from 'react-icons/bs';
import apiCall from '../../libs/apiCall';
const socket = io(ApiConstants.BASE_URL);

class Video extends React.Component {
  constructor() {
    super();
    this.state = {
      localStream: {},
      remoteStreamUrl: '',
      streamUrl: '',
      initiator: false,
      peer: {},
      full: false,
      connecting: false,
      waiting: true,
      micState: true,
      camState: true,
    };
  }
  videoCall = new VideoCall();

  componentDidMount() {
    const component = this;
    this.setState({ socket });
    const roomId = this.props.roomId;
    this.getUserMedia().then(() => {
      socket.emit('join', { roomId: roomId });
    });

    socket.on('init', () => {
      component.setState({ initiator: true });
    });
    socket.on('ready', () => {
      component.enter(roomId);
    });
    socket.on('desc', (data) => {
      if (data.type === 'offer' && component.state.initiator) return;
      if (data.type === 'answer' && !component.state.initiator) return;
      component.call(data);
    });
    socket.on('disconnected', () => {
      component.setState({ initiator: true });
    });
    socket.on('full', () => {
      component.setState({ full: true });
    });

    socket.on('videoChatAccept', (data) => {
      if (this.state.localStream.getAudioTracks().length > 0) {
        this.state.localStream.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
      }
      if (this.state.localStream.getVideoTracks().length > 0) {
        this.state.localStream.getVideoTracks().forEach((track) => {
          track.enabled = false;
        });
      }
      window.location.reload();
      this.props.closeModal();
    });
  }

  getUserMedia(cb) {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      const op = {
        video: true,
        audio: true,
      };

      navigator.mediaDevices.getUserMedia(op).then(
        (stream) => {
          this.setState({ streamUrl: stream, localStream: stream });
          this.localVideo.srcObject = stream;
          resolve();
        },
        (err) => console.error(err)
      );
    });
  }

  setAudioLocal() {
    if (this.state.localStream.getAudioTracks().length > 0) {
      this.state.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    this.setState({
      micState: !this.state.micState,
    });
  }

  setVideoLocal() {
    if (this.state.localStream.getVideoTracks().length > 0) {
      this.state.localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    this.setState({
      camState: !this.state.camState,
    });
  }

  getDisplay() {
    getDisplayStream().then((stream) => {
      stream.oninactive = () => {
        this.state.peer.removeStream(this.state.localStream);
        this.getUserMedia().then(() => {
          this.state.peer.addStream(this.state.localStream);
        });
      };
      this.setState({ streamUrl: stream, localStream: stream });
      this.localVideo.srcObject = stream;
      this.state.peer.addStream(stream);
    });
  }

  enter = (roomId) => {
    this.setState({ connecting: true });
    const peer = this.videoCall.init(
      this.state.localStream,
      this.state.initiator
    );
    this.setState({ peer });

    peer.on('signal', (data) => {
      const signal = {
        room: roomId,
        desc: data,
      };
      this.state.socket.emit('signal', signal);
    });
    peer.on('stream', (stream) => {
      this.remoteVideo.srcObject = stream;
      this.setState({ connecting: false, waiting: false });
    });
    peer.on('error', function (err) {
      console.log(err);
    });
  };

  call = (otherId) => {
    this.videoCall.connect(otherId);
  };
  renderFull = () => {
    if (this.state.full) {
      return 'The room is full';
    }
  };

  setGoback = () => {
    if (this.state.localStream.getAudioTracks().length > 0) {
      this.state.localStream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
    }
    if (this.state.localStream.getVideoTracks().length > 0) {
      this.state.localStream.getVideoTracks().forEach((track) => {
        track.enabled = false;
      });
    }
    this.props.closeModal();
  };

  render() {
    return (
      <div className="video-wrapper">
        <div className="video-header-view">
          <h className="video-header-text">Evgen Ropaiev</h>
          <button
            className="back-btn"
            onClick={() => {
              this.setGoback();
            }}
          >
            <BsX className="back-icon" />
          </button>
        </div>

        <div className="local-video-wrapper-container">
          <div className="local-video-wrapper">
            <video
              autoPlay
              id="localVideo"
              muted
              resizeMode={'contain'}
              controls={true}
              ref={(video) => (this.localVideo = video)}
            />
          </div>
          <div className="controls">
            <button
              className="control-btn"
              onClick={() => {
                this.setAudioLocal();
              }}
            >
              {this.state.micState ? <MicOnIcon /> : <MicOffIcon />}
            </button>
            <button
              className="control-btn"
              onClick={() => {
                this.getDisplay();
              }}
            >
              <ShareScreenIcon />
            </button>
            <button
              className="control-btn"
              onClick={() => {
                this.setVideoLocal();
              }}
            >
              {this.state.camState ? <CamOnIcon /> : <CamOffIcon />}
            </button>
          </div>

          <div className="local-video-wrapper1">
            <video
              autoPlay
              className={`${
                this.state.connecting || this.state.waiting ? 'hide' : ''
              }`}
              id="remoteVideo"
              ref={(video) => (this.remoteVideo = video)}
            />
          </div>
        </div>

        {this.state.connecting && (
          <div className="status">
            <p>Establishing connection...</p>
          </div>
        )}
        {this.state.waiting && (
          <div className="status">
            <p>Waiting for someone...</p>
          </div>
        )}
      </div>
    );
  }
}

export default Video;
