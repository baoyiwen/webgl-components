import { Component, ReactNode, ComponentProps } from 'react';

export type PageMeta = {
  label: string;
  path: string;
  children?: PageMeta[];
  default?: boolean;
  content?: ReactNode;
};

export type MetaComponentProps = {};

export class MetaComponent extends Component {
  meta!: PageMeta;
  constructor(props: MetaComponentProps) {
    super(props);
  }
}
