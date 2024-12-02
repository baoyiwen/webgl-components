import { createRef, RefObject } from 'react';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import './less/ResizeTestWebGL.less';
import {
  ResizableComponent,
  ResizableComponentProps,
  ResizableComponentState,
} from '../base/ResizableComponent';

export type ResizeTestWebGLProps = ResizableComponentProps & {};
export type ResizeTestWebGLState = ResizableComponentState & {};
export class ResizeTestWebGL extends ResizableComponent<
  ResizeTestWebGLProps,
  ResizeTestWebGLState
> {
  private containerTestRef: RefObject<HTMLDivElement>;
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private cube!: Mesh;
  private cleanup?: () => void;
  // private isRead: boolean;

  constructor(props: ResizeTestWebGLProps) {
    super(props);
    this.containerTestRef = createRef();
    // this.isRead = false;
  }

  componentDidMount(): void {
    super.componentDidMount();
    this.initWebGL();
  }

  handleResize(width: number, height: number): void {
    super.handleResize(width, height);
    this.resizeWebGL();
  }

  initWebGL() {
    const container = this.containerTestRef.current;
    if (!container) return;
    // 初始化场景、摄像机和渲染器
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // 创建一个立方体并添加到场景中
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);

    // 设置摄像机位置
    this.camera.position.z = 5;

    // 动画函数
    const animate = () => {
      requestAnimationFrame(animate);
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    };
    // this.cube.rotation.x += 0.5;
    // this.cube.rotation.y += 0.5;
    animate();

    // this.renderer.render(this.scene, this.camera);

    // 清理函数
    this.cleanup = () => {
      container.removeChild(this.renderer.domElement);
    };

    // this.isRead = true;
  }

  resizeWebGL() {
    const container = this.containerTestRef.current;
    if (!container || !this.camera || !this.renderer) return;
    // 更新摄像机纵横比
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();

    // 更新渲染器大小
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.cleanup) {
      this.cleanup();
    }
    // this.isRead = false;
  }

  renderContent() {
    return (
      <div ref={this.containerTestRef} className="webgl-container-resize"></div>
    );
  }
}
