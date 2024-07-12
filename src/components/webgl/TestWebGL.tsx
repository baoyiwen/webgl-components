import { Component, createRef, RefObject } from 'react';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import './less/TestWebGL.less';

export type TestWebGLProps = {};
export class TestWebGL extends Component<TestWebGLProps> {
  private containerRef: RefObject<HTMLDivElement>;
  private cleanup?: () => void;

  constructor(props: TestWebGLProps) {
    super(props);
    this.containerRef = createRef();
  }

  componentDidMount(): void {
    const container = this.containerRef.current;
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
    if (this.cleanup) {
      this.cleanup();
    }
  }

  render() {
    return <div ref={this.containerRef} className="webgl-container"></div>;
  }
}
