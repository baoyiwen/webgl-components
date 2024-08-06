import { Component, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LayoutComponentByStore } from './layout';
import './App.less';
// import { Scrollbars } from 'react-custom-scrollbars-2';

export type AppProps = {};
export class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <Router>
        <LayoutComponentByStore />
      </Router>
    );
  }
}
