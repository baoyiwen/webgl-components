import { Component, ReactNode, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from '../../features';
import classname from 'classnames';
import { Button, Card } from 'antd';

interface TestProps extends HTMLAttributes<any> {
  count: number;
  increment: (amount: number) => void;
  decrement: (amount: number) => void;
  incrementByAmount: (amount: number) => void;
  decrementByAmount: (amount: number) => void;
}

export class TestComponent extends Component<TestProps> {
  // constructor(props: TestProps) {
  //   super(props);
  // }

  render(): ReactNode {
    const {
      count,
      increment,
      decrement,
      incrementByAmount,
      decrementByAmount,
    } = this.props; // 解构state和actions
    return (
      <div {...this.props}>
        <Card>Counter: {count}</Card>
        <Button
          className={classname(['Button', 'increment'])}
          onClick={increment?.bind(this, 1)}
        >
          increment
        </Button>
        <Button
          className={classname(['Button', 'decrement'])}
          onClick={decrement?.bind(this, 1)}
        >
          decrement
        </Button>
        <Button
          className={classname(['Button', 'incrementByAmount'])}
          onClick={incrementByAmount?.bind(this, 5)}
        >
          incrementByAmount
        </Button>
        <Button
          className={classname(['Button', 'decrementByAmount'])}
          onClick={decrementByAmount?.bind(this, 5)}
        >
          decrementByAmount
        </Button>
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
