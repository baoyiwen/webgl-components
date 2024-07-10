import { Component, ReactNode, Suspense, lazy, ComponentType } from 'react';
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
import { themeStyle, baseSetting } from '../settings';
import { CurrentData, MenuItem, setCurrentData, RouteData } from '../features';
import { RootState } from '../store';
import { connect } from 'react-redux';
import { ErrorBoundary, Icon, CustomIconComponentProps } from '../components';
import { Scrollbar } from 'react-scrollbars-custom';

export interface LayoutProps {
  menuItems: MenuItem[];
  currentData: CurrentData;
  routes: RouteData[];
  isLoading: boolean; // 加载状态
  setCurrentData: (data: CurrentData) => void;
}

export class LayoutComponent extends Component<
  LayoutProps,
  { iconCache: Record<string, ComponentType<CustomIconComponentProps>> }
> {
  constructor(props: LayoutProps) {
    super(props);

    this.state = {
      iconCache: {},
    };
  }

  componentDidMount(): void {
    // 组件挂载后预加载图标
    this.preloadIcon();
  }

  componentDidUpdate(prevProps: LayoutProps) {
    // 当 menuItems 数据加载完成后预加载图标
    if (!this.props.isLoading && prevProps.isLoading) {
      this.preloadIcon();
    }
  }

  // 异步预加载图标
  private async preloadIcon() {
    // 获取所有图标
    const iconTypes = this.getAllIconTypes(); // this.getAllIcons
    const iconCache: Record<
      string,
      ComponentType<CustomIconComponentProps>
    > = {};

    // 动态导入图标并缓存
    for (const iconType of iconTypes) {
      if (!iconCache[iconType]) {
        // 动态导入图标并缓存
        try {
          iconCache[iconType] = Icon;
        } catch (error) {
          console.error(`Failed to load icon: ${iconType}`, error);
        }
      }
    }

    // 更新 state
    this.setState({ iconCache });
  }

  // 获取所有的图标类型
  getAllIconTypes() {
    const { menuItems } = this.props;

    const icons = new Set<string>();
    const addIcon = (item: MenuItem) => {
      if (item.icon) {
        icons.add(item.icon);
      }

      if (item.children) {
        item.children.forEach(addIcon);
      }
    };

    menuItems.forEach(addIcon);
    return Array.from(icons);
  }

  /**
   * 动态导入图标
   */

  render(): ReactNode {
    return (
      <div className={classname(['root-layout-LayoutComponent'])}>
        <Layout className={classname(['root-layout'])}>
          {this.renderSlide()}
          <Layout
            className="root-content-layout"
            style={{ padding: '0 24px 0' }}
          >
            {this.renderHeader()}
            {this.renderContent()}
            {this.renderFooter()}
          </Layout>
        </Layout>
      </div>
    );
  }

  private generateMenuItems(items: MenuItem[]): any[] {
    const { iconCache } = this.state;
    return items.map(item => {
      const IconComponent = iconCache[item.icon || ''];
      return {
        key: item.key,
        label: (
          <Link to={item.path} onClick={this.LinkClick.bind(this, item)}>
            {item.label}
          </Link>
        ),
        children: item.children
          ? (this.generateMenuItems(item.children) as any[])
          : undefined,
        icon:
          item.icon && IconComponent ? (
            <IconComponent iconType={item.icon} />
          ) : null,
      };
    });
  }

  renderSlide() {
    const { menuItems, currentData } = this.props;
    const { Sider } = Layout;
    return (
      <Sider
        collapsible
        className={classname(['root-slide'])}
        width={themeStyle.slideWidth}
        style={{
          backgroundColor: '#F0F8FF',
        }}
      >
        <div className={classname(['root-slide-logo'])}></div>
        <Menu
          className={classname(['root-slide-menu'])}
          theme={themeStyle.rightMenuTheme}
          mode={themeStyle.rightMenuModel}
          selectedKeys={[currentData.currentPath]}
          items={this.generateMenuItems(menuItems)}
          style={{
            height: '100%',
            borderRight: 0,
          }}
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
    const modules = import.meta.glob('../page/**/*.tsx');
    const loadComponent = (componentPath: string) => {
      const Component = lazy(modules[componentPath] as any);
      return <Component />;
    };
    return (
      <Content
        className={classname(['root-content'])}
        style={{
          padding: 12,
          margin: 0,
          minHeight: 280,
          background: '#EEF7FF',
          // borderRadius: 8,
        }}
      >
        <div className={classname(['site-layout-content'])}>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading......</div>}>
              <Scrollbar
                className="content-warp"
                noScrollX
                style={{
                  height: '100%',
                  width: '100%',
                }}
                trackYProps={{
                  renderer: ({ elementRef, ...restProps }) => (
                    <div
                      {...restProps}
                      ref={elementRef}
                      style={{
                        right: 2,
                        bottom: 2,
                        top: 2,
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                      }}
                    />
                  ),
                }}
                thumbYProps={{
                  renderer: ({ elementRef, ...restProps }) => (
                    <div
                      {...restProps}
                      ref={elementRef}
                      style={{ backgroundColor: '#888', borderRadius: 4 }}
                    />
                  ),
                }}
                scrollDetectionThreshold={0} // 设置为 0 以禁用滚动检测节流
              >
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
              </Scrollbar>
            </Suspense>
          </ErrorBoundary>
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
}

const mapStateToProps = (state: RootState) => ({
  menuItems: state.menuContent.items,
  currentData: state.menuContent.currentData,
  routes: state.menuContent.routes,
  isLoading: state.menuContent.isLoading, // 将加载状态映射到 props
});

const mapDispatchToProps = {
  setCurrentData,
};

export const LayoutComponentByStore = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LayoutComponent);
