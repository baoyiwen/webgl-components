import { ReactNode } from 'react';
import './less/home.less';
import { MetaComponent, MetaComponentProps } from '../components';
import { TestMapComponents } from '../components';

export type HomeProps = MetaComponentProps & {};
export class Home extends MetaComponent {
  static meta = {
    label: 'Home',
    path: '/',
    default: true,
  };
  constructor(props: HomeProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="root-home">
        <TestMapComponents></TestMapComponents>
      </div>
    );
  }
}

export default Home;
