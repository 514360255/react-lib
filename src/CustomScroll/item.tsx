/*
 * @Author: 郭郭
 * @Date: 2026/1/9
 * @Description:
 */

import type { CustomScrollItemProps } from './scrollItem';
import React from 'react';

const Item = (props: CustomScrollItemProps) => {
  const { children, className, style = {} } = props;
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Item;
