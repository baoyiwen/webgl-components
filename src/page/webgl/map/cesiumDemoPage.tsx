import { createRef, ReactNode, RefObject } from 'react';
import {
  MetaComonentState,
  MetaComponent,
  MetaComponentProps,
  CesiumBaseComponent,
  CesiumBaseComponentProps,
} from '../../../components';
import { Viewer, Ion, CesiumTerrainProvider, IonResource } from 'cesium';

import './less/cesiumDemoPage.less';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import 'cesium/Build/Cesium/Widgets/InfoBox/InfoBoxDescription.css';

export type CesiumDemoPageProps = MetaComponentProps & {};
export class CesiumDemoPage extends MetaComponent<CesiumDemoPageProps> {
  static meta = {
    path: '/cesiumDemoPage',
    label: 'Cesium Demo Page',
    title: 'Cesium 实例化项目',
    icon: 'CodepenOutlined',
  };
  private CesiumData!: CesiumBaseComponentProps;
  private CesiumRoot!: RefObject<HTMLDivElement>;
  // private Viewer!: Viewer;
  constructor(props: CesiumDemoPageProps) {
    super(props);
    this.CesiumRoot = createRef();
    this.CesiumData = {
      cesiumToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMjI1MWJlMy1hYWI0LTQzNGUtYjBkYS1jNWUyMWZiZmM4ODEiLCJpZCI6MjMyMTc3LCJpYXQiOjE3MjI1Njc3MDV9.yVzHN_QkPMGT2bSaJ65edQZ1vS6lA6JP-o81OKK5nME`,
      models: [
        // { url: 'path/to/model1.glb', position: [0, 0, 0], scale: 1 },
        // { url: 'path/to/model2.glb', position: [10, 10, 0], scale: 0.5 },
      ],
    };
  }

  componentDidMount(): void {
    // Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMjI1MWJlMy1hYWI0LTQzNGUtYjBkYS1jNWUyMWZiZmM4ODEiLCJpZCI6MjMyMTc3LCJpYXQiOjE3MjI1Njc3MDV9.yVzHN_QkPMGT2bSaJ65edQZ1vS6lA6JP-o81OKK5nME`;
    // if (this.CesiumRoot.current) {
    //   this.Viewer = new Viewer(this.CesiumRoot.current, {
    //     infoBox: false,
    //     // terrainProvider: new CesiumTerrainProvider({
    //     //   requestWaterMask: true, // 可选参数，用于请求水域掩膜数据
    //     //   requestVertexNormals: true, // 可选参数，用于请求顶点法线数据
    //     // }),
    //   });
    // }
  }

  componentWillUnmount(): void {
    // if (this.Viewer) {
    //   this.Viewer.destroy();
    // }
  }

  render(): ReactNode {
    return (
      <div className="cesium-root" ref={this.CesiumRoot}>
        <CesiumBaseComponent {...this.CesiumData}></CesiumBaseComponent>
      </div>
    );
  }
}

export default CesiumDemoPage;
