import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  modifiedAt: string;
  deadline: string;
  dday: number;
}

const initialState = {
  items: [
    {
      id: '',
      title: '',
      description: '',
      completed: false,
      createdAt: '',
      modifiedAt: '',
      deadline: '',
      dday: 0,
    },
  ],
  isOpen: false,
  isEdit: false,
  editValue: [
    {
      id: '',
      title: '',
      description: '',
      completed: false,
      createdAt: '',
      modifiedAt: '',
      deadline: '',
    },
  ],
};

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    toggleForm(state, action: PayloadAction<{ isOpen: boolean }>) {
      state.isOpen = !action.payload.isOpen;
      state.isEdit = false;
    },
    add(state, action: PayloadAction<Todo>) {
      action.payload.id = uuidv4();
      state.items.push(action.payload);
      state.isOpen = false;
    },
    closeForm(state) {
      state.isOpen = false;
      state.isEdit = false;
    },
    toggle(state, action: PayloadAction<{ id: string }>) {
      state.items.forEach((todo) => {
        todo.completed = todo.id === action.payload.id ? !todo.completed : todo.completed;
      });
    },
    remove(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter((todo) => todo.id !== action.payload.id);
    },
    editMode(state, action: PayloadAction<{ id: string }>) {
      state.isEdit = true;
      state.isOpen = true;
      state.editValue = state.items.filter((todo) => (todo.id === action.payload.id ? todo : ''));
    },
    modified(state, action: PayloadAction<Todo>) {
      state.items = state.items.filter((todo) => todo.id !== action.payload.id);
      action.payload.id = uuidv4();
      state.items.push(action.payload);
      state.isOpen = false;
      state.isEdit = false;
      state.editValue = [];
    },
    removeCompleted(state) {
      state.items = state.items.filter((todo) => todo.completed === false);
    },
    dday(state) {
      const today: any = new Date();
      state.items.forEach((todo) => {
        const deadline: any = new Date(todo.deadline);
        const diff = deadline - today;
        todo.dday = Math.floor(diff / (1000 * 60 * 60 * 24));
      });
    },
  },
});

export const { toggleForm, add, closeForm, toggle, remove, editMode, modified, removeCompleted, dday } =
  todoSlice.actions;
export default todoSlice.reducer;
