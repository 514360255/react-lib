/*
 * @Author: 郭郭
 * @Date: 2025/11/5
 * @Description:
 */

import { CustomColumnProps } from '../compontent';

/**
 * form props
 */
interface CustomFormModalProps {
  /**
   * 标题
   */
  title?: string | undefined;

  /**
   * 弹窗类型
   */
  type?: 'modal' | 'drawer' | 'detail';

  /**
   * 提交成功后事件
   * @param data
   */
  onSubmit?: (data?: { [key: string]: any } | boolean) => void;

  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 表单字段
   */
  columns?: CustomColumnProps[];

  /**
   * form列表
   */
  formList?: {
    [key: string]: any;
  };

  /**
   * 表单默认值
   */
  values?: { [key: string]: any };

  /**
   * 处理form数据
   */
  handleData?: (data: any) => any;

  /**
   * 保存
   * @param data
   */
  saveRequest?: (data: any) => any;

  /**
   * 修改
   * @param data
   */
  updateRequest?: (data: any) => any;

  /**
   * 详情
   * @param data
   */
  detailRequest?: (data: any) => any;

  /**
   * 其它参数
   */
  [key: string]: any;
}
