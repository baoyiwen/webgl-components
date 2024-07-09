import { PageMeta } from './loadPage';
import { setCurrentData, setMenuItems, MenuItem, setRoutes } from '../features';
import { AppDispatch } from '../store';

// 自动生成菜单树
export const generateMenuTree = (
  pages: PageMeta[],
  basePath = '',
): MenuItem[] => {
  const tree = pages.map(page => {
    const path = basePath + page.meta.path;
    const children = pages.filter(p => p.meta.path.startsWith(path + '/'));
    return {
      key: path,
      label: page.meta.label,
      path,
      children: children.length ? generateMenuTree(children, path) : undefined,
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
  const menuData = generateMenuTree(pages);
  // pages.filter(p => !p.meta.path.includes('/')),
  dispatch(setMenuItems(menuData));
};

// 设置默认页面路径
export const settingDefaultPagePath = (
  pages: PageMeta[],
  dispatch: AppDispatch,
) => {
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
