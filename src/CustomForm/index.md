# Form组件

```jsx
/**
 * title: 基础用法
 */
import { useRef, useState } from 'react';
import { Button } from 'antd';
import { CustomForm } from '@guo514360255/antd-lib';
import { useFormData } from '@guo514360255/antd-lib/store/useFormData';

export default () => {
  const { setFieldValues, setFieldValue } = useFormData();
  const formRef = useRef(null);
  const options = [{label: '男', value: 1}, {label: '女', value: 0}];
  const [columns, setColumns] = useState([
    {
      title: '姓名', 
      dataIndex: 'name', 
      required: true,
      fieldProps: {
        formItemProps: {
          hidden: true
        },
        onChange: (e) => {
          console.log(e.target.value);
          setFieldValue({ name: e.target.value })
        }
      }
    },
    {title: '年龄', dataIndex: 'age', type: 'inputNumber'},
    {
      title: '单选', 
      dataIndex: 'radio', 
      type: 'radio', 
      fieldProps: { 
        options,
        onChange: (e) => {
          console.log(e.target.value);
          setFieldValue({ radio: e.target.value })
        }
      }
    },
    {
      title: '复选框', 
      dataIndex: 'checkbox', 
      type: 'checkbox', 
      valueEnum: {
        0: { text: '否' },
        1: { text: '是' },
      },
      fieldProps: {
        options: [{label: '男', value: 1}],
        onChange: (e) => {
          console.log(e);
          setFieldValue({ checkbox: e })
        }
      }
    },
    {title: '下拉框', dataIndex: 'select', type: 'select', fieldProps: { options }},
    {title: '属性下拉框', dataIndex: 'treeSelect', type: 'treeSelect', fieldProps: { options }},
    {title: '文本域', dataIndex: 'textArea', type: 'textArea', fieldProps: { rows: 5 }},
    {
      title: '颜色', 
      dataIndex: 'color', 
      type: 'color',
      fieldProps: {
        format: 'hex'
      }
    },
    {
      title: '日期', 
      dataIndex: 'date', 
      type: 'date', 
      fieldProps: {
        picker: 'datetime'
      }
      },
    {title: '上传', dataIndex: 'upload', type: 'upload'},
    {title: '拖拽上传', dataIndex: 'draggerUpload', type: 'upload', fieldProps: { isDragger: true }},
    {
      title: '富文本',
      dataIndex: 'editor',
      type: 'editor',
      required: true,
      fieldProps: {
        editorConfig: {
          uploadImage: {
            fieldName: 'image',
            meta: {
              token: 'e5d4743f62ce166b6b0e96f610876b2a'
            },
            server: 'https://images.tbifestival.com/api/index.php',
            customInsert: (res, insertFn) => {
              insertFn(res.url);
            }
          }
        }
      }
    }
  ])
  
  const submit = async () => {
    const values = await formRef.current?.getFormRef()?.validateFields();
    console.log(values);
  }
  
  return (
    <>
      <Button onClick={submit}>提交</Button>
      <CustomForm columns={columns} ref={formRef} />
    </>
  )
}
```

## API
columns和table的columns参数一致
