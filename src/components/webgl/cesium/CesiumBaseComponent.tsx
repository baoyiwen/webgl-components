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
import { Viewer, Ion, Cartesian3, Color } from 'cesium';
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
  center: [number, number, number];
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
      geocoder: true, // 隐藏查找控件。
      homeButton: false, // 隐藏视角返回初始位置按钮
      sceneModePicker: false, // 隐藏视角模式3D, 2D, CV,
      baseLayerPicker: false, // 隐藏图层选择
      navigationHelpButton: false, // 隐藏帮助按钮
      animation: false, // 隐藏动画控件
      timeline: false, // 隐藏时间轴
      fullscreenButton: false, // 隐藏全屏
      // creditContainer:"credit",
    });
    this.viewerRef.scene.debugShowFramesPerSecond = true;
    this.flyTo(this.props.center);
  }

  startRandomJump() {
    if (!this.viewerRef) return;

    // 生成随机经纬度和高度
    const randomLongitude = Math.random() * 360 - 180;
    const randomLatitude = Math.random() * 180 - 90;
    const randomHeight = Math.random() * 10000000 + 1000000; // 高度在1,000,000到11,000,000米之间

    // 创建目标位置
    const destination = Cartesian3.fromDegrees(
      randomLongitude,
      randomLatitude,
      randomHeight,
    );

    // 飞向目标位置
    this.viewerRef.camera.flyTo({
      destination: destination,
      complete: () => {
        // 飞行完成后，等待3秒再次执行
        setTimeout(() => {
          this.startRandomJump();
        }, 3000);
      },
    });
  }

  flyTo(destination: [number, number, number], callback?: () => void) {
    if (!this.viewerRef) return;
    this.viewerRef.camera.flyTo({
      destination: Cartesian3.fromDegrees(...destination),
      complete: callback,
    });
  }

  handleResize(width: number, height: number): void {
    super.handleResize(width, height);
  }

  protected renderContent(): ReactNode {
    return (
      <div className="three-cesium-map">
        <div ref={this.cesiumContainerRef} className="cesium-container"></div>
      </div>
    );
  }
}
