import { Component, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LayoutComponentByStore } from './layout';
import './App.less';
// import { getCurrentRouteSegments } from './utils/common';
// import { setLocations } from './features';
// import { useDispatch } from 'react-redux';
// import { Scrollbars } from 'react-custom-scrollbars-2';

export type AppProps = {};
export class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount(): void {
    // const dispatch = useDispatch();
    // const currentRoute = getCurrentRouteSegments();
    // dispatch(setLocations(currentRoute));
  }

  render(): ReactNode {
    return (
      <Router>
        <LayoutComponentByStore />
      </Router>
    );
  }
}
