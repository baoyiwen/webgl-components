import { createRef, ReactNode, RefObject } from 'react';
import {
  ResizableComponent,
  ResizableComponentProps,
  ResizableComponentState,
} from '../../base/ResizableComponent';

import {
  PerspectiveCamera,
  WebGLRenderer,
  // Scene,
  // DirectionalLight,
} from 'three';
import { Viewer, Ion } from 'cesium';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
  private viewerRef: Viewer | null;
  private rendererRef: WebGLRenderer | null;
  // private sceneRef: Scene | null;
  private cameraRef: PerspectiveCamera | null;

  constructor(props: CesiumBaseComponentProps) {
    super(props);

    this.cesiumContainerRef = createRef();
    this.viewerRef = null;
    this.rendererRef = null;
    // this.sceneRef = null;
    this.cameraRef = null;
  }

  componentDidMount(): void {
    super.componentDidMount();
    Ion.defaultAccessToken = this.props.cesiumToken;
    this.initCesium();
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
    this.viewerRef = new Viewer(this.cesiumContainerRef.current, {
      infoBox: false,
      geocoder: false, // 隐藏查找控件。
      homeButton: false, // 隐藏视角返回初始位置按钮
      sceneModePicker: false, // 隐藏视角模式3D, 2D, CV,
      baseLayerPicker: false, // 隐藏图层选择
      navigationHelpButton: false, // 隐藏帮助按钮
      animation: false, // 隐藏动画控件
      timeline: false, // 隐藏时间轴
      fullscreenButton: false, // 隐藏全屏
    });
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
