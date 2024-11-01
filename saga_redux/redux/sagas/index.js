// src/redux/sagas/index.js

import { all } from 'redux-saga/effects';
import taskSagas from './taskSagas';

export default function* rootSaga() {
  yield all([
    taskSagas(),
    // Add other sagas here if needed
  ]);
}
