/*
 * @Author: 郭郭
 * @Date: 2025/8/15
 * @Description:
 */

import type { ProColumns } from '@ant-design/pro-table';
import type { Rules } from '@rc-component/async-validator';
import type { ButtonProps } from 'antd';
import type { ImgCropProps } from 'antd-img-crop';

interface CustomColumnProps extends ProColumns {
  /**
   * 字段类型
   */
  type?:
    | 'input'
    | 'radio'
    | 'select'
    | 'checkbox'
    | 'inputNumber'
    | 'treeSelect'
    | 'textArea'
    | 'upload'
    | 'progress'
    | 'tag'
    | 'list';

  /**
   * 是否必填
   */
  required?: boolean;

  /**
   * 校验
   */
  rules?: Rules[];

  /**
   * 表单字段绑定
   */
  fieldProps?: {
    /**
     * 详情item参数
     */
    descriptionsItemProps?: {
      [key: string]: any;
    };
    /**
     * 图片上传接口
     * @param data
     */
    request?: (data: any) => any;

    /**
     * 裁切图片参数
     */
    imgCrop?:
      | ImgCropProps
      | {
          aspect?: any;
        };

    /**
     * 是否裁切图片
     */
    isCrop?: boolean;

    [key: string]: any;
  };

  /**
   * 表单字段唯一key
   */
  formKey?: string;

  /**
   * 详情是否展示
   */
  hideInDetail?: boolean;

  /**
   * 操作按钮
   */
  buttons?: (data: {
    [key: string]: any;
  }) => any | (ButtonProps & { text: string; order: number }[]);
}
