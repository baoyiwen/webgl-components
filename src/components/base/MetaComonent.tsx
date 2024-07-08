import { Component, CSSProperties, HTMLAttributes } from 'react';
import { PageMetaType } from '../../types';

export type MetaComponentProps = HTMLAttributes<any> & {
  className?: string;
  style?: CSSProperties;
};

export class MetaComponent<P = {}, S = {}> extends Component<
  P & MetaComponentProps,
  S
> {
  meta!: PageMetaType;
  constructor(props: P & MetaComponentProps) {
    super(props);
  }
}
