import { Component, createRef, RefObject } from 'react';
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
export class ResizeTestWebGL extends ResizableComponent<ResizeTestWebGLProps, ResizeTestWebGLState> {
  private containerTestRef: RefObject<HTMLDivElement>;
  private cleanup?: () => void;

  constructor(props: ResizeTestWebGLProps) {
    super(props);
    // this.setState({
    //   width: 0,
    //   height: 0,
    // });
    this.containerTestRef = createRef();
  }

  componentDidMount(): void {
    super.componentDidMount()
    this.renderWebGLExpore();
  }

  handleResize(width: number, height: number): void {
    super.handleResize(width, height);
    this.renderWebGLExpore()
    console.log(width, height)
  }

  renderWebGLExpore() {
    const container = this.containerTestRef.current;
    if (!container) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );

    const renderer = new WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    this.cleanup = () => {
      container.removeChild(renderer.domElement);
    };
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    if (this.cleanup) {
      this.cleanup();
    }
  }

  renderContent() {
    return (
      <div ref={this.containerTestRef} className="webgl-container-resize"></div>
    );
  }
}
