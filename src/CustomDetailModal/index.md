# Detail弹窗

```jsx
/**
 * title: 基础用法
 */
import { useRef, useState } from 'react';
import { Button } from 'antd';
import { CustomDetailModal } from 'antd-lib';

export default () => {
  const detailModalRef = useRef(null);
  const options = [{label: '男', value: 1}, {label: '女', value: 0}];
  const [columns, setColumns] = useState([
    {title: '姓名', dataIndex: 'name'},
    {title: '年龄', dataIndex: 'age', type: 'inputNumber'},
    {title: '单选', dataIndex: 'radio', type: 'radio', fieldProps: { options }},
    {
      title: '下拉框', 
      dataIndex: 'select', 
      type: 'select', 
      // valueEnum: {
      //   0: {text: '女'}, 
      //   1: {text: '男'}
      // }, 
      fieldProps: { 
        options, 
        mode: 'multiple' 
      }
    },
    {title: '属性下拉框', dataIndex: 'treeSelect', type: 'treeSelect', fieldProps: { options }},
    {title: '文本域', dataIndex: 'textArea', type: 'textArea', fieldProps: { rows: 5 }},
    {title: '上传', dataIndex: 'upload', type: 'upload'},
    {title: '拖拽上传', dataIndex: 'draggerUpload', type: 'upload', fieldProps: { isDragger: true }},
  ])
  
  const targetEvent = () => {
    detailModalRef.current?.open({select: '0,1', radio: 1, textArea: '文本域', name: '张三', age: 200});
  }
  
  return (
    <>
      <Button onClick={targetEvent}>详情弹窗</Button>
      <CustomDetailModal columns={columns} ref={detailModalRef} />
    </>
  )
}
```

## API
columns和table的columns参数一致
