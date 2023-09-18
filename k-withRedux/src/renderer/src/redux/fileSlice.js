import { createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const initialState = { fileName: '' };
const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFileName: (state, action) => {
      const fileName = action.payload;
      state.fileName = fileName;
    },
  },
});

// export state to global
export const selectFileName = (state) => state.file.fileName;

// export actions to global
export const { setFileName } = fileSlice.actions;

// export reducer to global
export default fileSlice.reducer;
