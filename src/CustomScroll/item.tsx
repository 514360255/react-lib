/*
 * @Author: 郭郭
 * @Date: 2026/1/9
 * @Description:
 */

import type { CustomScrollItemProps } from '@guo514360255/antd-lib/CustomScroll/scrollItem';
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
