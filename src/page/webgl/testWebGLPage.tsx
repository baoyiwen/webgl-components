import { ReactNode } from 'react';
import './less/testWebGLPage.less';
import { MetaComponent, MetaComponentProps } from '../../components';
import { TestWebGL } from '../../components';

export type testWEbGLPageProps = MetaComponentProps & {};
export class testWEbGLPage extends MetaComponent {
  static meta = {
    title: 'WebGL Test',
    label: 'WebGL-Test',
    path: '/testWEbGLPage',
    icon: 'CodepenOutlined',
  };
  constructor(props: testWEbGLPageProps) {
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

export default testWEbGLPage;
