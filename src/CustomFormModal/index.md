# Form弹窗

```jsx
/**
 * title: 基础用法
 */
import { useRef, useState } from 'react';
import { Button } from 'antd';
import { CustomModal } from 'antd-lib';

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
  ])
  
  const targetEvent = () => {
    modalRef.current?.open({});
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
import { CustomModal } from 'antd-lib';

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
    {title: '学历', dataIndex: 'list', type: 'group'}
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
