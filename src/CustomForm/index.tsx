/*
 * @Author: 郭郭
 * @Date: 2026/1/27
 * @Description:
 */

import { DeleteOutlined } from '@ant-design/icons';
import { useFormData } from '@guo514360255/antd-lib/store/useFormData';
import { Button, Form } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { FormRef } from 'rc-field-form';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import type { CustomColumnProps } from '../compontent';
import CustomUpload from '../CustomUpload';
import FormItem from '../FormItem';
import type { CustomFormProps } from './form';
import './index.less';

const CustomForm = forwardRef<any, CustomFormProps>(
  (props: Omit<CustomFormProps, 'ref'>, ref) => {
    const { columns, formList = {}, formKey, formColumns } = props;
    const { formValues, setFieldValues } = useFormData();
    const formRef: React.LegacyRef<FormRef> | undefined = useRef<any>();
    const placeholder: any = {
      input: '输入',
      upload: '上传',
    };
    const handleColumns = (columns: CustomColumnProps[]) => {
      const newColumns: CustomColumnProps[] = (columns || []).filter(
        (item: CustomColumnProps) => !item.hideInForm,
      );
      newColumns?.forEach((item: CustomColumnProps) => {
        // 所有select/treeSelect都附加搜索功能
        if (['select', 'treeSelect'].includes(item.type as string)) {
          item.fieldProps = {
            showSearch: true,
            ...(item.fieldProps || {}),
          };
        }
        return item;
      });
      return cloneDeep(newColumns).map((item) => {
        if (item.formKey) {
          const key = /_form_key$/.test(item.formKey) ? '' : formKey;
          item.dataIndex = item.formKey + key;
        }
        return item;
      });
    };

    const getPlaceholder = (type: string | undefined, title: any) => {
      return `请${placeholder[(type as string) || 'input'] || '选择'}${
        title ? title : ''
      }`;
    };

    useImperativeHandle(ref, () => ({
      setValues: (values: any) => {
        setFieldValues(values);
      },
      getFormRef() {
        return formRef.current;
      },
    }));

    // 深度监听form数据
    useDeepCompareEffect(() => {
      formRef.current?.setFieldsValue(formValues || {});
    }, [formValues]);

    useEffect(() => {
      return () => {
        setFieldValues({});
      };
    }, []);

    return (
      <div className="formContainer">
        <Form
          size="large"
          layout="vertical"
          autoComplete="off"
          ref={formRef}
          clearOnDestroy
        >
          {handleColumns(
            Array.isArray(formColumns) && formColumns.length
              ? formColumns.filter((item) => !item.hideInForm)
              : columns || [],
          ).map((item: CustomColumnProps) => {
            const defaultPlaceholder: any = getPlaceholder(
              item.type,
              item.title,
            );
            return item.type === 'list' ? (
              <Form.List name={item.dataIndex} key={item.dataIndex}>
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, key) => {
                      return (
                        <Form.Item
                          label={key === 0 ? `${item.title}` : ''}
                          key={field.key}
                          rules={item.required ? [{ required: true }] : []}
                          className="dynamicItemContainer"
                        >
                          <div className="listGroupContainer">
                            <div className="listGroupContent">
                              {(formList[item.dataIndex] || [])
                                .filter((item: any) => !item.hideInForm)
                                .map((list: any) => {
                                  const placeholder = getPlaceholder(
                                    list.type,
                                    list.title,
                                  );
                                  return (
                                    <Form.Item
                                      name={[field.name, list.dataIndex]}
                                      label={list.title}
                                      key={list.dataIndex}
                                      labelAlign="right"
                                      rules={[
                                        {
                                          required: list.required,
                                          message: placeholder,
                                        },
                                        ...(list.rules || []),
                                      ]}
                                      {...(list.fieldProps?.formItemProps ||
                                        {})}
                                    >
                                      {list.type === 'upload' ? (
                                        <CustomUpload {...list} />
                                      ) : (
                                        <FormItem
                                          {...list}
                                          defaultPlaceholder={placeholder}
                                        />
                                      )}
                                    </Form.Item>
                                  );
                                })}
                            </div>
                            <span className="listDelIcon">
                              <DeleteOutlined
                                onClick={() => remove(field.name)}
                              />
                            </span>
                          </div>
                        </Form.Item>
                      );
                    })}
                    <Form.Item>
                      <Button type="dashed" block onClick={() => add()}>
                        {'新增' + item.title}
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            ) : (
              <Form.Item
                key={item.dataIndex}
                label={item.title ? `${item.title}` : ''}
                name={item.dataIndex}
                rules={[
                  { required: item.required, message: defaultPlaceholder },
                  ...(item.rules || []),
                ]}
                {...(item.fieldProps?.formItemProps || {})}
              >
                {item.type === 'upload' ? (
                  // @ts-ignore
                  <CustomUpload {...item} />
                ) : (
                  <FormItem {...item} defaultPlaceholder={defaultPlaceholder} />
                )}
              </Form.Item>
            );
          })}
        </Form>
      </div>
    );
  },
);

export default CustomForm;
