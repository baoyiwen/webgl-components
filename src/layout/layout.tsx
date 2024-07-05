import { Component, ReactNode } from 'react';
import classname from 'classnames';
import './layout.less';
import { Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { themeStyle, defaultActiveMenu } from '../settings';
import { Home } from '../page';

export type LayoutProps = {};

export class LayoutComponent extends Component {
  constructor(props: LayoutProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className={classname(['root-layout-LayoutComponent'])}>
        <Layout className={classname(['root-layout'])}>
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderFooter()}
        </Layout>
      </div>
    );
  }

  renderHeader(): ReactNode {
    const { Header } = Layout;
    const menuItems = [
      {
        key: 'test-01',
        label: '测试',
        path: '/',
      },
    ];
    return (
      <Header className={classname(['root-header'])}>
        <div className="layout-logo"></div>
        <Menu
          theme={themeStyle.menuTheme}
          mode={themeStyle.menuMode}
          defaultSelectedKeys={defaultActiveMenu}
          items={menuItems}
        ></Menu>
      </Header>
    );
  }

  renderContent() {
    const { Content } = Layout;

    return (
      <Content className={classname(['root-content'])}>
        <div className={classname(['site-layout-content'])}>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
          </Routes>
        </div>
      </Content>
    );
  }

  renderFooter() {
    const { Footer } = Layout;

    return (
      <Footer className={classname(['root-footer'])}>
        My Three.js Library ©2024
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
