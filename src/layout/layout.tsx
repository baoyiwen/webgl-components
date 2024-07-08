import { Component, ReactNode, Suspense, lazy } from 'react';
import classname from 'classnames';
import './layout.less';
import {
  Link,
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { themeStyle, defaultActiveMenu, baseSetting } from '../settings';
import { Home } from '../page';
import { CurrentData, MenuItem, setCurrentData, RouteData } from '../features';
import { RootState } from '../store';
import { connect } from 'react-redux';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

export interface LayoutProps {
  menuItems: MenuItem[];
  currentData: CurrentData;
  routes: RouteData[];
  setCurrentData: (data: CurrentData) => void;
}

export class LayoutComponent extends Component<LayoutProps> {
  constructor(props: LayoutProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className={classname(['root-layout-LayoutComponent'])}>
        <Layout className={classname(['root-layout'])}>
          {this.renderSlide()}
          <Layout className="root-content-layout">
            {this.renderHeader()}
            {this.renderContent()}
            {this.renderFooter()}
          </Layout>
        </Layout>
      </div>
    );
  }

  private generateMenuItems(items: MenuItem[]): any[] {
    const { setCurrentData } = this.props;
    return items.map(item => ({
      key: item.key,
      label: (
        <Link to={item.path} onClick={this.LinkClick.bind(this, item)}>
          {item.label}
        </Link>
      ),
      children: item.children
        ? (this.generateMenuItems(item.children) as any[])
        : undefined,
    }));
  }

  renderSlide() {
    const { menuItems } = this.props;
    const { Sider } = Layout;
    return (
      <Sider collapsible className={classname(['root-slide'])}>
        <div className={classname(['root-slide-logo'])}></div>
        <Menu
          className={classname(['root-slide-menu'])}
          theme={themeStyle.menuTheme}
          mode={themeStyle.rightMenuModel}
          defaultSelectedKeys={defaultActiveMenu}
          items={this.generateMenuItems(menuItems)}
        ></Menu>
      </Sider>
    );
  }

  private LinkClick(data: MenuItem) {
    const { setCurrentData } = this.props;
    setCurrentData({
      currentKey: data.key,
      currentPath: data.path,
      currentMenu: data,
    });
  }

  renderHeader(): ReactNode {
    const { Header } = Layout;
    return (
      <Header className={classname(['root-header'])}>
        <div className={classname(['header-warp'])}>
          {baseSetting.projectTitle}
        </div>
      </Header>
    );
  }

  renderContent() {
    const { routes, currentData } = this.props;
    const { Content } = Layout;
    const loadComponent = (componentPath: string) => {
      const Component = lazy(() => import(`${componentPath}`));
      return <Component></Component>;
    };
    return (
      <Content className={classname(['root-content'])}>
        <div className={classname(['site-layout-content'])}>
          <Suspense fallback={<div>Loading......</div>}>
            <Routes>
              {routes.map(route => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={loadComponent(route.componentPath)}
                ></Route>
              ))}
              <Route
                path="*"
                element={<Navigate to={currentData.currentPath} replace />}
              ></Route>
            </Routes>
          </Suspense>
        </div>
      </Content>
    );
  }

  renderFooter() {
    const { Footer } = Layout;

    return (
      <Footer className={classname(['root-footer'])}>
        {baseSetting.projectCopyright}
      </Footer>
    );
  }

  //   componentDidMount(): void {}

  //   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {}

  //   componentDidUpdate(
  //     prevProps: Readonly<{}>,
  //     prevState: Readonly<{}>,
  //     snapshot?: any,
  //   ): void {}

  //   componentWillUnmount(): void {}
}

const mapStateToProps = (state: RootState) => ({
  menuItems: state.menuContent.items,
  currentData: state.menuContent.currentData,
  routes: state.menuContent.routes,
});

const mapDispatchToProps = {
  setCurrentData,
};

export const LayoutComponentByStore = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LayoutComponent);
