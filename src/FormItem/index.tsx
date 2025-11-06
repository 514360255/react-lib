/*
 * @Author: 郭郭
 * @Date: 2025/9/15
 * @Description:
 */
import { valueEnumTransform } from '@guo514360255/antd-lib/utils/util';
import { Input, InputNumber, Radio, Select, TreeSelect } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import React from 'react';

interface FormItemProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  [key: string]: any;
}

const FormItem = ({ value, onChange, ...rest }: FormItemProps) => {
  const comField: any = {
    input: Input,
    radio: Radio.Group,
    select: Select,
    inputNumber: InputNumber,
    treeSelect: TreeSelect,
    textArea: Input.TextArea,
  };

  const placeholder =
    rest.defaultPlaceholder ||
    ['input', 'inputNumber', 'textArea'].includes(rest.type)
      ? '请输入'
      : '请选择';

  const FieldComponent = comField[rest.type || 'input'];
  return (
    <FieldComponent
      value={value}
      onChange={(e: any) =>
        onChange?.(
          ['treeSelect', 'select'].includes(rest.type as string)
            ? e
            : !rest.type ||
              ['input', 'inputNumber'].includes(rest.type as string)
            ? e
            : e.target.value,
        )
      }
      {...(['radio', 'checkbox', 'inputNumber'].includes(rest.type as string)
        ? {}
        : { allowClear: true })}
      {...(['select'].includes(rest.type as string)
        ? { showSearch: true, optionFilterProp: 'label' }
        : {})}
      style={{ width: '100%' }}
      {...(['radio', 'select'].includes(rest.type as string)
        ? { options: valueEnumTransform(rest.valueEnum, value) }
        : {})}
      placeholder={placeholder}
      {...(rest.fieldProps || {})}
    />
  );
};

export default FormItem;
