import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './fileSlice';

// Part2: Combine Reducers and Create a Store
export const store = configureStore({
   reducer: {
     file: fileReducer,
   },
   devTools: process.env.NODE_ENV !== 'production',
 });



