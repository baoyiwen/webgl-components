import { PageMetaType } from '../types';
import { ComponentType } from 'react';

export type PageComponent = ComponentType & {
  meta?: PageMetaType;
};

export type PageMeta = {
  component: PageComponent;
  meta: PageMetaType;
};

export const loadPage = async (): Promise<PageMeta[]> => {
  const modules = import.meta.glob('../page/**/*.tsx');
  const pages: PageMeta[] = [];

  for (const path in modules) {
    const module = (await modules[path]()) as any;
    const component = module.default as PageComponent;
    if (component && component.meta) {
      pages.push({ component, meta: component.meta });
    }
  }

  return pages;
};
