import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestState } from '../../types';

const testInitState: TestState = {
  count: 0,
};

export const testCounterSlice = createSlice({
  name: 'test-counter-slice',
  initialState: testInitState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload; // 使用PayloadAction来指定action.payload的类型
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.count -= action.payload; // 使用PayloadAction来指定action.payload的类型
    },
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },
});

// 导出action creators, 及导出基本方法。
export const { increment, decrement, incrementByAmount, decrementByAmount } =
  testCounterSlice.actions;

// 导出reducer
export const testCounterReducer = testCounterSlice.reducer;
export default testCounterReducer;
