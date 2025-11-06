/*
 * @Author: 郭郭
 * @Date: 2025/11/5
 * @Description:
 */

import { CustomColumnProps } from '../compontent';

/**
 * 详情props
 */
interface CustomDetailModalProps {
  /**
   * 标题
   */
  title?: string | undefined;

  /**
   * 弹窗类型
   */
  type?: 'modal' | 'drawer' | 'detail';

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
  handleDetailData?: (data: any) => any;

  /**
   * 详情
   * @param data
   */
  detailRequest?: (data: any) => any;

  /**
   * 其它参数
   */
  [key: string]: any;

  /**
   * descriptions参数
   */
  detailDescProps?: {
    [key: string]: any;
  };
}
