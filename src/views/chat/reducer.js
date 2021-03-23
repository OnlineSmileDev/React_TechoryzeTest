import { handleActions } from 'redux-actions';

import { defineLoopActions, requestLoopHandlers } from '../../libs/state';
import { REQUEST_STATUS } from '../../config/constants';

import { CREATE_CONVERSATION } from './actionTypes';

/* Initial state */
const initialState = {
  success: false,
  conversation_info: {},
  state: REQUEST_STATUS.INITIAL,
};

export const {
  start: createConversationForcast,
  success: createConversationForcastSuccess,
  fail: createConversationFail,
} = defineLoopActions(CREATE_CONVERSATION);

export const createConversationReducer = handleActions(
  {
    ...requestLoopHandlers({
      action: CREATE_CONVERSATION,
      onSuccess: (state, payload) => {
        return {
          ...state,
          conversation_info: payload,
          state: REQUEST_STATUS.SUCCESS,
        };
      },
      onFail: (state, payload) => {
        return {
          ...state,
          conversation_info: {},
          state: REQUEST_STATUS.FAIL,
        };
      },
    }),
  },
  initialState
);
