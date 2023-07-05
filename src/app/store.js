import { configureStore } from '@reduxjs/toolkit'
import headerSlice from './main/headerSlice';
import contentSlice from './main/contentSlice';

export const store = configureStore({
  reducer: {
    header: headerSlice,
    content: contentSlice
  },
});