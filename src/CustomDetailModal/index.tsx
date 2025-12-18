/*
 * @Author: 郭郭
 * @Date: 2025/8/15
 * @Description:
 */

import { CustomDetailModalProps } from '@guo514360255/antd-lib/CustomDetailModal/detailModal';
import {
  findTreeNodeByKey,
  isEmptyValue,
} from '@guo514360255/antd-lib/utils/util';
import { Descriptions, Drawer, Image, Modal, Spin } from 'antd';
import { isNumber, isString } from 'lodash';
import isObject from 'lodash/isObject';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { CustomColumnProps } from '../compontent';
import './index.less';

const CustomModal = forwardRef<any, CustomDetailModalProps>(
  (props: Omit<CustomDetailModalProps, 'ref'>, ref) => {
    const {
      type,
      columns,
      detailRequest,
      handleDetailData,
      title,
      descProps,
      ...other
    } = props;
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState<any>({});
    const modalType: any = {
      modal: Modal,
      drawer: Drawer,
    };

    const Component = modalType[type || 'drawer'];

    const getDetail = async (id: string | number) => {
      // 参数验证
      if (!isString(id) && !isNumber(id)) {
        console.warn('Invalid id parameter:', id);
        return;
      }
      if (loading) return;
      setLoading(true);
      try {
        const data = await detailRequest(id);
        setDetail(handleDetailData ? handleDetailData(data) : data);
      } catch (e) {
        console.error('Failed to fetch detail:', e);
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      async open(values: { [key: string]: any }) {
        setOpen(true);
        if (values.id && detailRequest) {
          await getDetail(values.id);
        } else {
          setDetail(values);
        }
      },
    }));

    const close = () => {
      setOpen(false);
    };

    const handleDetailValue = (
      column: CustomColumnProps,
      value: any,
      index: number,
    ) => {
      if (isEmptyValue(value)) return value;
      const { fieldProps, valueEnum } = column;
      const { options } = fieldProps || {};
      if (column.render) {
        return column.render(value, detail, index, {} as any, column as any);
      } else if (['select', 'radio'].includes(column.type as string)) {
        const valuesEnum: any = { ...valueEnum };
        const values = `${value}`.split(',');
        const result: string[] = [];
        if (Object.keys(valuesEnum).length > 0 && isObject(valuesEnum)) {
          values.forEach((item: any) => {
            result.push((valuesEnum as any)[item]?.text);
          });
          return result.join(',');
        } else if (Array.isArray(options) && options.length > 0) {
          values.forEach((item: any) => {
            const { label } = findTreeNodeByKey(options, item) || {};
            result.push(label);
          });
          return result.join(',');
        }
        return value;
      }
      return value;
    };

    const DescImage = ({ data }: any) => {
      if (!data) return data;
      let list: any[] = data;
      if (typeof data === 'string') {
        list = data.split(',');
      }
      return (
        <Image.PreviewGroup>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {list.map((item: any, index: number) => (
              <Image
                key={index}
                width={100}
                src={item.url || item}
                alt={item.name || item}
                style={{ marginRight: 10 }}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      );
    };

    return (
      <>
        <Component
          width={other.width || 600}
          title={`${title || ''}详情`}
          {...other}
          open={open}
          onClose={close}
          className="detailContainer"
        >
          <Descriptions column={1} bordered {...(descProps || {})}>
            {columns
              ?.filter((item: CustomColumnProps) => !item.hideInDetail)
              .map((item: CustomColumnProps, index: number) => {
                return (
                  <React.Fragment key={item.dataIndex}>
                    <Descriptions.Item
                      key={item.dataIndex}
                      label={`${item.title}`}
                      {...(item.fieldProps?.descriptionsItemProps || {})}
                    >
                      {item.type === 'upload' ? (
                        <DescImage data={detail[item.dataIndex]} />
                      ) : (
                        handleDetailValue(
                          item,
                          detail[item.dataIndex],
                          index,
                        ) || '-'
                      )}
                    </Descriptions.Item>
                  </React.Fragment>
                );
              })}
          </Descriptions>
        </Component>
        <Spin spinning={loading} fullscreen />
      </>
    );
  },
);

export default CustomModal;
