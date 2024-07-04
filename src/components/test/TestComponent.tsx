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
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (amount: number) => void;
  decrementByAmount: (amount: number) => void;
};

export class TestComponent extends Component<TestProps> {
//   constructor(props: TestProps) {
//     super(props);
//   }

  render(): ReactNode {
    const { count, increment, decrement, incrementByAmount, decrementByAmount } = this.props; // 解构state和actions
    return (
      <div>
        <h1>Counter: {count}</h1>
        <button
          className={classname(['button', 'increment'])}
          onClick={increment}
        >
          increment
        </button>
        <button
          className={classname(['button', 'decrement'])}
          onClick={decrement}
        >
          decrement
        </button>
        <button
          className={classname(['button', 'decrement'])}
          onClick={incrementByAmount && incrementByAmount.bind(this, 5)}
        >
          incrementByAmount
        </button>
        <button
          className={classname(['button', 'decrement'])}
          onClick={decrementByAmount && decrementByAmount.bind(this, 5)}
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
  decrementByAmount
};

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
