import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from '../../features';
import classname from 'classnames';

interface TestProps {
  count: number;
  increment: (amount: number) => void;
  decrement: (amount: number) => void;
  incrementByAmount: (amount: number) => void;
  decrementByAmount: (amount: number) => void;
}

export class TestComponent extends Component<TestProps> {
  constructor(props: TestProps) {
    super(props);
  }

  render(): ReactNode {
    const {
      count,
      increment,
      decrement,
      incrementByAmount,
      decrementByAmount,
    } = this.props; // 解构state和actions
    return (
      <div>
        <h1>Counter: {count}</h1>
        <button
          className={classname(['button', 'increment'])}
          onClick={increment?.bind(this, 1)}
        >
          increment
        </button>
        <button
          className={classname(['button', 'decrement'])}
          onClick={decrement?.bind(this, 1)}
        >
          decrement
        </button>
        <button
          className={classname(['button', 'incrementByAmount'])}
          onClick={incrementByAmount?.bind(this, 5)}
        >
          incrementByAmount
        </button>
        <button
          className={classname(['button', 'decrementByAmount'])}
          onClick={decrementByAmount?.bind(this, 5)}
        >
          decrementByAmount
        </button>
      </div>
    );
  }
}

// 映射state到props
const mapStateToProps = (state: RootState) => ({
  count: state.testCounter.count,
});

// 映射dispatch到props
const mapDispatchToProps = {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
};

export const TestMapComponents = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestComponent);

export default TestMapComponents;
