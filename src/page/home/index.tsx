import { ReactNode } from 'react';
import './index.less';
import { MetaComponent, MetaComponentProps } from '../../components';
import { TestMapComponents } from '../../components';

export type HomeProps = MetaComponentProps & {};
export class Home extends MetaComponent {
  constructor(props: HomeProps) {
    super(props);
    this.meta = {
      label: 'Home',
      path: '/',
      default: true,
      // content: this.render(),
    };
  }

  render(): ReactNode {
    return (
      <div className="root-home">
        <TestMapComponents></TestMapComponents>
      </div>
    );
  }
}
