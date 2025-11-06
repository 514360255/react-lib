/*
 * @Author: 郭郭
 * @Date: 2025/8/11
 * @Description:
 */

import { ProFormInstance } from '@ant-design/pro-form';
import { ProTable } from '@ant-design/pro-table';
import { ActionType } from '@ant-design/pro-table/es/typing';
import { Button, message, Popconfirm } from 'antd';
import CustomFormModal from 'antd-lib/CustomFormModal';
import { CustomTableProps } from 'antd-lib/CustomTable/table';
import { cloneDeep } from 'lodash';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { CustomColumnProps } from '../compontent';
import CustomDetailModal from '../CustomDetailModal';

const CustomTable = forwardRef<any, CustomTableProps>(
  (props: Omit<CustomTableProps, 'ref'>, ref) => {
    const {
      isIndex = true,
      isDelete = true,
      isUpdateState = false,
      isDetail = true,
      isUpdate = true,
      isCreate = true,
      createText,
      columns,
      rowKey,
      request,
      title,
      defaultQueryParams = {},
      toolBarRender = [],
      dataSource = null,
      deleteRequest,
      detailRequest,
      saveRequest,
      updateRequest,
      updateStateRequest,
      ...tableProps
    } = props;
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const detailRef = useRef<ActionType>();
    const formModalRef = useRef<ActionType>();
    const [messageApi, messageHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const delEvent = async (id: string) => {
      setLoading(true);
      try {
        if (deleteRequest) {
          await deleteRequest(id);
          messageApi.success('删除成功');
          setTimeout(() => {
            actionRef.current?.reload();
          });
        } else {
          messageApi.error('删除接口未传入');
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    const updateState = async ({ id, isActive }: any) => {
      setLoading(true);
      try {
        if (updateStateRequest) {
          await updateStateRequest({ id, isActive: isActive === 0 ? 1 : 0 });
          messageApi.success('状态修改成功');
          formRef.current?.submit();
        } else {
          messageApi.error('状态修改接口未传入');
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    useImperativeHandle(ref, () => ({
      reload() {
        actionRef.current?.reload();
      },
    }));

    const totalWidth = columns?.reduce(
      (sum: any, col: any) => sum + (col.width || 100),
      0,
    );

    const handleColumns = () => {
      const newColumns = cloneDeep(columns);
      if (
        isIndex &&
        Array.isArray(newColumns) &&
        newColumns[0]?.dataIndex !== 'index'
      ) {
        newColumns.unshift({
          title: '序号',
          dataIndex: 'index',
          valueType: 'index',
          hideInSearch: true,
          hideInForm: true,
          fixed: 'left',
          width: 70,
        });
      }
      newColumns?.forEach((item: CustomColumnProps) => {
        // 所有select/treeSelect都附加搜索功能
        if (['select', 'treeSelect'].includes(item.valueType as string)) {
          item.fieldProps = {
            showSearch: true,
            ...(item.fieldProps || {}),
          };
        }
        return item;
      });
      const operation: CustomColumnProps | undefined = newColumns?.find(
        (item: CustomColumnProps) =>
          item.dataIndex === 'operation' || item.valueType === 'option',
      );

      if (operation) {
        operation.hideInSearch = true;
        operation.hideInDetail = true;
        if (!operation.width) {
          operation.width =
            [isDetail, isDelete, isUpdateState, isUpdate].filter(Boolean)
              .length * 65;
        }
        operation.render = (_: any, record: any) => {
          return (
            <div style={{ display: 'flex' }}>
              {isDetail && (
                <Button
                  type="link"
                  // @ts-ignore
                  onClick={() => detailRef.current?.open(record)}
                >
                  详情
                </Button>
              )}
              {isUpdate && (
                <Button
                  type="link"
                  // @ts-ignore
                  onClick={() => formModalRef.current?.open(record)}
                >
                  编辑
                </Button>
              )}
              {isDelete && (
                <Popconfirm
                  title="确定删除当前数据？"
                  onConfirm={() => delEvent(record.id)}
                >
                  <Button type="link" danger>
                    删除
                  </Button>
                </Popconfirm>
              )}
              {isUpdateState && (
                <Button
                  type="link"
                  danger={record.isActive === 1}
                  onClick={() => updateState(record)}
                >
                  {record.isActive === 0 ? '启用' : '禁用'}
                </Button>
              )}
              {operation.buttons && operation.buttons(record)}
            </div>
          );
        };
      }
      return newColumns?.map((item: CustomColumnProps) =>
        item.dataIndex === 'operation' || item.valueType === 'option'
          ? { ...item, fixed: 'right' }
          : item,
      );
    };

    return (
      <>
        {messageHolder}
        <ProTable
          scroll={{ x: totalWidth, y: 1000 }}
          loading={loading}
          bordered
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            defaultPageSize: 10,
          }}
          actionRef={actionRef}
          formRef={formRef}
          columns={handleColumns() || []}
          request={async (params, sort, filter) => {
            if (request && !dataSource) {
              setLoading(true);
              try {
                const pageNo = params.current;
                delete params.current;
                const { list, ...data } = await request({
                  ...params,
                  pageNo,
                  ...sort,
                  ...filter,
                  ...defaultQueryParams,
                });
                return {
                  data: list,
                  ...data,
                };
              } catch (e) {
                console.log(e);
              } finally {
                setLoading(false);
              }
            }
            return {
              data: [],
              total: 0,
            };
          }}
          rowKey={rowKey || 'id'}
          dateFormatter="string"
          {...(Array.isArray(dataSource) ? { dataSource } : {})}
          toolBarRender={() => [
            ...(toolBarRender || []),
            ...(isCreate
              ? [
                  <Button
                    type="primary"
                    key="create"
                    // @ts-ignore
                    onClick={() => formModalRef.current?.open()}
                  >
                    {createText || '创建'}
                  </Button>,
                ]
              : []),
          ]}
          {...tableProps}
        />
        <CustomDetailModal
          title={title}
          ref={detailRef}
          detailRequest={detailRequest}
          columns={columns.filter(
            (item: CustomColumnProps) =>
              !item.hideInDetail &&
              item.dataIndex !== 'operation' &&
              item.valueType !== 'option',
          )}
        />
        <CustomFormModal
          title={title}
          ref={formModalRef}
          saveRequest={saveRequest}
          updateRequest={updateRequest}
          columns={columns.filter(
            (item: CustomColumnProps) =>
              !item.hideInForm &&
              item.dataIndex !== 'operation' &&
              item.valueType !== 'option',
          )}
        />
      </>
    );
  },
);

export default CustomTable;
