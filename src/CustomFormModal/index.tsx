/*
 * @Author: 郭郭
 * @Date: 2025/8/15
 * @Description:
 */

import { DeleteOutlined } from '@ant-design/icons';
import { CustomFormModalProps } from '@guo514360255/antd-lib/CustomFormModal/formModal';
import { useFormData } from '@guo514360255/antd-lib/store/useFormData';
import { Button, Drawer, Form, message, Modal, Spin } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { FormRef } from 'rc-field-form';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { CustomColumnProps } from '../compontent';
import CustomUpload from '../CustomUpload';
import FormItem from '../FormItem';
import './index.less';

const CustomFormModal = forwardRef<any, CustomFormModalProps>(
  (props: Omit<CustomFormModalProps, 'ref'>, ref) => {
    const {
      type,
      onSubmit,
      columns,
      formColumns,
      saveRequest,
      updateRequest,
      detailRequest,
      handleData,
      title,
      tableActionRef,
      formList = {},
      handleModalData,
      ...other
    } = props;
    const formRef: React.LegacyRef<FormRef> | undefined = useRef<any>();
    const { formValues, setFieldValues } = useFormData();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [messageApi, messageHolder] = message.useMessage();
    const formKey = '_form_key';
    const modalType: any = {
      modal: Modal,
      drawer: Drawer,
    };

    const Component = modalType[type || 'drawer'];
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

    useImperativeHandle(ref, () => ({
      async open(values: { [key: string]: any }) {
        setOpen(true);
        if (values?.id && detailRequest) {
          setDetailLoading(true);
          try {
            const data = await detailRequest(values.id);
            columns?.forEach((item: CustomColumnProps) => {
              if (item.formKey) {
                data[`${item.dataIndex}${formKey}`] = data[item.dataIndex];
              }
            });
            const newData = handleModalData
              ? await handleModalData(data || {})
              : data || {};
            setFieldValues(newData);
            formRef.current?.setFieldsValue(newData || {});
            return;
          } catch (e) {
            console.warn(e);
          } finally {
            setDetailLoading(false);
          }
        }
        setTimeout(async () => {
          const newData = handleModalData
            ? await handleModalData(values || {})
            : values || {};
          setFieldValues(newData);
          formRef.current?.setFieldsValue(newData || {});
        }, 0);
      },
      getFormRef() {
        return formRef.current;
      },
    }));

    const submitEvent = async () => {
      setLoading(true);
      try {
        const formData = await formRef.current?.validateFields();
        const data = { ...formValues, ...formData };
        let result: any = {};
        for (const key in data) {
          if (new RegExp(formKey).test(key)) {
            result[key.replace(new RegExp(formKey), '')] = data[key];
          } else {
            result[key] = data[key];
          }
        }
        if (handleData) {
          result = handleData(result);
        }
        if (formValues.id) {
          if (updateRequest) {
            await updateRequest(result);
          }
        } else {
          if (saveRequest) {
            await saveRequest(result);
          }
        }
        setOpen(false);
        formRef.current?.resetFields();
        if (onSubmit) {
          onSubmit();
        }
        messageApi.success('提交成功');
        tableActionRef?.current?.reload();
      } catch (e) {
        console.log(e, 'submit request error');
      }
      setLoading(false);
    };

    const close = () => {
      setOpen(false);
      formRef.current?.resetFields();
      if (onSubmit) {
        onSubmit();
      }
    };

    const footer = [
      <Button key="cancel" size="large" onClick={close}>
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        size="large"
        loading={loading}
        onClick={submitEvent}
      >
        提交
      </Button>,
    ];

    const getPlaceholder = (type: string | undefined, title: any) => {
      return `请${placeholder[(type as string) || 'input'] || '选择'}${
        title ? title : ''
      }`;
    };

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
      <div className="custom-modal-container">
        {messageHolder}
        <Spin className="spin-contianer" fullscreen spinning={detailLoading} />
        <Component
          width={other.width || 600}
          footer={footer}
          title={`${!!formValues.id ? '编辑' : '新增'}${title || ''}`}
          {...other}
          open={open}
          onClose={close}
          className="formContainer"
        >
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
              const defaultPlaceholder = getPlaceholder(item.type, item.title);
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
                >
                  {item.type === 'upload' ? (
                    // @ts-ignore
                    <CustomUpload {...item} />
                  ) : (
                    <FormItem
                      {...item}
                      defaultPlaceholder={defaultPlaceholder}
                    />
                  )}
                </Form.Item>
              );
            })}
          </Form>
        </Component>
      </div>
    );
  },
);

export default CustomFormModal;
