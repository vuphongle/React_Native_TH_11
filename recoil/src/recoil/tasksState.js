// src/recoil/tasksState.js

import { atom, selector } from 'recoil';
import axios from 'axios';

// API URL
const API_URL = 'https://6707f41d8e86a8d9e42d968b.mockapi.io/data';

// Atom để lưu trữ danh sách công việc
export const tasksState = atom({
  key: 'tasksState',
  default: [],
});

// Atom để lưu trạng thái tải dữ liệu
export const tasksLoadingState = atom({
  key: 'tasksLoadingState',
  default: false,
});

// Atom để lưu lỗi nếu có
export const tasksErrorState = atom({
  key: 'tasksErrorState',
  default: null,
});
