import { PageMetaType } from '../types';
import { ComponentType } from 'react';

export type PageComponent = ComponentType & {
  meta?: PageMetaType;
};

export type PageMeta = {
  componentPath: string;
  meta: PageMetaType;
};

export const loadPage = async (): Promise<PageMeta[]> => {
  const modules = import.meta.glob('../page/**/*.tsx');
  const pages: PageMeta[] = [];

  for (const path in modules) {
    const module = (await modules[path]()) as any;
    const component = module.default as PageComponent;
    if (component && component.meta) {
      pages.push({ componentPath: path, meta: component.meta });
    }
  }

  return pages;
};
