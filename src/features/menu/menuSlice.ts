import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageMetaType } from '../../types';

export type MenuItem = {
  key: string;
  label: string;
  path: string;
  children?: MenuItem[] | undefined | null;
  data: PageMetaType;
  icon?: string;
};

export type RouteData = {
  key: string;
  path: string;
  componentPath: string; // 储存组件的路径
};

export type MenuState = {
  items: MenuItem[];
  currentData: CurrentData;
  routes: RouteData[];
  isLoading: boolean; // 添加加载状态标志
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
  isLoading: true, // 初始状态为加载中
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
      state.isLoading = false; // 数据加载完成
    },
    setCurrentData: (state, action: PayloadAction<CurrentData>) => {
      state.currentData = action.payload;
    },

    setRoutes: (state, action: PayloadAction<RouteData[]>) => {
      state.routes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload; // 更新加载状态
    },
  },
});

export const { setMenuItems, setCurrentData, setRoutes, setLoading } =
  menuSlice.actions;
export const MenuReducer = menuSlice.reducer;
export default MenuReducer;
