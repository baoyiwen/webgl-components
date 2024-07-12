import { ReactNode } from 'react';
import './less/testWebGLPage.less';
import { MetaComponent, MetaComponentProps } from '../../components';
import { TestWebGL } from '../../components'

export type TestWebGLProps = MetaComponentProps & {};
export class TestWebGLPage extends MetaComponent {
  static meta = {
    title: 'WebGL',
    label: 'WebGL',
    path: '/testWebGLPage',
    icon: 'CodeSandboxOutlined',
  };
  constructor(props: TestWebGLProps) {
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

export default TestWebGLPage;
