import { createSlice } from "@reduxjs/toolkit";

// Part1: Define Slice (including reducers and actions)

const initialState = { fileName: '', hasInit: false };
const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFileName: (state, action) => {
      const fileName = action.payload;
      state.fileName = fileName;
    },
    setHasInit: (state, action) => {
      const hasInit = action.payload;
      state.hasInit = hasInit;
    }
  },
});

// export state to global
export const selectFileName = (state) => state.file.fileName;
export const selectHasInit = (state) => state.file.hasInit;

// export actions to global
export const { setFileName, setHasInit } = fileSlice.actions;

// export reducer to global
export default fileSlice.reducer;
