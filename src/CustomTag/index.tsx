/*
 * @Author: 郭郭
 * @Date: 2025/11/11
 * @Description:
 */
import { isEmptyValue } from '@guo514360255/antd-lib/utils/util';
import { Tag } from 'antd';
import React from 'react';

const CustomTag = (
  { value, valueEnum }: CustomTagProps,
  record?: any,
  __?: any,
  ___?: any,
  column?: any,
) => {
  if (column) {
    const { color, status, text } = column.valueEnum[record.status] || {};
    return <Tag color={color || status}>{text}</Tag>;
  }
  if (isEmptyValue(value)) return <>{value}</>;
  const { color, status, text } = (valueEnum as any)[value] || {};
  return <Tag color={color || status}>{text}</Tag>;
};

export default CustomTag;
