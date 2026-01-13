/*
 * @Author: 郭郭
 * @Date: 2026/1/9
 * @Description:
 */

import React from 'react';

export interface CustomScrollItemProps {
  /**
   * 滚动内容
   */
  children?: React.ReactNode;
  /**
   * 滚动内容样式
   */
  style?: React.CSSProperties;
  /**
   * 滚动内容类名
   */
  className?: string;
}
