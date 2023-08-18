import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toastSlice';

// 스토어는 Slice를 등록시켜주는 작업만 하면 된다.
export const store = configureStore({
  reducer: {
    toast : toastReducer
  }
})