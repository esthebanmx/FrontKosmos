import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isCollapsed: false  
};

const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    }
  }
});

export const globalAllState = (state) => state.global;

export const {
  setIsLoading,
  setIsCollapsed  
} = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
