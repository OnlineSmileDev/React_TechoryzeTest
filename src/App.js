import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Chat } from './views/chat/Chat';
import Video from './views/chat/Video';
import './App.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="App">
            <Route path="/" exact component={Chat} className="App" />
            <Route path="/:roomId" exact component={Video} />
            {/* <Chat /> */}
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
