/*
 * @Author: 郭郭
 * @Date: 2025/11/11
 * @Description:
 */
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
    const { color, text } = column.valueEnum[record.status] || {};
    return <Tag color={color}>{text}</Tag>;
  }
  if (!value) return <>{value}</>;
  const { color, text } = (valueEnum as any)[value] || {};
  return <Tag color={color}>{text}</Tag>;
};

export default CustomTag;
