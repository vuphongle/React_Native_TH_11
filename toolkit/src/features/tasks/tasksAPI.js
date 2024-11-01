// src/features/tasks/tasksAPI.js

import axios from 'axios';

// API URL
const API_URL = 'https://6707f41d8e86a8d9e42d968b.mockapi.io/data';

/**
 * Lấy danh sách công việc từ API
 * @returns {Promise<Array>} Danh sách công việc
 */
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Thêm công việc mới vào API
 * @param {string} title Tiêu đề công việc
 * @returns {Promise<Object>} Công việc vừa thêm
 */
export const createTask = async (title) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

/**
 * Xóa công việc khỏi API
 * @param {string|number} id ID của công việc
 * @returns {Promise<string|number>} ID của công việc đã xóa
 */
export const removeTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

/**
 * Cập nhật công việc trong API
 * @param {Object} task Đối tượng công việc cần cập nhật
 * @param {string|number} task.id ID của công việc
 * @param {string} task.title Tiêu đề mới của công việc
 * @returns {Promise<Object>} Công việc đã được cập nhật
 */
export const editTask = async ({ id, title }) => {
  const response = await axios.put(`${API_URL}/${id}`, { title });
  return response.data;
};
