import { ReactNode } from 'react';
import {
  ResizableComponent,
  ResizableComponentProps,
  ResizableComponentState,
} from '../components';

export type ScrollLayoutTestProps = ResizableComponentProps & {};

export type ScrollLayoutTestStates = ResizableComponentState & {};

export class ScrollLayoutTest extends ResizableComponent<
  ScrollLayoutTestProps,
  ScrollLayoutTestStates
> {
  static meta = {
    path: '/scroll-layout-page',
    label: 'Scroll Layout Page',
    title: 'Scroll Layout 实例',
    icon: 'BugOutlined',
  };

  constructor(props: ScrollLayoutTestProps) {
    super(props);
  }

  protected renderContent(): ReactNode {
    return (
      <div
        className="scroll-layout-page-root"
        style={{
          width: '100%',
          height: '10000px',
          backgroundColor: '#00f',
        }}
      ></div>
    );
  }
}

export default ScrollLayoutTest;
