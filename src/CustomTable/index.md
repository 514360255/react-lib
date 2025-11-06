# Table

```jsx
/**
 * title: 基础用法
 */
import { useState, useEffect } from 'react';
import { CustomTable } from 'antd-lib';

export default () => {
  const dataSource = [{id: '1', filedName: '字段名', filedName1: '字段名1'}]

  const [columns, setColumns] = useState([
    {title: '字段名', dataIndex: 'filedName'},
    {title: '字段名1', dataIndex: 'filedName1'},
    {title: '操作', valueType: 'option'}
  ])


  useEffect(() => {
    setTimeout(() => {
      setColumns([
        {title: '字段名', dataIndex: 'filedName'},
        {title: '字段名1', dataIndex: 'filedName1'},
        {title: '字段名2', dataIndex: 'filedName2'},
        {title: '操作', valueType: 'option'}
      ])
    }, 2000)
  }, []);
  
  return <CustomTable title='标题' dataSource={dataSource} columns={columns} />
}
```

## request请求
```jsx
/**
 * title: request请求
 */
import { useState, useEffect } from 'react';
import { CustomTable } from 'antd-lib';

export default () => {

  const [columns, setColumns] = useState([
    {title: '字段名', dataIndex: 'filedName'},
    {title: '字段名1', dataIndex: 'filedName1'},
    {title: '操作', valueType: 'option'}
  ])
  
  const request = async () => {
    const listData = [];
    for(let i = 0; i < 100; i++) {
      listData.push({
        id: `${i}`,
        filedName: `字段名-${i}`,
        filedName1: `字段名1-${i}`
      })
    }
    return {
      list: listData,
      total: listData.length
    }
  }
  
  return <CustomTable title='标题' request={request} columns={columns} />
}
```

## API
| 参数                 | 说明                      | 类型 | 默认值   |
|--------------------|-------------------------| --- |-------|
| columns            | 表格列的配置描述                | array | -     |
| dataSource         | 数据数组                    | array | -     |
| title              | 表格标题, form/detail使用     | string | -     |
| isUpdateState      | 是否启用启用/禁用按钮             | boolean | false |
| isDetail           | 是否启用详情按钮                | boolean | true  |
| isCreate           | 是否有创建按钮                 | boolean | true  |
| isUpdate           | 是否启用编辑按钮                | boolean | true  |
| isDelete           | 是否启用删除按钮                | boolean | true  |
| isIndex            | 是否启用序号列                 | boolean | true  |
| rowKey             | 表格行 key 的取值，可以是字符串或一个函数 | string | id ||
| request            | 分页查询接口                  | function | -     |
| deleteRequest      | 删除接口                    | function | -     |
| detailRequest      | 详情接口                    | function | -     |
| saveRequest        | 新增接口                    | function | -     |
| updateRequest      | 编辑接口                    | function | -     |
| updateStateRequest | 启用/禁用接口                 | function | -     |
| defaultQueryParams | 默认查询参数                  | object | -     |
| toolBarRender      | 自定义工具栏                  | function | -     |
| pagination         | 分页配置                    | object | -     |
| other              | 其它参数                    | object | -     |

### column
| 参数          | 说明       | 类型     | 默认值   |
| ------------- |----------| -------- |-------|
| type         | 表单字段类型   | string | input |
|fieldProps| 表单字段属性绑定 | object | -     |
|hideInDetail| 详情是否展示 | boolean | true  |
|buttons| 操作按钮 | function | -     |
|formKey| 表单字段唯一key | string | -     |

### fieldProps
| 参数          | 说明        | 类型                                                                                     | 默认值 |
| ------------- |-----------|----------------------------------------------------------------------------------------|-------|
| request| 图片上传接口    | function                                                                               | -             |
| imgCrop| 裁切图片参数    | <a href="https://github.com/nanxiaobei/antd-img-crop" target="_blank">ImgCropProps</a> | -     |
| isCrop| 上传前是否裁切图片 | boolean                                                                                | true          |
