import {
  findTreeNodeByKey,
  isEmptyValue,
} from '@guo514360255/antd-lib/utils/util';
import { Descriptions, Image, Spin } from 'antd';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import React, { useEffect, useState } from 'react';
import { CustomColumnProps } from '../compontent';
import type { CustomDescriptionsProps } from './descriptions';

/*
 * @Author: 郭郭
 * @Date: 2026/4/8
 * @Description:
 */
const CustomDescriptions = ({
  request,
  handleDetailData,
  columns,
  values,
  ...descProps
}: CustomDescriptionsProps) => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any>({});

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
          result.push((valuesEnum as any)[item]?.text || value);
        });
        return result.join(',');
      } else if (Array.isArray(options) && options.length > 0) {
        values.forEach((item: any) => {
          const { label } = findTreeNodeByKey(options, item) || {};
          console.log(label, '...label...');
          result.push(label || value);
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

  const getDetail = async (id: string | number) => {
    // 参数验证
    if (!isString(id) && !isNumber(id)) {
      console.warn('Invalid id parameter:', id);
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      if (request) {
        const data = await request(id);
        setDetail(handleDetailData ? handleDetailData(data) : data);
      }
    } catch (e) {
      console.error('Failed to fetch detail:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (values?.id && request) {
        await getDetail(values.id);
      } else {
        setDetail(handleDetailData ? await handleDetailData(values) : values);
      }
    })();
  }, [JSON.stringify(values)]);

  return (
    <>
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
                    handleDetailValue(item, detail[item.dataIndex], index) ||
                    '-'
                  )}
                  <span>{item.fieldProps?.suffix || ''}</span>
                </Descriptions.Item>
              </React.Fragment>
            );
          })}
      </Descriptions>

      <Spin spinning={loading} fullscreen />
    </>
  );
};

export default CustomDescriptions;
