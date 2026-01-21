/*
 * @Author: 郭郭
 * @Date: 2025/9/15
 * @Description:
 */
import { valueEnumTransform } from '@guo514360255/antd-lib/utils/util';
import { IDomEditor, IToolbarConfig } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import {
  Checkbox,
  ColorPicker,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  TreeSelect,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';

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
    checkbox: Checkbox.Group,
    color: ColorPicker,
    date: DatePicker,
  };
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState(value || '');

  const placeholder =
    rest.defaultPlaceholder ||
    ['input', 'inputNumber', 'textArea'].includes(rest.type)
      ? '请输入'
      : '请选择';

  const FieldComponent = comField[rest.type || 'input'];

  const toolbarConfig: Partial<IToolbarConfig> = {};

  const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      ...(rest?.fieldProps?.editorConfig || {}),
    },
  };

  return rest.type === 'editor' ? (
    <div style={{ border: '1px solid #cecece' }}>
      <Toolbar
        defaultConfig={toolbarConfig}
        mode="default"
        editor={editor}
        {...(rest?.fieldProps?.toolbar || {})}
      />
      <Editor
        defaultConfig={editorConfig}
        onCreated={setEditor}
        mode="default"
        value={html}
        onChange={(editor) => {
          const htmlText = editor.getHtml();
          setHtml(htmlText);
          onChange?.(htmlText as any);
        }}
        style={{ height: '300px' }}
        {...(rest?.fieldProps?.editor || {})}
      />
    </div>
  ) : (
    <FieldComponent
      value={value}
      onChange={(e: any) =>
        onChange?.(
          ['treeSelect', 'select', 'checkbox', 'color', 'date'].includes(
            rest.type as string,
          )
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
      style={{ width: ['color'].includes(rest.type) ? '' : '100%' }}
      {...(['radio', 'select'].includes(rest.type as string)
        ? { options: valueEnumTransform(rest.valueEnum, value) }
        : {})}
      placeholder={placeholder}
      {...(rest.fieldProps || {})}
    />
  );
};

export default FormItem;
