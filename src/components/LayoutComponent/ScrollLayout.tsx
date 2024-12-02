import { ReactNode, createRef, RefObject } from 'react';
import {
  ResizableComponent,
  ResizableComponentProps,
  ResizableComponentState,
} from '../base/ResizableComponent';

import styles from './less/SrollLayout.module.less';

export type ScrollLayoutProps = ResizableComponentProps & {
  accelerationFactor?: number; // 加速因子
  maxSpeed?: number; // 最大速度
};

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
  scrollCount: number; // 滚动次数
  isAnimating: boolean; // 动画状态
  wheeling: boolean; // 记录是否时wheel
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
      scrollCount: 0,
      isAnimating: false,
      wheeling: true,
    };

    // 绑定方法
    this.updateThumbSize = this.updateThumbSize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleThumbMouseDown = this.handleThumbMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.animateMomentum = this.animateMomentum.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.animationStop = this.animationStop.bind(this);

    this.contentRef = createRef();
    this.contentWarpRef = createRef();
    this.momentumAnimationFrame = null;
    this.mutationObserver = new MutationObserver(this.updateThumbSize);
  }

  componentDidMount() {
    super.componentDidMount();
    this.updateThumbSize(); // 初次加载时计算滑块高度
    window.addEventListener('transitionend', this.animationStop)
    if (this.contentRef.current) {
      this.mutationObserver.observe(this.contentRef.current, {
        childList: true,
        subtree: true,
      });
      this.contentRef.current.addEventListener('wheel', this.handleWheel);
    }

    if (this.contentWarpRef.current) {
      this.mutationObserver.observe(this.contentWarpRef.current, {
        childList: true,
        subtree: true,
      });
    }
  }

  handleResize(width: number, height: number): void {
    super.handleResize(width, height);
    requestAnimationFrame(() => {
      this.updateThumbSize();
    });
  }

  animationStop() {
    requestAnimationFrame(() => {
      this.updateThumbSize();
    });
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('transitionend', this.animationStop);
    if (this.momentumAnimationFrame !== null) {
      window.cancelAnimationFrame(this.momentumAnimationFrame);
    }
    this.mutationObserver.disconnect();
  }

  // 计算滑块高度
  updateThumbSize() {
    if (this.contentRef.current && this.contentWarpRef.current) {
      const { height } = this.state;
      const { scrollHeight: realScrollHeight } = this.contentWarpRef.current;
      const thumbHeight = (height / realScrollHeight) * height;
      this.setState({ thumbHeight });
    }
  }

  // 处理滚动事件
  handleScroll(scrollTop: number, isWheel: boolean = false) {
    if (this.contentRef.current && this.contentWarpRef.current) {
      const { height } = this.state;
      const { scrollHeight: realScrollHeight } = this.contentWarpRef.current;
      const maxScrollTop = realScrollHeight - height;
      const boundedScrollTop = Math.max(0, Math.min(scrollTop, maxScrollTop));
      const thumbTop = (boundedScrollTop / realScrollHeight) * height;
      const velocity = boundedScrollTop - this.state.lastScrollTop;
      const currentTime = Date.now();
      const deltaTime = currentTime - this.state.lastUpdateTime;
      if (isWheel) {
        this.contentRef.current.scrollTo({
          top: boundedScrollTop,
          behavior: 'smooth',
        }); // .scrollTop = boundedScrollTop;
      } else {
        this.contentRef.current.scrollTop = boundedScrollTop;
      }
      this.setState({
        thumbTop,
        lastScrollTop: boundedScrollTop,
        velocity: isWheel ? velocity / deltaTime : 0,
        lastUpdateTime: currentTime,
        momentum: isWheel ? true : this.state.momentum,
        isAnimating: isWheel ? true : this.state.isAnimating,
      });

      // if (
      //   isWheel &&
      //   Math.abs(velocity) > 0.1 &&
      //   this.momentumAnimationFrame === null
      // ) {
      //   this.setState(prevState => ({
      //     scrollCount: prevState.scrollCount + 1,
      //   }));
      //   this.momentumAnimationFrame = window.requestAnimationFrame(
      //     this.animateMomentum,
      //   );
      // } else if (!isWheel && !this.state.isAnimating) {
      //   if (this.momentumAnimationFrame !== null) {
      //     window.cancelAnimationFrame(this.momentumAnimationFrame);
      //     this.momentumAnimationFrame = null;
      //   }
      //   this.setState({ momentum: false, scrollCount: 0 });
      // }
    }
  }

  // 处理滑块按下事件
  handleThumbMouseDown(e: React.MouseEvent) {
    this.setState({
      isDragging: true,
      startY: e.clientY,
      startTop: this.state.thumbTop,
      wheeling: false,
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
      const { height } = this.state;
      const deltaY = e.clientY - this.state.startY;
      const { scrollHeight: realScrollHeight } = this.contentWarpRef.current;
      const newThumbTop = Math.min(
        Math.max(this.state.startTop + deltaY, 0),
        height - this.state.thumbHeight,
      );
      const newScrollTop = (newThumbTop / height) * realScrollHeight;
      this.handleScroll(newScrollTop);
    }
  }

  // 处理鼠标松开事件
  handleMouseUp() {
    this.setState({ isDragging: false, wheeling: true });
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    if (Math.abs(this.state.velocity) > 5) {
      this.setState({ momentum: true, isAnimating: true });
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
      const accelerationFactor = this.props.accelerationFactor || 1.05;
      const maxSpeed = this.props.maxSpeed || 100;
      const newVelocity = Math.min(
        this.state.velocity * accelerationFactor,
        maxSpeed,
      );
      const newScrollTop =
        this.contentRef.current!.scrollTop + newVelocity * deltaTime;

      this.handleScroll(newScrollTop, false);
      this.setState({
        velocity: newVelocity * 0.98,
        lastUpdateTime: currentTime,
      });

      if (Math.abs(newVelocity) > 0.1) {
        this.momentumAnimationFrame = window.requestAnimationFrame(
          this.animateMomentum,
        );
      } else {
        this.setState({ momentum: false, velocity: 0, isAnimating: false });
        this.momentumAnimationFrame = null;
      }
    } else {
      this.setState({ isAnimating: false });
    }
  }

  // 处理滚轮事件
  handleWheel(event: WheelEvent) {
    event.preventDefault();
    if (this.contentRef.current) {
      const accelerationFactor = this.props.accelerationFactor || 1.05;
      const maxSpeed = this.props.maxSpeed || 100;
      const newScrollCount = this.state.scrollCount + 1;
      const velocityMultiplier = Math.min(
        Math.pow(accelerationFactor, newScrollCount),
        maxSpeed,
      );
      const scrollTop =
        this.contentRef.current!.scrollTop + event.deltaY * velocityMultiplier;
      this.handleScroll(scrollTop, true);
    }
  }

  protected renderContent(): ReactNode {
    const { thumbHeight, thumbTop, wheeling } = this.state;
    const clientHeight = this.containerRef.current?.clientHeight;
    const displayScrollbar =
      clientHeight && thumbHeight < clientHeight ? 'block' : 'none';
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
            style={{
              height: thumbHeight,
              top: thumbTop,
              transition: wheeling ? 'top .3s ease' : 'none',
            }}
            onMouseDown={this.handleThumbMouseDown}
          />
        </div>
      </div>
    );
  }
}
