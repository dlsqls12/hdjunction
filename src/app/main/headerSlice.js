import { createSlice } from '@reduxjs/toolkit';
import COMMON_CONST from '../../common/constants';

const initialState = {
  shapeType: COMMON_CONST.SHAPE_TYPE_RECT,
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setShapeType: (state, action) => {
      state.shapeType = action.payload;
    }
  }
});

export const { setShapeType } = headerSlice.actions;

export default headerSlice.reducer;