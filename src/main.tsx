import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import './index.css';
import { ConfigProvider } from 'antd';
import { global_theme } from './theme';
import { fetchMenuItems } from './thunk';
import { getCurrentRouteSegments } from './utils/common'
import { setLocations } from './features';

// // 自动生成菜单树

const Root: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentRoutes = getCurrentRouteSegments();
    dispatch(setLocations(currentRoutes));
    dispatch(fetchMenuItems() as any);
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
