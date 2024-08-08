import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../features';
import { loadPage } from '../utils/loadPage';
import {
  generateMenuDataByStore,
  setRoutesByStore,
  settingDefaultPagePath,
} from '../utils/generateMenuTree';

export const fetchMenuItems = createAsyncThunk<void, void, any>(
  'menu/fetchMenuItems',
  async (_, { dispatch }) => {
    dispatch(setLoading(true)); // 开始加载
    const pages = await loadPage();
    
    // 生成菜单数据并存入 Redux Store
    generateMenuDataByStore(pages, dispatch<any>);
    // 设置默认页面路径
    settingDefaultPagePath(pages, dispatch<any>);
    // 设置路由数据
    setRoutesByStore(pages, dispatch<any>);
    // dispatch(setMenuItems(pages)); // 设置菜单数据并标记加载完成
  },
);
