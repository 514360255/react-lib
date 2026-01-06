# Table

```jsx
/**
 * title: 基础用法
 */
import { useState, useEffect, useRef } from 'react';
import { CustomTable, useFormData, CustomTag } from '@guo514360255/antd-lib';
import { Button } from 'antd'

export default () => {
  const tableRef = useRef();
  const { setFieldValue } = useFormData();
  const dataSource = [{
    id: '1',
    checkbox: 1,
    filedName: '字段名', 
    filedName1: '字段名1',
    fieldName2: [
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
    ],
    fieldName3: [
      {url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', name: 1},
      {url: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg', name: 2}
    ]
  }]
  const defaultColumns = [
    {title: '字段名', dataIndex: 'filedName'},
    {title: '字段名1', dataIndex: 'filedName1'},
    {title: '操作', valueType: 'option'}
  ];
  const [columns, setColumns] = useState(defaultColumns)


  useEffect(() => {
    setTimeout(() => {
      setColumns([
        {
          title: '复选框',
          dataIndex: 'checkbox',
          type: 'checkbox',
          valueEnum: {
            0: { text: '否', },
            1: { text: '是', color: '#ff0000' },
          },
          fieldProps: {
            options: [{label: '男', value: 1}],
          },
          render: (_, { checkbox }, __, ___, column) => <CustomTag value={ checkbox } valueEnum={ column.valueEnum } />
        },
        {
          id: 1, 
          title: '字段名', 
          dataIndex: 'fieldName', 
          type: 'select',
          valueType: 'select',
          fieldProps: {
            options: [{label: '男', value: 1}, {label: '女', value: 0}],
            onChange: val => {
              setTimeout(() => {
                setColumns(s => {
                  const col = s.find(item => item.dataIndex === 'fieldName1');
                  col.valueEnum = {1: {text: '1'}, 2: {text: '2'}};
                  return [...s];
                })
              }, 3000)
            }
          }
        },
        {id: 2, title: '字段名1', dataIndex: 'fieldName1', type: 'select', fieldProps: {}},
        {id: 3, title: '字段名2', dataIndex: 'fieldName2', type: 'upload', hideInTable: true},
        {id: 5, title: '字段名3', dataIndex: 'fieldName3', type: 'upload', hideInTable: true},
        {
          id: 4, 
          title: '操作', 
          valueType: 'option',
          buttons: [
            {
              text: '确定', 
              type: 'primary',
              order: 1,
              onClick: (record) => {
                console.log(record);
              }
            }
          ]
        }
      ])
    }, 2000)
  }, []);

  const handleModalData = (data) => {
    data.checkbox = [1];
    data.fieldName = [1];
    data.fieldName2 = data.fieldName2?.map(item => ({url: item}));
    // setColumns([
    //   ...defaultColumns,
    //   // {title: '字段3', dataIndex: 'filedName3'}
    // ])
    return data;
  }
  
  const add = () => {
    console.log(tableRef);
  }
  
  return (
    <>
      <Button onClick={add}>添加</Button>
      <CustomTable
        ref={tableRef}
        title='标题'
        handleModalData={handleModalData}
        dataSource={dataSource}
        columns={columns}
        detailRequest={() => {
          return {
            id: '1',
            filedName: 1,
            filedName1: '字段名1',
            fieldName2: [
              'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
              'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
            ],
            fieldName3: [
              {url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', name: 1},
              {url: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg', name: 2}
            ]
          }
        }}
      />
    </>
  )
}
```

```jsx
/**
 * title: 基础用法
 */
import { useState, useEffect, useRef } from 'react';
import { CustomTable, randomInt, CustomTag } from '@guo514360255/antd-lib';
import { Button, Tag, Progress } from 'antd';
import dayjs from 'dayjs';

export default () => {
  const tableRef = useRef();
  const [columns, setColumns] = useState([
    {
      title: '关键词',
      dataIndex: 'keyword',
      hideInTable: true,
      hideInDetail: true,
      hideInForm: true,
    },
    {
      title: '车辆ID',
      dataIndex: 'vehicleId',
      required: true,
      hideInSearch: true,
      width: 240,
    },
    {
      title: '车型',
      dataIndex: 'vehicleType',
      required: true,
      valueType: 'select',
      type: 'select',
      valueEnum: {
        1: { text: '重载矿石车' },
        2: { text: '集装箱转运车' },
        3: { text: '废料运输车' },
        4: { text: '设备转运车' },
      },
      width: 200,
    },
    {
      title: '载重上限',
      dataIndex: 'weightLimit',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '车辆状态',
      dataIndex: 'status',
      valueType: 'select',
      type: 'select',
      valueEnum: {
        1: { text: '在线', color: 'green' },
        2: { text: '离线' },
        3: { text: '执行任务', color: 'processing' },
        4: { text: '待命', color: 'lime' },
        5: { text: '维保中', color: 'warning' },
        6: { text: '异常', color: 'error' },
      },
      required: true,
      width: 160,
      render: (_, record, __, ___, column) => <CustomTag value={record.status} valueEnum={column.valueEnum} />,
    },
    {
      title: '剩余续航',
      dataIndex: 'remaining',
      valueEnum: {
        1: { text: '高（≥80%）' },
        2: { text: '中（30%-80%）' },
        3: { text: '低（≤30%）' },
      },
      width: 200,
      hideInForm: true,
      valueType: 'select',
      type: 'progress',
      render: (_, record) => {
        const percent = record.remaining;
        return <Progress 
          strokeColor={percent <= 30 ? 'red' : percent > 30 && percent <= 80 ? 'green' : 'orange'} 
          percent={percent} 
          format={(percent) => `${percent}%`}
        />
      }
    },
    {
      title: '作业区域',
      dataIndex: 'area',
      required: true,
      valueType: 'select',
      type: 'select',
      valueEnum: {
        1: { text: '采矿区' },
        2: { text: '码头区域' },
        3: { text: '堆场区' },
        4: { text: '综合区域' },
      },
      width: 200,
    },
    {
      title: '最近维保时间',
      dataIndex: 'recentMaintenanceTime',
      hideInSearch: true,
      hideInForm: true,
      valueType: 'dateTime',
      width: 190,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      hideInForm: true,
      valueType: 'dateTime',
      width: 190,
    },
    {
      title: '创建人',
      dataIndex: 'createdBy',
      hideInSearch: true,
      hideInForm: true,
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 300,
      buttons: (record) => {
        const result = [];
        if (record.status) {
          result.push(
            ...[
              <Button variant="link" key="ajust" color="orange">
                调整
              </Button>,
              <Button type="link" danger key="controller">
                远程控制
              </Button>,
            ],
          );
        }
        if (record.status === 6) {
          result.push(
            ...[
              <Button variant="link" key="fault" color="green">
                故障处理
              </Button>,
            ],
          );
        }
        if (record.status === 5) {
          result.push(
            ...[
              <Button variant="link" key="doneMaintenance" color="green">
                完成维保
              </Button>,
              <Button variant="text" key="report" color="default">
                查看报告
              </Button>,
            ],
          );
        }
        return result;
      },
    },
  ]);
  const [dataSource, setDataSource] = useState([]);


  useEffect(() => {
    const data = [];
    for (let i = 0; i < 45; i++) {
      // vehicle id
      const vehicleIdType = ['PORT', 'MINING', 'STACKING', 'COMPLEX'];
      const vehicleId = `V-${vehicleIdType[randomInt(0, 3)]}-0${randomInt(10, 99)}`;
      const vehicleType = randomInt(1, 4);
      const weightLimit = randomInt(10, 100);
      const status = `${randomInt(1, 6)},${randomInt(1, 6)}`;
      const remaining = randomInt(0, 100);
      const area = randomInt(1, 4);
      data.push({
        id: `${i}`,
        vehicleId,
        vehicleType,
        weightLimit: `${weightLimit}吨`,
        status,
        remaining,
        area,
        isActive: randomInt(0, 1),
        recentMaintenanceTime: dayjs().subtract(10, 'day').format('YYYY-MM-DD HH:mm:ss'),
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        createdBy: '系统管理员',
      });
    }
    setDataSource(data);
  }, []);
  
  return (
    <CustomTable
      isUpdate={false}
      isUpdateState={true}
      title="无人车辆"
      createText="新增车辆"
      ref={tableRef}
      columns={columns}
      dataSource={dataSource}
      toolBarRender={[<Button type="primary">批量导入</Button>]}
      detailProps={{
        descProps: {
          column: 1
        }
      }}
    />
  )
}
```

```jsx
/**
 * title: request请求
 */
import { useState, useEffect } from 'react';
import { CustomTable } from '@guo514360255/antd-lib';

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
