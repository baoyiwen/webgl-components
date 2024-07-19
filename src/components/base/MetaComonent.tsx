import {
  Component,
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { PageMetaType } from '../../types';

export type MetaComponentProps = HTMLAttributes<any> & {
  className?: string;
  style?: CSSProperties;
};

export type MetaComonentState = {};

export type PageComponent = ComponentType & {
  meta: PageMetaType;
};

export abstract class MetaComponent<
  P = MetaComponentProps,
  S = MetaComonentState,
> extends Component<P, S> {
  static meta: PageMetaType;
  constructor(props: P) {
    super(props);
  }

  abstract render(): React.ReactNode;
}
