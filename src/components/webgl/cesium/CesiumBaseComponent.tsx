import { createRef, ReactNode, RefObject } from 'react';
import {
  ResizableComponent,
  ResizableComponentProps,
  ResizableComponentState,
} from '../../base/ResizableComponent';

import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  DirectionalLight,
} from 'three';
import { Viewer, Ion } from 'cesium';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import 'cesium/Build/Cesium/Widgets/widgets.css';
import 'cesium/Build/Cesium/Widgets/InfoBox/InfoBoxDescription.css';
import './less/CesiumBaseComponent.less';

export type CesiumBaseComponentProps = ResizableComponentProps & {
  models?: {
    url: string;
    position: [number, number, number];
    scale?: number;
  }[];
  cesiumToken: string;
};

export type CesiumBaseComponentState = ResizableComponentState & {};

export class CesiumBaseComponent extends ResizableComponent<
  CesiumBaseComponentProps,
  CesiumBaseComponentState
> {
  private cesiumContainerRef: RefObject<HTMLDivElement>;
  private threeContainerRef: RefObject<HTMLDivElement>;
  private viewerRef: Viewer | null;
  private rendererRef: WebGLRenderer | null;
  // private sceneRef: Scene | null;
  private cameraRef: PerspectiveCamera | null;

  constructor(props: CesiumBaseComponentProps) {
    super(props);

    this.cesiumContainerRef = createRef();
    this.threeContainerRef = createRef();
    this.viewerRef = null;
    this.rendererRef = null;
    // this.sceneRef = null;
    this.cameraRef = null;
  }

  componentDidMount(): void {
    super.componentDidMount();
    Ion.defaultAccessToken = this.props.cesiumToken;
    this.initCesium();
    this.initThree();
    // window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount(): void {
    super.componentWillUnmount();
    // window.removeEventListener('resize', this.handleResize);
    if (this.viewerRef) {
      this.viewerRef.destroy();
    }
  }

  initCesium(): void {
    if (!this.cesiumContainerRef.current) return;

    // (window as any).CESIUM_BASE_URL = '/';
    // const terrainProvider = await createWorldTerrainAsync();
    this.viewerRef = new Viewer(this.cesiumContainerRef.current, {
      infoBox: false,
    });
  }

  initThree(): void {
    if (!this.threeContainerRef.current) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      this.state.width / this.state.height,
      0.1,
      1000,
    );

    const renderer = new WebGLRenderer({ alpha: true });
    renderer.setSize(this.state.width, this.state.height);
    this.threeContainerRef.current.appendChild(renderer.domElement);

    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    if (this.props.models) {
      this.props.models.forEach(({ url, position, scale }) => {
        const loader = new GLTFLoader();
        loader.load(url, gltf => {
          const model = gltf.scene;
          model.position.set(...position);
          model.scale.setScalar(scale || 1);
          scene.add(model);
        });
      });
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // this.sceneRef = scene;
    this.cameraRef = camera;
    this.rendererRef = renderer;
  }

  resizeThree(): void {
    if (!this.rendererRef || !this.cameraRef) return;

    this.rendererRef.setSize(this.state.width, this.state.height);
    this.cameraRef.aspect = this.state.width / this.state.height;
    this.cameraRef.updateProjectionMatrix();
  }

  handleResize(width: number, height: number): void {
    super.handleResize(width, height);
    this.resizeThree();
  }

  protected renderContent(): ReactNode {
    return (
      <div className="three-cesium-map">
        <div ref={this.cesiumContainerRef} className="cesium-container"></div>
      </div>
    );
  }
}
