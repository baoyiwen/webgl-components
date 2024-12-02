import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RouterSliceData = {
  locations?: string[] | null;
};

const initRouterData: RouterSliceData = {
  locations: null,
};

export const RouterSlice = createSlice({
  name: 'router',
  initialState: initRouterData,
  reducers: {
    setLocations: (state, action: PayloadAction<string[]>) => {
      state.locations = action.payload;
    },
    clearLocations: state => {
      state.locations = null;
    },
  },
});

export const { setLocations, clearLocations } = RouterSlice.actions;
export const RouterReducer = RouterSlice.reducer;
export default RouterReducer;
