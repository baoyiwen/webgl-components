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
  lastUpdateTime: number;
};

export class ScrollLayout extends ResizableComponent<
  ScrollLayoutProps,
  ScrollLayoutState
> {
  private contentWarpRef: RefObject<HTMLDivElement>;
  private contentRef: RefObject<HTMLDivElement>;
  private momentumAnimationFrame: number | null;
  private mutationObserver!: MutationObserver; // 监听内容变化
  constructor(props: ScrollLayoutProps) {
    super(props);
    // 初始化组件状态
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
      lastUpdateTime: 0,
    };

    // 绑定方法
    this.updateThumbSize = this.updateThumbSize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleThumbMouseDown = this.handleThumbMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.animateMomentum = this.animateMomentum.bind(this);
    this.handleWheel = this.handleWheel.bind(this);

    this.contentRef = createRef();
    this.contentWarpRef = createRef();
    this.momentumAnimationFrame = null;
    this.mutationObserver = new MutationObserver(this.updateThumbSize);
  }

  componentDidMount() {
    super.componentDidMount();
    this.updateThumbSize(); // 初次加载时计算滑块高度
    window.addEventListener('resize', this.updateThumbSize); // 监听窗口大小变化
    if (this.contentRef.current) {
      // 监听内容变化
      this.mutationObserver.observe(this.contentRef.current, {
        childList: true,
        subtree: true,
      });
      // 监听滚轮事件
      this.contentRef.current.addEventListener('wheel', this.handleWheel);
    }

    if (this.contentWarpRef.current) {
      this.mutationObserver.observe(this.contentWarpRef.current, {
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

  // 计算滑块高度
  updateThumbSize() {
    if (this.contentRef.current && this.contentWarpRef.current) {
      const { clientHeight } = this.contentRef.current;
      const { scrollHeight: realScrollHeight } = this.contentWarpRef.current;
      const thumbHeight = (clientHeight / realScrollHeight) * clientHeight;
      this.setState({ thumbHeight });
    }
  }

  // 处理滚动事件
  handleScroll(scrollTop: number, isWheel: boolean = false) {
    if (this.contentRef.current && this.contentWarpRef.current) {
      const { clientHeight } = this.contentRef.current;
      const { scrollHeight: realScrollHeight } = this.contentWarpRef.current;
      const maxScrollTop = realScrollHeight - clientHeight;
      const boundedScrollTop = Math.max(0, Math.min(scrollTop, maxScrollTop));
      const thumbTop = (boundedScrollTop / realScrollHeight) * clientHeight;
      const velocity = boundedScrollTop - this.state.lastScrollTop;
      const currentTime = Date.now();
      const deltaTime = currentTime - this.state.lastUpdateTime;

      this.contentRef.current.scrollTop = boundedScrollTop;
      this.setState({
        thumbTop,
        lastScrollTop: boundedScrollTop,
        velocity: isWheel ? velocity / deltaTime : 0,
        lastUpdateTime: currentTime,
      });

      if (
        isWheel &&
        Math.abs(velocity) > 0.1 &&
        this.momentumAnimationFrame === null
      ) {
        this.setState({ momentum: true });
        this.momentumAnimationFrame = window.requestAnimationFrame(
          this.animateMomentum,
        );
      } else if (!isWheel) {
        if (this.momentumAnimationFrame !== null) {
          window.cancelAnimationFrame(this.momentumAnimationFrame);
          this.momentumAnimationFrame = null;
        }
        this.setState({ momentum: false });
      }
    }
  }

  // 处理滑块按下事件
  handleThumbMouseDown(e: React.MouseEvent) {
    this.setState({
      isDragging: true,
      startY: e.clientY,
      startTop: this.state.thumbTop,
    });
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  // 处理鼠标移动事件
  handleMouseMove(e: MouseEvent) {
    if (
      this.state.isDragging &&
      this.contentRef.current &&
      this.contentWarpRef.current
    ) {
      const deltaY = e.clientY - this.state.startY;
      const { clientHeight } = this.contentRef.current;
      const { scrollHeight: realScrollHeight } = this.contentWarpRef.current;
      const newThumbTop = Math.min(
        Math.max(this.state.startTop + deltaY, 0),
        clientHeight - this.state.thumbHeight,
      );
      const newScrollTop = (newThumbTop / clientHeight) * realScrollHeight;

      this.handleScroll(newScrollTop);
    }
  }

  // 处理鼠标松开事件
  handleMouseUp() {
    this.setState({ isDragging: false });
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    if (Math.abs(this.state.velocity) > 5) {
      this.setState({ momentum: true });
      this.momentumAnimationFrame = window.requestAnimationFrame(
        this.animateMomentum,
      );
    }
  }

  // 动量动画
  animateMomentum() {
    if (this.contentRef.current && this.state.momentum) {
      const currentTime = Date.now();
      const deltaTime = currentTime - this.state.lastUpdateTime;
      const newScrollTop =
        this.contentRef.current!.scrollTop +
        this.state.velocity * deltaTime;

      this.handleScroll(newScrollTop);
      this.setState({
        velocity: this.state.velocity * 0.95,
        lastUpdateTime: currentTime,
      });

      if (Math.abs(this.state.velocity) > 0.1) {
        this.momentumAnimationFrame = window.requestAnimationFrame(
          this.animateMomentum,
        );
      } else {
        this.setState({ momentum: false, velocity: 0 });
        this.momentumAnimationFrame = null;
      }
    }
  }

  // 处理滚轮事件
  handleWheel(event: WheelEvent) {
    event.preventDefault();
    if (this.contentRef.current) {
      const scrollTop = this.contentRef.current!.scrollTop + event.deltaY;
      this.handleScroll(scrollTop, true);
    }
  }

  protected renderContent(): ReactNode {
    const { thumbHeight, thumbTop } = this.state;
    const clientHeight = this.containerRef.current?.clientHeight;
    const displayScrollbar =
      clientHeight && thumbHeight < clientHeight ? 'block' : 'none';
    // console.log(clientHeight, thumbHeight, displayScrollbar);
    return (
      <div className={styles['scroll-container']} ref={this.containerRef}>
        <div className={styles['scroll-content']} ref={this.contentRef}>
          <div className={styles['scroll-warp']} ref={this.contentWarpRef}>
            {this.props.children}
          </div>
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
