import Icons from '@ant-design/icons';
import { createElement } from 'react';

export const getIconElement = (props: { iconType: string }) => {
  const { iconType } = props;

  const antIcon: { [key: string]: any } = Icons;

  return createElement(antIcon[iconType]);
};
