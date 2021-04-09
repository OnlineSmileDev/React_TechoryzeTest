/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import { Button } from 'reactstrap';
import { BsStarFill } from 'react-icons/bs';
import './RatingView.css';

const RatingView = (props) => {
  const [visible, setVisible] = useState(true);
  const todos = [
    {
      id: 0,
      rating: [{}, {}, {}, {}, {}],
      handler: props.actionProvider.handleRating,
    },
    {
      id: 1,
      rating: [{}, {}, {}, {}],
      handler: props.actionProvider.handleRating,
    },
    {
      id: 2,
      rating: [{}, {}, {}],
      handler: props.actionProvider.handleRating,
    },
    {
      id: 3,
      rating: [{}, {}],
      handler: props.actionProvider.handleRating,
    },
    {
      id: 4,
      rating: [{}],
      handler: props.actionProvider.handleRating,
    },
  ];

  const renderTodos = () => {
    return todos.map((tudo) => {
      return (
        <button
          key={tudo.id}
          className="rating-widget-list-item"
          onClick={
            visible
              ? () => {
                  tudo.handler(tudo.rating.length);
                  setVisible(false);
                }
              : null
          }
        >
          {tudo.rating.map((item, index) => (
            <BsStarFill className="chat-rating-icon" key={index} />
          ))}
        </button>
      );
    });
  };

  return <div className="todos-widget">{renderTodos()}</div>;
};

export default RatingView;
