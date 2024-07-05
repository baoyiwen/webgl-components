import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import { ConfigProvider } from 'antd';
import { global_theme } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={global_theme}>
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
