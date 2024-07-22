import {
  CSSProperties,
  ReactNode,
  createRef,
  RefObject,
  Component,
} from 'react';
import {
  ResizableComponent,
  ResizableComponentProps,
  ResizableComponentState,
} from '../base/ResizableComponent';

import styles from './less/SrollLayout.module.less';

export type ScrollLayoutProps = ResizableComponentProps & {};

export type ScrollLayoutState = ResizableComponentState & {
  thumbHeight: number;
  thumbTop: number;
  isDragging: boolean;
  startY: number;
  startTop: number;
  lastScrollTop: number;
  velocity: number;
  momentum: boolean;
};

export class ScrollLayout extends ResizableComponent<
  ScrollLayoutProps,
  ScrollLayoutState
> {
  contentRef: RefObject<HTMLDivElement>;
  private momentumAnimationFrame: number | null;
  private mutationObserver!: MutationObserver; // 监听内容变化
  constructor(props: ScrollLayoutProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      thumbHeight: 0,
      thumbTop: 0,
      isDragging: false,
      startY: 0,
      startTop: 0,
      lastScrollTop: 0,
      velocity: 0,
      momentum: false,
    };
    this.contentRef = createRef();
    this.momentumAnimationFrame = null;
    this.mutationObserver = new MutationObserver(this.updateThumbSize);
  }

  componentDidMount() {
    super.componentDidMount();
    this.updateThumbSize();
    window.addEventListener('resize', this.updateThumbSize);
    if (this.contentRef.current) {
      this.mutationObserver.observe(this.contentRef.current, {
        childList: true,
        subtree: true,
      });
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('resize', this.updateThumbSize);
    if (this.momentumAnimationFrame !== null) {
      window.cancelAnimationFrame(this.momentumAnimationFrame);
    }
    this.mutationObserver.disconnect();
  }

  updateThumbSize = () => {
    if (this.contentRef.current) {
      const { clientHeight, scrollHeight } = this.contentRef.current;
      const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
      this.setState({ thumbHeight });
    }
  };

  handleScroll = (scrollTop: number) => {
    if (this.contentRef.current) {
      const { scrollHeight, clientHeight } = this.contentRef.current;
      const thumbTop = (scrollTop / scrollHeight) * clientHeight;
      const velocity = scrollTop - this.state.lastScrollTop;

      this.contentRef.current.scrollTop = scrollTop;
      this.setState({ thumbTop, lastScrollTop: scrollTop, velocity });

      if (this.state.momentum && this.momentumAnimationFrame !== null) {
        window.cancelAnimationFrame(this.momentumAnimationFrame);
        this.setState({ momentum: false });
      }
    }
  };

  handleThumbMouseDown = (e: React.MouseEvent) => {
    this.setState({
      isDragging: true,
      startY: e.clientY,
      startTop: this.state.thumbTop,
    });
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseMove = (e: MouseEvent) => {
    if (this.state.isDragging && this.contentRef.current) {
      const deltaY = e.clientY - this.state.startY;
      const { clientHeight, scrollHeight } = this.contentRef.current;
      const newThumbTop = Math.min(
        Math.max(this.state.startTop + deltaY, 0),
        clientHeight - this.state.thumbHeight,
      );
      const newScrollTop = (newThumbTop / clientHeight) * scrollHeight;

      this.handleScroll(newScrollTop);
    }
  };

  handleMouseUp = () => {
    this.setState({ isDragging: false });
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    if (Math.abs(this.state.velocity) > 5) {
      this.setState({ momentum: true });
      this.momentumAnimationFrame = window.requestAnimationFrame(
        this.animateMomentum,
      );
    }
  };

  animateMomentum = () => {
    if (this.contentRef.current && this.state.momentum) {
      const newScrollTop =
        this.contentRef.current.scrollTop + this.state.velocity;
      this.handleScroll(newScrollTop);
      this.setState({ velocity: this.state.velocity * 0.95 });

      if (Math.abs(this.state.velocity) > 0.5) {
        this.momentumAnimationFrame = window.requestAnimationFrame(
          this.animateMomentum,
        );
      } else {
        this.setState({ momentum: false, velocity: 0 });
      }
    }
  };

  protected renderContent(): ReactNode {
    const { thumbHeight, thumbTop } = this.state;
    const displayScrollbar =
      thumbHeight < (this.containerRef.current?.clientHeight || 0)
        ? 'none'
        : 'block';
    console.log('renderContent', { thumbHeight, thumbTop, displayScrollbar });
    return (
      <div className={styles['scroll-container']} ref={this.containerRef}>
        <div className={styles['scroll-content']} ref={this.contentRef}>
          {this.props.children}
        </div>
        <div
          className={styles['scrollbar']}
          style={{
            display: displayScrollbar,
          }}
        >
          <div
            className={styles['scroll-thumb']}
            style={{ height: thumbHeight, top: thumbTop }}
            onMouseDown={this.handleThumbMouseDown}
          />
        </div>
      </div>
    );
  }
}
