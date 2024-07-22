import { ReactNode } from 'react';
import './less/resizeTestWebGLPage.less';
import {
  MetaComponent,
  MetaComponentProps,
  ResizeTestWebGL,
} from '../../components';

export type ResizeTestWebGLPageProps = MetaComponentProps & {};

export class ResizeTestWebGLPage extends MetaComponent<ResizeTestWebGLPageProps> {
  static meta = {
    path: '/resizeTestWebglPage',
    label: 'Resize-Test-WebGL-Page',
    title: '监听元素宽高变化实例',
    icon: 'CodepenOutlined',
  };
  constructor(props: ResizeTestWebGLPageProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="resize-webgl-page">
        <ResizeTestWebGL></ResizeTestWebGL>
      </div>
    );
  }
}

export default ResizeTestWebGLPage;
