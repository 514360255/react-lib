/*
 * @Author: 郭郭
 * @Date: 2025/9/15
 * @Description:
 */
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import {
  fileTransformBase64,
  type FileType,
} from '@guo514360255/antd-lib/utils/util';
import { Image, message, Upload, UploadProps } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

export interface CustomUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  uploadProps?: Omit<UploadProps, 'fileList' | 'onChange'>;
  imgCrop?: ImgCropProps;
  isCrop?: boolean;
  isDragger?: boolean;
  isCustomUpload?: boolean;
  children?: React.ReactNode;
  rest?: {
    isDragger?: boolean;
    isCrop?: boolean;
    request?: (data: any) => any;
    [key: string]: any;
  };
  [key: string]: any;
}

const CustomUpload = ({
  value = [],
  onChange,
  isDragger,
  children,
  ...rest
}: CustomUploadProps) => {
  const props = rest?.fieldProps || rest;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [messageApi, messageHolder] = message.useMessage();
  const Component = isDragger || props.isDragger ? Upload.Dragger : Upload;

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await fileTransformBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // 同步 value 变化（如果父级通过 form.setFieldsValue 修改）
  useEffect(() => {
    setFileList([...value]);
  }, [JSON.stringify(value)]);

  const customRequest = async ({ file }: any) => {
    if (!file) return;
    if (props?.maxCount && value.length >= props?.maxCount) {
      messageApi.warning(`最多上传${props?.maxCount}个文件`);
      return;
    }
    try {
      let formData;
      if (!props?.isCustomUpload) {
        formData = new FormData();
        formData.append('file', file);
        formData.append('biz', props?.biz);
      }
      const request = props?.request;
      if (request) {
        const { url, originalName, uid }: any = await request(
          !props?.isCustomUpload ? formData : file,
        );
        const obj: UploadFile = {
          uid: uid,
          name: originalName,
          status: 'done',
          url,
        };
        if (onChange) {
          onChange([...value, obj]);
        }
        setTimeout(() => {
          setFileList([...fileList, obj]);
        }, 200);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemove = (file: UploadFile) => {
    if (onChange) {
      onChange(value.filter((item) => item.uid !== file.uid));
    }
    setTimeout(() => {
      setFileList(fileList.filter((item) => item.uid !== file.uid));
    }, 200);
  };

  const fileComponent = () => {
    return (
      <Component
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
        customRequest={customRequest}
        {...(props || {})}
      >
        {children ? (
          children
        ) : isDragger || props.isDragger ? (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
            <p className="ant-upload-hint">支持单次或批量上传。</p>
          </>
        ) : (
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>点击上传</div>
          </button>
        )}
      </Component>
    );
  };

  return (
    <>
      {messageHolder}
      {props?.isCrop ? (
        <ImgCrop
          rotationSlider
          showReset
          {...(props?.imgCrop || {})}
          onModalOk={customRequest}
        >
          {fileComponent()}
        </ImgCrop>
      ) : (
        fileComponent()
      )}

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default CustomUpload;
