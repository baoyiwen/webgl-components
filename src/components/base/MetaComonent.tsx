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

export type PageComponent = ComponentType & {
  meta: PageMetaType;
};

export abstract class MetaComponent<P = {}, S = {}> extends Component<
  P & MetaComponentProps,
  S
> {
  static meta: PageMetaType;
  constructor(props: P & MetaComponentProps) {
    super(props);
  }

  abstract render(): React.ReactNode;
}
