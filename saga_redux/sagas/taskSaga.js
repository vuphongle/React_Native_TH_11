// sagas/taskSaga.js

import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_TASKS_REQUEST,
  fetchTasksSuccess,
  fetchTasksFailure,
  ADD_TASK_REQUEST,
  addTaskSuccess,
  addTaskFailure,
  DELETE_TASK_REQUEST,
  deleteTaskSuccess,
  deleteTaskFailure,
  UPDATE_TASK_REQUEST,
  updateTaskSuccess,
  updateTaskFailure,
} from '../actions/taskActions';

const API_URL = 'https://6707f41d8e86a8d9e42d968b.mockapi.io/data';

// Fetch Tasks
function* fetchTasks() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

// Add Task
function* addTask(action) {
  try {
    const response = yield call(axios.post, API_URL, { title: action.payload });
    yield put(addTaskSuccess(response.data));
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

// Delete Task
function* deleteTask(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteTaskSuccess(action.payload));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

// Update Task
function* updateTask(action) {
  try {
    const { id, title } = action.payload;
    const response = yield call(axios.put, `${API_URL}/${id}`, { title });
    yield put(updateTaskSuccess(response.data));
  } catch (error) {
    yield put(updateTaskFailure(error.message));
  }
}

function* taskSaga() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasks);
  yield takeEvery(ADD_TASK_REQUEST, addTask);
  yield takeEvery(DELETE_TASK_REQUEST, deleteTask);
  yield takeEvery(UPDATE_TASK_REQUEST, updateTask);
}

export default taskSaga;
