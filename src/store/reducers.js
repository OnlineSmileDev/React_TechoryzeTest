/*
 * combines all th existing reducers
 */

import { combineReducers } from 'redux';
import { createConversationReducer } from '../views/chat/reducer';

const appReducer = combineReducers({
  conversation: createConversationReducer,

  // but its referenced here
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
