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
      state.selectedShape = state.drawList.length - 1;
    },
    removeDrawList: (state, action) => {
      state.drawList.splice(action.payload, 1);
      state.selectedShape = -1;
    },
    clearDrawList: (state) => {
      state.drawList = [];
      state.selectedShape = -1;
    },
    setSelectedShape: (state, action) => {
      state.selectedShape = action.payload;
    },
    setLastIndex: (state, action) => {
      const drawObj = state.drawList.splice(action.payload, 1);
      state.drawList = [].concat(...state.drawList, drawObj);
      state.selectedShape = -1;
    },
    setFirstIndex: (state, action) => {
      const drawObj = state.drawList.splice(action.payload, 1);
      state.drawList = [].concat(drawObj, ...state.drawList);
      state.selectedShape = -1;
    }
  }
});

export const { addDrawList, removeDrawList, clearDrawList, setSelectedShape, setLastIndex, setFirstIndex } = contentSlice.actions;

export default contentSlice.reducer;