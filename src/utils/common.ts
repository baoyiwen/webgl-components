import { PageMeta } from './loadPage';
import { SubmenuMeta } from '../settings';

export type TreeNodeProp = PageMeta & {
  paths: string[];
  originPaths: string[];
  children?: TreeNodeProps;
};

export type TreeNodeProps = TreeNodeProp[];

export type TreeFilterAttr = string[];

export type TreeNode = {};

export const getHandleData = (
  data: PageMeta[],
  treeFilterAttr: string[] = [],
): TreeNodeProps => {
  const handleData: TreeNodeProps = data.map(d => {
    const opaths = d.componentPath.split('/');
    const paths = opaths.filter(d => !treeFilterAttr.find(fd => fd === d));
    return {
      paths: paths,
      originPaths: opaths,
      ...d,
    };
  });

  return handleData;
};

export const treeNodeBuild = (
  data: PageMeta[],
  treeFilterAttr: string[] = [],
) => {
  const root = {
    componentPath: '',
    meta: {
      label: 'root',
      path: '',
    },
    paths: [],
    originPaths: [],
    children: [] as TreeNodeProps,
  } as TreeNodeProp;

  const dealData = getHandleData(data, treeFilterAttr);

  const datas = dealData.map(dd => {
    dd.paths.splice(dd.paths.length - 1, dd.paths.length, dd.meta.label);

    return dd.paths;
  });

  const nodeMap: Map<string, TreeNodeProp> = new Map();

  const getNode = (name: string, data?: TreeNodeProp): TreeNodeProp => {
    const meta = data
      ? data.meta
      : SubmenuMeta[name]
        ? SubmenuMeta[name]
        : { path: '', label: name };
    if (!nodeMap.has(name)) {
      const newNode = {
        componentPath: data ? data.componentPath : '',
        meta: meta,
        originPaths: data ? data.originPaths : ([] as string[]),
        paths: data ? data.paths : ([] as string[]),
        children: [] as TreeNodeProps,
      } as TreeNodeProp;
      nodeMap.set(name, newNode);
    }
    return nodeMap.get(name)!;
  };

  datas.forEach(data => {
    let currentNode = root;
    const currentMenuData = dealData.find(
      dd => dd.paths.join('-') === data.join('-'),
    );
    data.forEach((part, i) => {
      const childNode =
        i === data.length - 1 && currentMenuData
          ? getNode(part, currentMenuData)
          : getNode(part);
      if (!currentNode.children?.find(child => child.meta.label === part)) {
        currentNode.children?.push(childNode);
      }
      currentNode = childNode;
    });
  });
  return root.children || [];
};

/**
 * 获取当前浏览器路由并拆分成路由组
 * @returns {string[]} 路由组数组，每个元素都是 "/xxxx" 形式
 */
export const getCurrentRouteSegments = (): string[] => {
  const path = window.location.pathname;
  // 按斜杠分割路径，保留斜杠前缀
  return path
    .split('/')
    .filter(segment => segment !== '')
    .map(segment => `/${segment}`);
};

/**
 * 根据当前路由获取默认选中的菜单项
 * @param {TreeNodeProp[]} allRoutes - 所有路由信息
 * @param {string[]} currentRouteSegments - 当前路由组
 * @returns {string} 默认选中的菜单项的路径
 */
export const getDefaultSelectedMenuItem = (
  allRoutes: TreeNodeProp[],
  currentRouteSegments: string[]
): TreeNodeProp | null => {
  const lastSegment = currentRouteSegments[currentRouteSegments.length - 1];
  
  const findMatchingRoute = (routes: TreeNodeProp[]): TreeNodeProp | null => {
    for (const route of routes) {
      if (route.meta.path === lastSegment) {
        return route;
      }
      if (route.children && route.children.length > 0) {
        const childResult = findMatchingRoute(route.children);
        if (childResult) {
          return childResult;
        }
      }
    }
    return null;
  };

  return findMatchingRoute(allRoutes);
};

