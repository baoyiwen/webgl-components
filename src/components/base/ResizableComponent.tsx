import { PageMetaType } from '../../types';
import { MetaComponentProps, MetaComponent } from './MetaComonent';
import { RefObject, createRef, ReactNode } from 'react';

export type ResizableComponentProps = MetaComponentProps & {};
export type ResizableComponentState = {
  width: number;
  height: number;
};

export abstract class ResizableComponent<
  P = ResizableComponentProps,
  S = ResizableComponentState,
> extends MetaComponent<P, S> {
  static meta: PageMetaType = {
    label: '监听大小变化组件',
    path: '',
    discription: `这个组件监听了组件容器的大小变化，
    当组件容器发生resize时会执行对应的方法。该方法也暴露出了resize时的执行方法，在使用时你应该先用super调用一次方法，
    不然会引起一部分组件功能不工作。`,
  };

  containerRef!: RefObject<HTMLDivElement>;
  private resizeObserver!: ResizeObserver;

  constructor(props: P) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    } as S;
    this.containerRef = createRef();
    this.handleResize = this.handleResize.bind(this);
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === this.containerRef.current) {
          this.handleResize(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });
  }

  handleResize(width: number, height: number) {
    this.setState({
      width,
      height,
    } as S);
  }
  componentDidMount(): void {
    if (this.containerRef.current) {
      this.resizeObserver.observe(this.containerRef.current);
      // 初始化大小
      const { clientHeight, clientWidth } = this.containerRef.current;
      this.handleResize(clientWidth, clientHeight);
    }
  }

  componentWillUnmount(): void {
    if (this.containerRef.current) {
      this.resizeObserver.unobserve(this.containerRef.current);
    }
  }

  protected abstract renderContent(): ReactNode;

  render(): ReactNode {
    return (
      <div ref={this.containerRef} style={{ width: '100%', height: '100%' }}>
        {this.renderContent()}
      </div>
    );
  }
}
