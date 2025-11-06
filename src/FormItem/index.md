# Form Item

```jsx
/**
 * title: 基础用法
 * description: 目前支持 input | radio | select | inputNumber | treeSelect | textArea
 */
import { Form } from 'antd';
import { FormItem } from 'antd-lib';

export default () => {
  return <FormItem />
}
```

```jsx
/**
 * title: Form用法
 */
import { Form } from 'antd';
import { FormItem } from 'antd-lib';

const field = [
  {
      label: '输入框',
      type: 'input',
      fieldProps: {}
    }, 
    {
      label: '单选',
      type: 'radio',
      valueEnum: {
        1: {text: '选项1', status: 'Success'},
        2: {text: '选项2', status: 'Processing'},
      },
      fieldProps: {}
    }, 
    {
      label: '下拉框',
      type: 'select',
      valueEnum: {
        1: {text: '选项1', status: 'Success'},
        2: {text: '选项2', status: 'Processing'},
      },
      fieldProps: {}
    }, 
    {
      label: '数字输入框',
      type: 'inputNumber',
      fieldProps: {}
    }, 
    {
      label: '树形下拉选择',
      type: 'treeSelect',
      fieldProps: {}
    }, 
    {
      label: '文本域',
      type: 'textArea',
      fieldProps: { rows: 5 }
}]

export default () => {
  return (
    <Form>
      {
        field.map((item, index) => {
          return (
            <Form.Item key={item.type} label={item.label} name={item.type} layout='vertical'>
              <FormItem type={item.type} valueEnum={item.valueEnum} fieldProps={item?.fieldProps} />
            </Form.Item>
          )
        })
      }
    </Form>
  )
}
```

## API
valueEnum：参考 <a href="https://procomponents.ant.design/components/schema#valueenum" target="_blank">proComponent</a>\
fieldProps：参考 <a href="https://ant.design/components/input-cn" target="_blank">antd</a>
| 参数 | 说明                                                | 类型 | 默认值 |
| --- |---------------------------------------------------| --- | --- |
|type| 类型                                                | string | input |
|valueEnum| 枚举值, 会转换为select/treeSelect/radio/checkbox的options | object | - |
|fieldProps| 绑定字段                                              | object | - |
