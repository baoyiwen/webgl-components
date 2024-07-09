import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import './index.css';
import { ConfigProvider } from 'antd';
import { global_theme } from './theme';
import { fetchMenuItems } from './thunk';

// // 自动生成菜单树

const Root: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMenuItems() as any);
    // const loadAndSetPages = async () => {
    //   // const pages = await loadPage();
    //   // // 生成菜单数据并存入 Redux Store
    //   // generateMenuDataByStore(pages);
    //   // // 设置默认页面路径
    //   // settingDefaultPagePath(pages);
    //   // // 设置路由数据
    //   // setRoutesByStore(pages);

    // };

    //  loadAndSetPages();
  }, [dispatch]);

  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={global_theme}>
        <Root />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
