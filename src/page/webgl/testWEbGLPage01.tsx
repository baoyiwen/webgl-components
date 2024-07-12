import { ReactNode } from 'react';
import './less/testWebGLPage.less';
import { MetaComponent, MetaComponentProps } from '../../components';
import { TestWebGL } from '../../components'

export type testWEbGLPage01Props = MetaComponentProps & {};
export class testWEbGLPage01 extends MetaComponent {
  static meta = {
    title: 'WebGL 1',
    label: 'WebGL 1',
    path: '/testWEbGLPage01',
    icon: 'CodeSandboxOutlined',
  };
  constructor(props: testWEbGLPage01Props) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="root-test-webgl">
        <TestWebGL></TestWebGL>
      </div>
    );
  }
}

export default testWEbGLPage01;
