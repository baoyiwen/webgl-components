import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { testCounterReducer, MenuReducer, RouterReducer } from '../features';


const rootReducer = combineReducers({
  testCounter: testCounterReducer,
  menuContent: MenuReducer,
  routerContent: RouterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; // 获取store的状态的类型
export type AppDispatch = typeof store.dispatch;
export default store;
