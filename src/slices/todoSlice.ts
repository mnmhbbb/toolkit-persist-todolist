import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt: string;
  createdAt: string;
  modifiedAt: string;
  deadline: string;
  dday: number;
  tags: Tags[];
  tagNameArr: string[];
}

export interface Tags {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  createdAt: string;
}

const initialState = {
  items: [
    {
      id: 'init',
      title: '',
      description: '',
      completed: false,
      completedAt: '',
      createdAt: '',
      modifiedAt: '',
      deadline: '',
      dday: 0,
      tagNameArr: ['tag1', 'tag2'],
      tags: [
        {
          id: '1',
          name: 'tag1',
          color: '#fff',
          bgColor: '#87abe4',
          createdAt: '2022-05-22',
        },
        {
          id: '2',
          name: 'tag2',
          color: '#fff',
          bgColor: '#87abe4',
          createdAt: '2022-05-22',
        },
      ],
    },
  ],
  tagList: [
    {
      id: '1',
      name: 'tag1',
      color: '#fff',
      bgColor: '#87abe4',
      createdAt: '2022-05-22',
    },
    {
      id: '2',
      name: 'tag2',
      color: '#fff',
      bgColor: '#87abe4',
      createdAt: '2022-05-22',
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
      tags: [
        {
          id: '',
          name: '',
          color: '',
          bgColor: '',
          createdAt: '',
        },
      ],
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
    closeForm(state) {
      state.isOpen = false;
      state.isEdit = false;
    },
    add(state, action: PayloadAction<Todo>) {
      action.payload.id = uuidv4();
      state.items.push(action.payload);
      state.isOpen = false;
    },
    remove(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter((todo) => todo.id !== action.payload.id);
    },
    toggle(state, action: PayloadAction<{ id: string; completedAt: string }>) {
      state.items.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed;
          todo.completedAt = action.payload.completedAt;
        }
      });
    },
    editMode(state, action: PayloadAction<{ id: string }>) {
      state.isEdit = true;
      state.isOpen = true;
      state.editValue = state.items.filter((todo) => todo.id === action.payload.id);
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
    addTagList(state, action: PayloadAction<Tags>) {
      action.payload.id = uuidv4();
      state.tagList.push(action.payload);
    },
    removeTagList(state, action: PayloadAction<{ name: string }>) {
      state.tagList = state.tagList.filter((tag) => tag.name !== action.payload.name);
    },
  },
});

export const {
  addTagList,
  removeTagList,
  toggleForm,
  closeForm,
  toggle,
  add,
  remove,
  editMode,
  modified,
  removeCompleted,
  dday,
} = todoSlice.actions;
export default todoSlice.reducer;
