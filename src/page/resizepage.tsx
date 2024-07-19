import { ReactNode } from 'react';
import {
  ResizableComponent,
  ResizableComponentProps,
  ResizableComponentState,
} from '../components';

export type ResizePageProps = ResizableComponentProps & {};

export type ResizePageState = ResizableComponentState & {};

export class ResizePage extends ResizableComponent<
  ResizePageProps,
  ResizePageState
> {
  static meta = {
    path: '/resize-page',
    label: 'Resize Page',
    title: 'Resize 实例',
    icon: 'BugOutlined',
  };
  constructor(props: ResizePageProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  protected renderContent(): ReactNode {
    return (
      <div className="resize-root">
        <p>width: {this.state.height}</p>
      </div>
    );
  }
}

export default ResizePage;
