// src/redux/sagas/taskSagas.js

import { call, put, takeLatest } from 'redux-saga/effects';
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

// API URL
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
    const response = yield call(axios.post, API_URL, { title: action.payload.title });
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

export default function* taskSagas() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasks);
  yield takeLatest(ADD_TASK_REQUEST, addTask);
  yield takeLatest(DELETE_TASK_REQUEST, deleteTask);
  yield takeLatest(UPDATE_TASK_REQUEST, updateTask);
}
