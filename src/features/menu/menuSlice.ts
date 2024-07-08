import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageMetaType } from '../../types';
import { ComponentType } from 'react';

export type MenuItem = {
  key: string;
  label: string;
  path: string;
  children?: MenuItem[] | undefined | null;
  data: PageMetaType;
};

export type RouteData = {
  key: string;
  path: string;
  component: ComponentType;
};

export type MenuState = {
  items: MenuItem[];
  currentData: CurrentData;
  routes: RouteData[];
};

export type CurrentData = {
  currentMenu: MenuItem;
  currentKey: string;
  currentPath: string;
};

const initialState: MenuState = {
  items: [],
  currentData: {
    currentMenu: {
      key: '',
      label: '',
      path: '',
      data: {
        label: '',
        path: '',
      },
    },
    currentKey: '',
    currentPath: '',
  },
  routes: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    setCurrentData: (state, action: PayloadAction<CurrentData>) => {
      state.currentData = action.payload;
    },

    setRoutes: (state, action: PayloadAction<RouteData[]>) => {
      state.routes = action.payload;
    },
  },
});

export const { setMenuItems, setCurrentData, setRoutes } = menuSlice.actions;
export const MenuReducer = menuSlice.reducer;
export default MenuReducer;
