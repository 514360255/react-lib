# 动态Icon

```jsx
/**
 * title: 基础用法
 * description: 动态引入ant design icon
 */
import {DynamicIcon} from 'antd-lib';
import {Space} from "antd";

export default () => {
  return (
    <Space>
        <DynamicIcon iconName="SmileOutlined" />
        <DynamicIcon iconName="SmileFilled" />
        <DynamicIcon iconName="SmileTwoTone" />
        <DynamicIcon iconName="Smile" />
    </Space>
  )
}
```
