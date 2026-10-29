/*
 * @Author: 郭郭
 * @Date: 2025/9/15
 * @Description:
 */
import { valueEnumTransform } from '../utils/util';
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
import React, { useEffect, useState } from 'react';

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
  const [html, setHtml] = useState<any>(value || '');

  const fieldProps = rest.fieldProps;
  delete fieldProps?.formItemProps;

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
      ...(fieldProps?.editorConfig || {}),
    },
  };

  useEffect(() => {
    if (rest.type === 'editor') {
      editor?.setHtml(value as any);
    }
  }, [value]);

  // 构建合并后的 fieldProps，确保自定义 onChange 不会覆盖 store 更新逻辑
  const mergedFieldProps = {
    ...(fieldProps || {}),
  };

  // 合并 fieldProps.onChange 与原始 onChange，确保 store 始终被更新
  if (fieldProps?.onChange) {
    const customOnChange = fieldProps.onChange;
    delete mergedFieldProps.onChange;
    mergedFieldProps.onChange = (...args: any[]) => {
      // 先执行原始 onChange（由 Form.Item 注入，负责更新表单 store）
      const e = args[0];
      onChange?.(
        ['treeSelect', 'select', 'checkbox', 'color', 'date'].includes(
          rest.type as string,
        )
          ? e
          : !rest.type ||
            ['input', 'inputNumber'].includes(rest.type as string)
          ? e
          : e?.target?.value ?? e,
      );
      // 再执行用户自定义的 onChange，此时表单 store 已更新，getFieldsValue() 能拿到最新值
      customOnChange(...args);
    };
  }

  return rest.type === 'editor' ? (
    <div style={{ border: '1px solid #cecece' }}>
      <Toolbar
        defaultConfig={toolbarConfig}
        mode="default"
        editor={editor}
        {...(fieldProps?.toolbar || {})}
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
      {...mergedFieldProps}
    />
  );
};

export default FormItem;
