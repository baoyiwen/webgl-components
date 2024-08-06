import { PageMeta } from './loadPage';
import { setCurrentData, setMenuItems, MenuItem, setRoutes } from '../features';
import { AppDispatch } from '../store';
import {
  treeNodeBuild,
  TreeNodeProps,
  // getDefaultSelectedMenuItem,
  // getCurrentRouteSegments,
} from './common';

// 自动生成菜单树
export const generateMenuTree = (
  pages: TreeNodeProps,
  basePath = '',
): MenuItem[] => {
  const tree = pages.map(page => {
    const path = basePath + page.meta.path;
    // const children = pages.filter(p => p.meta.path.startsWith(path + '/'));
    return {
      title: page.meta.title,
      key: path ? path : page.meta.label,
      label: page.meta.label,
      path,
      children:
        page.children && page.children.length
          ? generateMenuTree(page.children, path)
          : undefined,
      data: page.meta,
      icon: page.meta.icon,
    };
  });
  return tree;
};

// 生成菜单数据并存入 redux store
export const generateMenuDataByStore = (
  pages: PageMeta[],
  dispatch: AppDispatch,
) => {
  const treeData = treeNodeBuild(pages, ['..', 'page']);
  const menuData = generateMenuTree(treeData);
  // console.error(menuData);
  dispatch(setMenuItems(menuData));
};

// 设置默认页面路径
export const settingDefaultPagePath = (
  pages: PageMeta[],
  dispatch: AppDispatch,
) => {
  // let currentRoutes: string[] = [];
  // 使用 locations 作为默认页面的判定基础
  // const { locations } = store.getState().routerContent;
  // if (locations && locations.length > 0) {
  //   currentRoutes = locations;
  // }
  // const treeData = treeNodeBuild(pages, ['..', 'page']);
  // const currentRoute = getDefaultSelectedMenuItem(treeData, currentRoutes);
  const defaultPage = pages.find(page => page.meta.default);
  if (defaultPage) {
    const defaultMeta = defaultPage.meta;
    dispatch(
      setCurrentData({
        currentMenu: {
          key: defaultMeta.label,
          path: defaultMeta.path,
          label: defaultMeta.label,
          data: defaultMeta,
          icon: defaultMeta.icon,
          title: defaultMeta.title,
        },
        currentKey: defaultMeta.path,
        currentPath: defaultMeta.path,
      }),
    );
  } else if (pages.length > 0) {
    const pageMeta = pages[0].meta;
    dispatch(
      setCurrentData({
        currentMenu: {
          key: pageMeta.label,
          path: pageMeta.path,
          label: pageMeta.label,
          data: pageMeta,
          icon: pageMeta.icon,
          title: pageMeta.title,
        },
        currentKey: pageMeta.path,
        currentPath: pageMeta.path,
      }),
    );
  }
};

// 设置路由
export const setRoutesByStore = (pages: PageMeta[], dispatch: AppDispatch) => {
  const routes = pages.map(page => ({
    key: page.meta.path,
    path: page.meta.path,
    componentPath: page.componentPath,
  }));

  dispatch(setRoutes(routes));
};
