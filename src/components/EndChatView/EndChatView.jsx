/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'reactstrap';
import './EndChatView.css';

const EndChatView = (props) => {
  const todos = [
    {
      id: 0,
      title: 'Yes',
      handler: props.actionProvider.handleAnswerEndChat,
    },
    {
      id: 1,
      title: 'No',
      handler: props.actionProvider.handleAnswerEndChat,
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

export default EndChatView;
