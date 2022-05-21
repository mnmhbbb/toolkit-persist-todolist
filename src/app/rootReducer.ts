import { combineReducers } from '@reduxjs/toolkit';
import todoSlice from '../slices/todoSlice';

const reducer = combineReducers({
  todoSlice,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
