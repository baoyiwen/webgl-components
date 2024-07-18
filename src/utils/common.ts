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
