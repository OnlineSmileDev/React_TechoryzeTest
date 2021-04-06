/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './Todos.css';

const Todos = (props) => {
  const [visible, setVisible] = useState(true);
  const todos = [
    {
      id: 0,
      title: 'Google',
      handler: props.actionProvider.handleAnswerEnvironment,
    },
    {
      id: 1,
      title: 'Apple',
      handler: props.actionProvider.handleAnswerEnvironment,
    },
    {
      id: 2,
      title: 'Microsoft',
      handler: props.actionProvider.handleAnswerEnvironment,
    },
  ];

  const renderTodos = () => {
    return todos.map((tudo) => {
      return (
        <button
          key={tudo.id}
          className="todos-widget-list-item"
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
        </button>
      );
    });
  };

  return <div className="todos-widget">{renderTodos()}</div>;
};

export default Todos;
