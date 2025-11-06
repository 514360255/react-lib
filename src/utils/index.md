# util工具

```jsx
/**
 * title: RememberPwd
 * description: 记住密码
 */
import { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { RememberPwd } from '@guo514360255/antd-lib';

export default () => {
  const [form] = Form.useForm();
  const rememberPwd = new RememberPwd();
  const cookieKey = 'cookie_key';
  
  const onFinish = ({checked, ...values}) => {
    if(checked) {
      message.success('记住密码成功');
      rememberPwd.setCookie(cookieKey, values);
      return;
    }
    rememberPwd.removeCookie(cookieKey);
  }
  
  useEffect(() => {
    const data = rememberPwd.getCookie(cookieKey);
    if(data) {
      form.setFieldsValue({ ...data, checked: true });
    }
  })
  
  return (
    <Form form={form} autoComplete='off' layout='vertical' onFinish={onFinish}>
      <Form.Item label='用户名' name='username'>
        <Input placeholder='请输入用户名' />
      </Form.Item>
      <Form.Item label='密码' name='password'>
        <Input.Password placeholder='请输入密码' />
      </Form.Item>
      <Form.Item name='checked' valuePropName='checked'>
        <Checkbox>记住密码</Checkbox>
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}
```

```jsx
/**
 * title: fileTransformBase64
 * description: 文件转base64 URL
 */
import { useEffect, useState } from 'react'
import { Image } from 'antd';
import { fileTransformBase64 } from '@guo514360255/antd-lib';

export default () => {
  
  const [filePath, setFilePath] = useState();
  
  const createFile = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    // 绘图
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Hello', 50, 100);
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'canvas-image.png', { type: 'image/png' });
      const base64 = await fileTransformBase64(file);
      setFilePath(base64);
    })
  }
  
  useEffect(() => {
    createFile();
  })
  
  return (filePath && <Image src={filePath} />)
}
```

```jsx
/**
 * title: valueEnumTransform
 * description: 枚举值转中文
 */
import { useEffect, useState } from 'react'
import { Select } from 'antd';
import { valueEnumTransform } from '@guo514360255/antd-lib';

export default () => {
    const [options, setOptions] = useState([]);

  useEffect(() => {
    const valueEnum = {
      1: {text: '男'},
      0: {text: '女'},
      2: {text: '未知'},
    };
    setOptions(valueEnumTransform(valueEnum));
  }, []);
    return (<Select style={{width: 200}} placeholder='请选择' options={options} />)
}
```

```jsx
/**
 * title: findTreeNodeByKey
 * description: 查找树的节点 默认匹配：value
 */
import { useEffect, useState } from 'react'
import { Image } from 'antd';
import { findTreeNodeByKey } from '@guo514360255/antd-lib';

export default () => {
  
  const treeData = [
    {label: '1', key: '1', children: [{label: '1-1', key: '1-1'}]}, 
    {label: '2', key: '2', children: [{label: '2-1', key: '2-1'}]},
  ]
  
  return JSON.stringify(findTreeNodeByKey(treeData, '2-1', 'key'))
}
```

```jsx
/**
 * title: isEmptyValue
 * description: 判断是否为空值 undefined | null | ''
 */
import { useEffect, useState } from 'react'
import { Image } from 'antd';
import { isEmptyValue } from '@guo514360255/antd-lib';

export default () => {

  return (
    <>
        <p>isEmptyValue(undefined): {JSON.stringify(isEmptyValue(undefined))}</p>
        <p>isEmptyValue(null): {JSON.stringify(isEmptyValue(null))}</p>
        <p>isEmptyValue(''): {JSON.stringify(isEmptyValue(''))}</p>
        <p>isEmptyValue(false): {JSON.stringify(isEmptyValue(false))}</p>
        <p>isEmptyValue(0): {JSON.stringify(isEmptyValue(0))}</p>
    </>
  )
}
```
