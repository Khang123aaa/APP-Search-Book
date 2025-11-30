// sagas/index.js
import {all} from 'redux-saga/effects';
import {SearchBooks} from './bookSaga';

export default function* rootSaga() {
  yield all([
    ...SearchBooks
  ]);
}