/*
 * @Author: 郭郭
 * @Date: 2025/11/11
 * @Description:
 */

interface CustomTagProps {
  /**
   * 标签名称
   */
  value: string | number;

  /**
   * 枚举
   */
  valueEnum: {
    [key: stirng]: { text: string; status?: string; color?: string };
  };
}
