/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './EndChatView.css';

const EndChatView = (props) => {
  const [visible, setVisible] = useState(true);
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
          onClick={
            visible
              ? () => {
                  tudo.handler(tudo.title);
                  setVisible(false);
                }
              : null
          }
        >
          {tudo.title}
        </Button>
      );
    });
  };

  return <div className="todos-widget">{renderTodos()}</div>;
};

export default EndChatView;
