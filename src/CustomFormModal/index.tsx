/*
 * @Author: 郭郭
 * @Date: 2025/8/15
 * @Description:
 */

import { useFormData } from '@guo514360255/antd-lib/store/useFormData';
import { Button, Drawer, message, Modal, Spin } from 'antd';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { CustomColumnProps } from '../compontent';
import CustomForm from '../CustomForm';
import type { CustomFormModalProps } from './formModal';
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
    const formRef: any = useRef<any>();
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

    useImperativeHandle(ref, () => ({
      async open(values: { [key: string]: any }) {
        const ref: any = formRef.current?.getFormRef();
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
            ref?.setFieldsValue(newData || {});
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
          ref?.setFieldsValue(newData || {});
        }, 0);
      },
      getFormRef() {
        return ref;
      },
    }));

    const submitEvent = async () => {
      setLoading(true);
      const ref: any = formRef.current?.getFormRef();
      try {
        if (!updateRequest && !saveRequest) {
          messageApi.error('未提供保存或修改接口');
          return;
        }
        const formData = await ref?.validateFields();
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
        ref?.resetFields();
        if (onSubmit) {
          onSubmit();
        }
        messageApi.success('提交成功');
        tableActionRef?.current?.reload();
      } catch (e) {
        console.log(e, 'submit request error');
      } finally {
        setLoading(false);
      }
    };

    const close = () => {
      setOpen(false);
      const ref: any = formRef.current?.getFormRef();
      ref?.resetFields();
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
        style={{ marginLeft: 20 }}
      >
        提交
      </Button>,
    ];

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
        >
          <CustomForm
            ref={formRef}
            columns={columns}
            formList={formList}
            formKey={formKey}
            formColumns={formColumns}
          />
        </Component>
      </div>
    );
  },
);

export default CustomFormModal;
