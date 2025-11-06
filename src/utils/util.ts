/*
 * @Author: 郭郭
 * @Date: 2025/11/4
 * @Description:
 */
import { GetProp, UploadProps } from 'antd';
import { isEmpty, isNil, isString } from 'lodash';
import isFinite from 'lodash/isFinite';

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
