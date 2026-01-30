/*
 * @Author: 郭郭
 * @Date: 2025/11/5
 * @Description:
 */

import { ProColumns } from '@ant-design/pro-table';

interface CustomTableProps {
  /**
   * 表格标题
   */
  title?: string | undefined;

  /**
   * 是否有序号
   */
  isIndex?: boolean;

  /**
   * 是否有详情
   */
  isDetail?: boolean;

  /**
   * 是否有删除按钮
   */
  isDelete?: boolean;

  /**
   * 是否有编辑按钮
   */
  isUpdate?: boolean;

  /**
   * 是否创建按钮
   */
  isCreate?: boolean;

  /**
   * 创建按钮文案
   */
  createText?: string;

  /**
   * 提交按钮文案
   */
  okText?: string;

  /**
   * 取消按钮文案
   */
  cancelText?: string;

  /**
   * 是否有编辑状态按钮
   */
  isUpdateState?: boolean;

  /**
   * 字段列表
   */
  columns: ProColumns[];

  /**
   * form字段列表
   */
  formColumns: ProColumns[];

  /**
   * record key
   */
  rowKey?: string;

  /**
   * 请求api
   * @param data
   */
  request?: (data?: any) => any;

  /**
   * 删除api
   * @param data
   */
  deleteRequest?: (data?: any) => any;

  /**
   * 修改状态api
   * @param data
   */
  updateStateRequest?: (data?: any) => any;

  /**
   * 详情
   * @param data
   */
  detailRequest?: (data: any) => any;

  /**
   * 保存
   * @param data
   */
  saveRequest?: (data: any) => any;

  /**
   * 编辑
   * @param data
   */
  updateRequest?: (data: any) => any;

  /**
   * 处理form弹窗的数据
   * @param data
   */
  handleModalData?: (data: any) => any;

  /**
   * 处理详情弹窗的数据
   * @param data
   */
  handleDetailData?: (data: any) => any;

  /**
   * 处理提交的数据
   * @param data
   */
  handleData?: (data: any) => any;

  /**
   * 数据源
   */
  dataSource?: { [key: string]: any }[] | null;

  /**
   *
   */
  defaultQueryParams?: {
    [key: string]: any;
  };

  /**
   * 工具栏渲染
   */
  toolBarRender?: any[];

  /**
   * form props
   */
  formProps?: { [key: string]: any };

  /**
   * detail props
   */
  detailProps?: { [key: string]: any };

  /**
   * 表单组
   */
  formList?: {
    [key: string]: any;
  };

  /**
   * 其它参数
   */
  [key: string]: any;
}
