/*
 * @Author: 郭郭
 * @Date: 2026/1/27
 * @Description:
 */

import { CustomColumnProps } from '@guo514360255/antd-lib/src';

interface CustomFormProps {
  /**
   * 表单字段
   */
  columns: CustomColumnProps[];
  /**
   * 表单字段
   */
  formColumns?: CustomColumnProps[];
  /**
   * 表单字段
   */
  formList?: {
    [key: string]: CustomColumnProps[];
  };
  /**
   * 字段key
   */
  formKey?: string;
}
