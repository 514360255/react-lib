/*
 * @Author: 郭郭
 * @Date: 2026/4/8
 * @Description:
 */
import { CustomColumnProps } from '@guo514360255/antd-lib/src';

export interface CustomDescriptionsProps {
  /**
   * 处理详情数据
   */
  handleDetailData?: (data: any) => any;

  /**
   * 请求接口
   */
  request?: (data: any) => any;

  /**
   * 字段
   */
  columns: CustomColumnProps[];

  /**
   * 值
   */
  values?: { [key: string]: any };
}
