/*
 * @Author: 郭郭
 * @Date: 2025/11/11
 * @Description:
 */

import type { TagProps } from 'antd';

interface CustomTagProps {
  /**
   * 标签名称
   */
  value: string | number | boolean;

  /**
   * 配置数组
   */
  options?: Array<{
    [key: string | number | boolean]: any;
    tagProps?: TagProps;
  }>;

  /**
   * 异步数据
   */
  // request?: (params: any) => Promise<any>;

  /**
   * 枚举
   */
  valueEnum?: {
    [key: stirng | number | boolean]: {
      text: string;
      status?: string;
      color?: string;
      tagProps?: TagProps;
    };
  };
}
