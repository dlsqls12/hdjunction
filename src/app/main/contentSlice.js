import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawList: [],
  selectedShape: -1
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    addDrawList: (state, action) => {
      state.drawList.push(action.payload);
    },
    removeDrawList: (state, action) => {
      state.drawList.splice(action.payload, 1);
      state.selectedShape = -1;
    },
    clearDrawList: (state) => {
      state.drawList = [];
    },
    setSelectedShape: (state, action) => {
      state.selectedShape = action.payload;
    }
  }
});

export const { addDrawList, removeDrawList, clearDrawList, setSelectedShape } = contentSlice.actions;

export default contentSlice.reducer;