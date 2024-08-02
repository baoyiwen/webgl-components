import { ReactNode } from 'react';
import {
  ResizableComponent,
  ResizableComponentProps,
  ResizableComponentState,
} from '../../base/ResizableComponent';

import {} from 'three';
import { Viewer } from 'cesium';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import 'cesium/Build/Cesium/Widgets/widgets.css';
import './less/CesiumBaseComponent.less';

export type CesiumBaseComponentProps = ResizableComponentProps & {};

export type CesiumBaseComponentState = ResizableComponentState & {};

export class CesiumBaseComponent extends ResizableComponent<
  CesiumBaseComponentProps,
  CesiumBaseComponentState
> {
  constructor(props: CesiumBaseComponentProps) {
    super(props);
  }

  handleResize(width: number, height: number): void {
    super.handleResize(width, height);
  }

  protected renderContent(): ReactNode {
    return;
  }
}
