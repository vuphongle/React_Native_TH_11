// reducers/index.js

import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

console.log('taskReducer:', taskReducer); // Thêm dòng này để debug

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export default rootReducer;
