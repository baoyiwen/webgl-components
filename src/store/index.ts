import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { testCounterReducer } from '../features';

const rootReducer = combineReducers({
  testCounter: testCounterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; // 获取store的状态的类型
export type AppDispath = typeof store.dispatch;
export default store;
