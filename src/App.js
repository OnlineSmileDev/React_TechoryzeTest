import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Chat from './views/chat/Chat';
import { GoToRoomInput } from './views/chat/GoToRoomInput';
import Video from './views/chat/Video';
import './App.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" exact component={GoToRoomInput} />
          <Route path="/:roomId" exact component={Video} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
