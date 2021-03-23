import { takeEvery, call, put } from 'redux-saga/effects';
import { createConversationApi } from '../../api/conversationApi';
import { CREATE_CONVERSATION } from './actionTypes';

import {
  createConversationForcastSuccess,
  createConversationFail,
} from './reducer';

function* crateConversation(action) {
  try {
    const response = yield call(createConversationApi, action.payload.city);
    if (response.cod === '200') {
      yield put(createConversationForcastSuccess(response));
    } else {
      yield put(createConversationFail(response.cod));
    }
  } catch (err) {
    console.log('err:', err);
    yield put(createConversationFail(err));
  }
}

export const saga = function* () {
  yield takeEvery(CREATE_CONVERSATION, crateConversation);
};
