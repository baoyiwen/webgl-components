import { createRef, ReactNode, RefObject } from 'react';
import {
  MetaComponent,
  MetaComponentProps,
  CesiumBaseComponent,
  CesiumBaseComponentProps,
} from '../../../components';

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
      center: [114.180807, 22.295909, 10000],
    };
  }

  componentDidMount(): void {}

  componentWillUnmount(): void {}

  render(): ReactNode {
    return (
      <div className="cesium-root" ref={this.CesiumRoot}>
        <CesiumBaseComponent {...this.CesiumData}></CesiumBaseComponent>
      </div>
    );
  }
}

export default CesiumDemoPage;
