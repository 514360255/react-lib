/*
 * @Author: 郭郭
 * @Date: 2025/8/15
 * @Description:
 */

import CustomDescriptions from '../CustomDescriptions';
import type { CustomDetailModalProps } from './detailModal';
import { Drawer, Modal } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
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
    const [detail, setDetail] = useState<any>();
    const modalType: any = {
      modal: Modal,
      drawer: Drawer,
    };

    const Component = modalType[type || 'drawer'];

    const close = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      async open(values: { [key: string]: any }) {
        setOpen(true);
        setDetail(values);
      },
      close,
    }));

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
          <CustomDescriptions
            request={detailRequest}
            columns={columns}
            handleDetailData={handleDetailData}
            values={detail}
            {...descProps}
          />
        </Component>
      </>
    );
  },
);

export default CustomModal;
