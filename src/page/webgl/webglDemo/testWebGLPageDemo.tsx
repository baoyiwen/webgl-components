import { ReactNode } from 'react';
import './less/testWebGLPage.less';
import { MetaComponent, MetaComponentProps } from '../../../components';
import { TestWebGL } from '../../../components'

export type testWebGLPageDemoProps = MetaComponentProps & {};
export class testWebGLPageDemo extends MetaComponent {
  static meta = {
    title: 'WebGL Demo',
    label: 'WebGL Demo',
    path: '/testWebGLPageDemo',
    icon: 'CodeSandboxOutlined',
  };
  constructor(props: testWebGLPageDemoProps) {
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

export default testWebGLPageDemo;
