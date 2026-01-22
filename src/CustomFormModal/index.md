# Form弹窗

```jsx
/**
 * title: 基础用法
 */
import { useRef, useState } from 'react';
import { Button } from 'antd';
import { CustomModal } from '@guo514360255/antd-lib';
import { useFormData } from '@guo514360255/antd-lib/store/useFormData';

export default () => {
  const { setFieldValues, setFieldValue } = useFormData();
  const modalRef = useRef(null);
  const options = [{label: '男', value: 1}, {label: '女', value: 0}];
  const [columns, setColumns] = useState([
    {
      title: '姓名', 
      dataIndex: 'name', 
      required: true,
      fieldProps: {
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
  
  const targetEvent = () => {
    modalRef.current?.open({
      checkbox: [1], 
      color: '#ff0000', 
      editor: '<p><img src="https://images.tbifestival.com/i/2/2026/01/21/rb0hgc-2.jpg" alt="" data-href="" style=""/>123123123123123</p>'
    });
  }
  
  return (
    <>
      <Button onClick={targetEvent}>FORM表单</Button>
      <CustomModal columns={columns} ref={modalRef} />
    </>
  )
}
```

```jsx
/**
 * title: group分组的表单
 */
import { useRef, useState } from 'react';
import { Button } from 'antd';
import { CustomModal } from '@guo514360255/antd-lib';

export default () => {
  const modalRef = useRef(null);
  const options = [{label: '男', value: 1}, {label: '女', value: 0}];
  const [columns, setColumns] = useState([
    {title: '姓名', dataIndex: 'name'},
    {title: '年龄', dataIndex: 'age', type: 'inputNumber'},
    {title: '单选', dataIndex: 'radio', type: 'radio', fieldProps: { options }},
    {title: '下拉框', dataIndex: 'select', type: 'select', fieldProps: { options }},
    {title: '属性下拉框', dataIndex: 'treeSelect', type: 'treeSelect', fieldProps: { options }},
    {title: '文本域', dataIndex: 'textArea', type: 'textArea', fieldProps: { rows: 5 }},
    {title: '上传', dataIndex: 'upload', type: 'upload'},
    {title: '拖拽上传', dataIndex: 'draggerUpload', type: 'upload', fieldProps: { isDragger: true }},
    {title: '学历', dataIndex: 'list', type: 'list'}
  ])
  
  const formList = {
    list: [
      {title: '学历一', dataIndex: 'x1'},
      {title: '学历二', dataIndex: 'x2'},
    ]
  }
  
  const targetEvent = () => {
    modalRef.current?.open({});
  }
  
  return (
    <>
      <Button onClick={targetEvent}>FORM表单</Button>
      <CustomModal formList={formList} columns={columns} ref={modalRef} />
    </>
  )
}
```

## API
columns和table的columns参数一致
