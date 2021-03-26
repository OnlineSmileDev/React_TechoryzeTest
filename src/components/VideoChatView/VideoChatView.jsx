/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'reactstrap';
import './VideoChatView.css';

const VideoChatView = (props) => {
  const todos = [
    {
      id: 0,
      title: 'Yes',
      handler: props.actionProvider.handleAnswerEndVideo,
    },
    {
      id: 1,
      title: 'No',
      handler: props.actionProvider.handleAnswerEndVideo,
    },
  ];

  const renderTodos = () => {
    return todos.map((tudo) => {
      return (
        <Button
          key={tudo.id}
          className="todos-widget-list-item"
          variant="contained"
          onClick={() => tudo.handler(tudo.title)}
        >
          {tudo.title}
        </Button>
      );
    });
  };

  return <div className="todos-widget">{renderTodos()}</div>;
};

export default VideoChatView;
