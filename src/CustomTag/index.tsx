/*
 * @Author: 郭郭
 * @Date: 2025/11/11
 * @Description:
 */
import type { CustomTagProps } from '@guo514360255/antd-lib/CustomTag/tag';
import { isEmptyValue } from '@guo514360255/antd-lib/utils/util';
import { Tag } from 'antd';
import isObject from 'lodash/isObject';
import React from 'react';

const CustomTag = ({ value, valueEnum, options }: CustomTagProps) => {
  // 判空
  if (isEmptyValue(value)) return <>-</>;

  // 判断valueEnum 和 options是否为空
  if (
    (!valueEnum && !options) ||
    (!isObject(valueEnum) && !options) ||
    (!Array.isArray(options) && !valueEnum)
  ) {
    return <>{value}</>;
  }

  // 渲染标签
  const render = (color: string, text: any, tagProps?: any) => {
    return (
      <Tag color={color} {...(tagProps || {})}>
        {text}
      </Tag>
    );
  };

  let newValues: any[] = `${value}`?.split(',');
  const result: any[] = [];

  // 判断newValues长度
  if (newValues.length === 1) {
    newValues = [value];
  }

  // 循环value值获取text || label
  newValues.forEach((val) => {
    if (Array.isArray(options)) {
      const { label, color, status, tagProps } =
        (options as any).filter((item: any) => `${item.value}` === `${val}`) ||
        {};
      result.push(render(color || status, label || val, tagProps));
    } else {
      const { color, status, text, tagProps } =
        (valueEnum as any)[val as any] || {};
      result.push(render(color || status, text || val, tagProps));
    }
  });

  return result.map((item, index) => {
    return <React.Fragment key={index}>{item}</React.Fragment>;
  });
};

export default CustomTag;
