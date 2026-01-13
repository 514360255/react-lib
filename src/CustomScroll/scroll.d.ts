/*
 * @Author: 郭郭
 * @Date: 2026/1/9
 * @Description:
 */

import React from 'react';

export interface CustomScrollProps {
  /**
   * 是否自动滚动
   * @default true
   */
  autoplay?: boolean;
  /**
   * 滚动时间间隔（毫秒）
   * @default 3000
   */
  duration?: number;
  /**
   * 是否无限滚动
   * @default true
   */
  infinite?: boolean;
  /**
   * 滚动方向
   * @default vertical
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 滚动内容
   */
  children?: React.ReactNode;
  /**
   * 样式类
   */
  className?: string;
  /**
   * 滚动内容样式
   */
  style?: React.CSSProperties;
  /**
   * 容器内容高度
   */
  height?: number | string;
}
