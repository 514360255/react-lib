/*
 * @Author: 郭郭
 * @Date: 2026/1/9
 * @Description:
 */
import type { CustomScrollProps } from '@guo514360255/antd-lib/CustomScroll/scroll';
import React, { useEffect } from 'react';
import './index.less';
import Item from './item';

const CustomScroll = (props: CustomScrollProps) => {
  const {
    children,
    autoplay = true,
    className,
    duration = 3000,
    infinite = false,
    direction = 'vertical',
    style = {},
    height,
  } = props;
  const timerRef = React.useRef<any>(null);
  const scrollRef = React.useRef<any>(null);

  const handleScroll = () => {
    timerRef.current = setTimeout(() => {
      console.log(true);
      console.log(scrollRef.current);
      handleScroll();
    }, duration);
  };

  useEffect(() => {
    if (autoplay) {
      handleScroll();
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`custom-scroll-container ${
        direction === 'horizontal' ? 'horizontal' : ''
      } ${className ?? ''}`}
      style={{ height, ...style }}
    >
      <div>{children}</div>
    </div>
  );
};

CustomScroll.Item = Item;

export default CustomScroll;
