import { ReactNode } from 'react';
import './less/testWebGLPage.less';
import { MetaComponent, MetaComponentProps } from '../../components';
import { TestWebGL } from '../../components'

export type testWEbGLPage02Props = MetaComponentProps & {};
export class testWEbGLPage02 extends MetaComponent {
  static meta = {
    title: 'WebGL 2',
    label: 'WebGL 2',
    path: '/testWEbGLPage02',
    icon: 'CodeSandboxOutlined',
  };
  constructor(props: testWEbGLPage02Props) {
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

export default testWEbGLPage02;
