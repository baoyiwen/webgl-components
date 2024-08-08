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
    // this.startRandomJump();
    this.flyTo([114.180807, 22.295909, 10000]);
    // const destination = Cartesian3.fromDegrees(114.180807, 22.295909, 10000);
    // this.viewerRef.camera.flyTo({ destination: destination });
    // 添加随机跳转位置的方法
    // this.startRandomJump();
    // const redBox = this.viewerRef.entities.add({
    //   name: 'test demo',
    //   position: Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
    //   box: {
    //     dimensions: new Cartesian3(400000.0, 300000.0, 500000.0),
    //     material: Color.RED.withAlpha(0.5),
    //     outline: true,
    //     outlineColor: Color.BLACK,
    //   },
    // });

    // setTimeout(() => {
    //   this.viewerRef && this.viewerRef.zoomTo(this.viewerRef.entities);
    // }, 20000);
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
