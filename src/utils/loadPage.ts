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
    try {
      const module = (await modules[path]()) as any;
      const component = module.default as PageComponent;
      if (component && component.meta) {
        pages.push({ componentPath: path, meta: component.meta });
      } else {
        console.warn(`Component at ${path} does not have meta information.`);
      }
    } catch (error) {
      console.error(`Failed to load module at ${path}:`, error);
    }
  }

  if (pages.length === 0) {
    console.error(
      'No pages found. Ensure the path is correct and the files have the expected format.',
    );
  }

  return pages;
};
