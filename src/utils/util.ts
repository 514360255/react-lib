/*
 * @Author: 郭郭
 * @Date: 2025/11/4
 * @Description:
 */
import { CustomColumnProps } from '@guo514360255/antd-lib/src';
import { GetProp, UploadProps } from 'antd';
import isEmpty from 'lodash/isEmpty';
import isFinite from 'lodash/isFinite';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

/**
 * 本地文件转为base64
 * @param file
 */
export const fileTransformBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/**
 * valueEnum 转换为 options
 * @param data
 * @param val
 * @param label
 * @param value
 */
export const valueEnumTransform = (
  data: { [key: string]: any } = {},
  val: any,
  label: string = 'label',
  value: string = 'value',
) => {
  const result = [];
  const isNumber = isFinite(val);
  // eslint-disable-next-line guard-for-in
  for (let key in data) {
    result.push({
      [label]: data[key]?.text || '-',
      [value]: isNumber ? Number(key) : key,
    });
  }
  return result;
};

/**
 * 根据key超找树的节点
 * @param tree
 * @param value
 * @param key
 */
export const findTreeNodeByKey = (
  tree: any[],
  value: any,
  key: string = 'value',
) => {
  const stack = [...tree];
  while (stack.length > 0) {
    const node = stack.pop();
    if (`${node[key]}` === `${value}`) return node;
    if (node.children) stack.push(...node.children);
  }
  return null;
};

/**
 * 判断是否为空 '' | undefined | null
 * @param value
 */
export const isEmptyValue = (value: any) => {
  return isNil(value) || value === '' || (isString(value) && isEmpty(value));
};

/**
 * 随机数
 * @param min
 * @param max
 */
export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 首字母转化为大写
 * @param string
 */
export const capitalizeFirstLetter = (string: string | number) => {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
};

/**
 * 数组类型转化为首字母大写
 * @param strings
 */
export const capitalizeFirstLetters = (strings: string[]) => {
  if (!Array.isArray(strings)) {
    return strings;
  }
  return strings.map(capitalizeFirstLetter);
};

/**
 * 处理字段属性
 * @param setColumns
 * @param code
 * @param fn
 */
export const handleColumnFieldProps = (
  setColumns: any,
  code: string,
  fn: (data: any) => void,
) => {
  setColumns((s: CustomColumnProps[]) => {
    const column: CustomColumnProps | undefined = s.find(
      (item: any) => item.dataIndex === code,
    );
    if (column && column.fieldProps) {
      fn(column);
    }
    return s;
  });
};
