/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';
import { saga as chatSaga } from '../views/chat/sagas';

export default function* rootSaga() {
  yield all([chatSaga()]);
}
