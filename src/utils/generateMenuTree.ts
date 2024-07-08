import { loadPage, PageMeta } from './loadPage';
import { setCurrentData, setMenuItems, MenuItem, setRoutes } from '../features';
import store from '../store';

// export const generateMenu = () => {
//   // 获取所有符合条件的page数据。
//   const pages = loadPage();

//   // 生成菜单数据并存入 redux store
//   generateMenuDataByStore(pages);
//   // 设置默认页面路径
//   settingDefaultPagePath(pages);
//   // 设置路由
//   setRoutesByStore(pages);
// };

 // 自动生成菜单树
export const generateMenuTree = (pages: PageMeta[], basePath = ''): MenuItem[] => {
  const tree = pages.map(page => {
    const path = basePath + page.meta.path;
    const children = pages.filter(p => p.meta.path.startsWith(path + '/'));
    return {
      key: path,
      label: page.meta.label,
      path,
      children: children.length ? generateMenuTree(children, path) : undefined,
      data: page.meta,
    };
  });
  return tree;
};

// 生成菜单数据并存入 redux store
export const generateMenuDataByStore = (pages: PageMeta[]) => {
  const menuData = generateMenuTree(
    pages.filter(p => !p.meta.path.includes('/')),
  );
  store.dispatch(setMenuItems(menuData));
};

// 设置默认页面路径
export const settingDefaultPagePath = (pages: PageMeta[]) => {
  const defaultPage = pages.find(page => page.meta.default);
  if (defaultPage) {
    const defaultMeta = defaultPage.meta;
    store.dispatch(
      setCurrentData({
        currentMenu: {
          key: defaultMeta.label,
          path: defaultMeta.path,
          label: defaultMeta.label,
          data: defaultMeta,
        },
        currentKey: defaultMeta.path,
        currentPath: defaultMeta.path,
      }),
    );
  }
};

// 设置路由
export const setRoutesByStore = (pages: PageMeta[]) => {
  const routes = pages.map(page => ({
    key: page.meta.path,
    path: page.meta.path,
    componentPath: page.componentPath,
  }));

  store.dispatch(setRoutes(routes));
};
