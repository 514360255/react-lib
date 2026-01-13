/*
 * @Author: 郭郭
 * @Date: 2025/8/11
 * @Description:
 */

import { ProFormInstance } from '@ant-design/pro-form';
import { ProTable } from '@ant-design/pro-table';
import { ActionType } from '@ant-design/pro-table/es/typing';
import CustomFormModal from '@guo514360255/antd-lib/CustomFormModal';
import { CustomTableProps } from '@guo514360255/antd-lib/CustomTable/table';
import { isEmptyValue } from '@guo514360255/antd-lib/utils/util';
import { Button, message, Popconfirm, Progress } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { CustomColumnProps } from '../compontent';
import CustomDetailModal from '../CustomDetailModal';
import './index.less';

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
      formColumns = [],
      formList = {},
      dataSource = null,
      deleteRequest,
      detailRequest,
      saveRequest,
      updateRequest,
      updateStateRequest,
      handleModalData,
      handleDetailData,
      formProps,
      detailProps,
      ...tableProps
    } = props;
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const detailRef = useRef<ActionType>();
    const formModalRef = useRef<ActionType>();
    const [messageApi, messageHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [scrollBar, setScrollBar] = useState(false);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const delEvent = async ({ id }: { id: string }) => {
      setLoading(true);
      try {
        if (deleteRequest) {
          await deleteRequest(id);
          messageApi.success('删除成功');
          setTimeout(() => {
            actionRef.current?.reload();
          }, 0);
        } else {
          messageApi.error('删除接口未传入');
        }
      } catch (e) {
        messageApi.error('删除失败');
        console.log(e);
      } finally {
        setLoading(false);
      }
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
        messageApi.error('状态修改失败');
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    const openModal = (record: any = {}) => {
      // @ts-ignore
      formModalRef.current?.open(record);
    };

    useImperativeHandle(ref, () => ({
      reload() {
        actionRef.current?.reload();
      },
      openModal,
      getFormRef() {
        // @ts-ignore
        return formModalRef?.current?.getFormRef();
      },
      // pro components table action ref
      tableActionRef() {
        return actionRef.current;
      },
      // pro components form ref
      tableFormRef() {
        return formRef.current;
      },
    }));

    const totalWidth = columns
      ?.filter((item: any) => !item.hideInTable)
      ?.reduce((sum: any, col: any) => sum + (col.width || 100), 0);

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

      // progress
      const progress = newColumns?.find(
        (item: CustomColumnProps) => item.type === 'progress',
      );
      if (progress && !progress.render) {
        progress.render = (_: any, record: any) => {
          const percent = record[progress.dataIndex];
          return (
            <Progress percent={percent} format={(percent) => `${percent}%`} />
          );
        };
      }

      const getButtons = (record: any, buts: any[] = []) => [
        {
          text: '详情',
          type: 'link',
          // @ts-ignore
          onClick: detailRef.current?.open,
          isShow: isDetail,
          order: 10,
        },
        {
          text: '编辑',
          type: 'link',
          onClick: openModal,
          isShow: isUpdate,
          order: 20,
        },
        {
          text: '删除',
          type: 'link',
          onClick: delEvent,
          isShow: isDelete,
          isConfirm: true,
          danger: true,
          msg: '确定删除当前数据？',
          order: 30,
        },
        {
          text: record.isActive === 0 ? '禁用' : '启用',
          type: 'link',
          onClick: updateState,
          isShow: isUpdateState,
          danger: record.isActive === 0,
          isConfirm: true,
          msg: `确定要${record.isActive === 0 ? '启用' : '禁用'}该数据吗？`,
          order: 40,
        },
        ...buts,
      ];

      /**
       * 操作列
       * 详情：默认显示
       * 编辑：默认显示
       * 删除：默认显示
       * 启用/禁用：默认不显示
       * buttons：为函数
       */
      const operation: CustomColumnProps | undefined = newColumns?.find(
        (item: CustomColumnProps) =>
          item.dataIndex === 'operation' || item.valueType === 'option',
      );

      if (operation && !operation.render) {
        operation.hideInSearch = true;
        operation.hideInDetail = true;
        if (!operation.width) {
          operation.width =
            [isDetail, isDelete, isUpdateState, isUpdate].filter(Boolean)
              .length * 65;
        }
        operation.render = (_: any, record: any) => {
          const buts = Array.isArray(operation.buttons)
            ? operation.buttons
            : [];
          const buttons = getButtons(record, buts)
            ?.filter((item) => item.isShow || isEmptyValue(item.isShow))
            ?.sort((prev, next) => prev?.order - next?.order);

          return (
            <div style={{ display: 'flex' }}>
              {buttons?.map(
                (
                  {
                    text,
                    msg,
                    isConfirm,
                    onClick,
                    danger,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    isShow,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    order,
                    ...item
                  },
                  index,
                ) => {
                  if (isConfirm) {
                    return (
                      <Popconfirm
                        key={index}
                        title={msg}
                        onConfirm={() => onClick && onClick(record)}
                        {...(item || {})}
                      >
                        <Button type="link" danger={danger} {...item}>
                          {text}
                        </Button>
                      </Popconfirm>
                    );
                  }
                  return (
                    <Button
                      key={index}
                      type="link"
                      onClick={() => onClick && onClick(record)}
                      danger={danger}
                      {...item}
                    >
                      {text}
                    </Button>
                  );
                },
              )}
              {isFunction(operation.buttons) && operation.buttons(record)}
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

    // 控制操作列宽度
    const getAntTableContainer = () => {
      const tableContainer = tableContainerRef.current;
      const tableBody = tableContainer?.querySelector('.ant-table-body');
      setTimeout(() => {
        if (tableBody) {
          const hasVerticalScrollbar =
            tableBody.scrollHeight > tableBody.clientHeight;
          setScrollBar(hasVerticalScrollbar);
          const container: any = tableContainerRef.current?.querySelector(
            '.ant-table-container',
          );
          container.style.transform = 'translateZ(0)';
          requestAnimationFrame(() => {
            container.style.transform = '';
          });
        }
      }, 10);
    };

    useEffect(() => {
      // 初始检测
      const timer = setTimeout(getAntTableContainer, 50);

      // 创建防抖后的 resize 处理函数
      const handleResize = debounce(getAntTableContainer, 100);

      // 监听窗口 resize
      window.addEventListener('resize', handleResize);

      // 清理函数：移除监听器 + 清除定时器
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }, [dataSource]);

    return (
      <div className="custom-table-container" ref={tableContainerRef}>
        {messageHolder}
        <ProTable
          className={`ant-table-container ${
            scrollBar ? '' : 'customer-pro-table-container'
          }`}
          scroll={{
            x: totalWidth,
            y: 5000,
          }}
          loading={loading}
          bordered
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            defaultPageSize: 10,
            ...(Array.isArray(dataSource)
              ? {
                  onChange: () => {
                    setTimeout(() => {
                      getAntTableContainer();
                    }, 50);
                  },
                }
              : {}),
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
                getAntTableContainer();
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
                    onClick={() => openModal({})}
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
          handleDetailData={handleDetailData}
          columns={columns.filter(
            (item: CustomColumnProps) =>
              !item.hideInDetail &&
              item.dataIndex !== 'operation' &&
              item.valueType !== 'option',
          )}
          {...(detailProps || {})}
        />
        <CustomFormModal
          title={title}
          ref={formModalRef}
          tableActionRef={actionRef}
          formList={formList}
          formColumns={formColumns}
          saveRequest={saveRequest}
          updateRequest={updateRequest}
          detailRequest={detailRequest}
          handleModalData={handleModalData}
          columns={columns.filter(
            (item: CustomColumnProps) =>
              !item.hideInForm &&
              item.dataIndex !== 'operation' &&
              item.valueType !== 'option',
          )}
          {...(formProps || {})}
        />
      </div>
    );
  },
);

export default CustomTable;
