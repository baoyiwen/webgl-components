import { GetProps } from 'antd';
import { Component, createElement, HTMLAttributes, ReactNode } from 'react';
import * as Icons from '@ant-design/icons';
// import Icon from '@ant-design/icons';

export const getIconElement = (props: { iconType: string }) => {
  const { iconType } = props;

  const antIcon: { [key: string]: any } = Icons;

  return antIcon[iconType];
};

export type CustomIconComponentProps = Partial<GetProps<typeof Icons>> &
  HTMLAttributes<any> & {
    iconType: string;
  };
export class Icon extends Component<CustomIconComponentProps> {
  constructor(props: CustomIconComponentProps) {
    super(props);
  }

  render(): ReactNode {
    const { iconType, ...iconProps } = this.props;
    const iconComponent = getIconElement({ iconType });
    return createElement(iconComponent, iconProps);
  }
}
