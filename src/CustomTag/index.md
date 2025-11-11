# 自定义tag展示

```jsx
import { useState, useEffect, useRef } from 'react';
import { CustomTag,  } from '@guo514360255/antd-lib';
import { Tag } from 'antd';

export default () => {
  const valueEnum = {
    1: { text: '已生效', color: 'green' },
    2: { text: '执行中', color: 'error' },
    3: { text: '已完成', color: 'blue' },
    4: { text: '待派单', color: 'default' },
  }
  return (
    <>
      <CustomTag value={1} valueEnum={valueEnum} />
      <CustomTag value={2} valueEnum={valueEnum} />
      <CustomTag value={3} valueEnum={valueEnum} />
      <CustomTag value={4} valueEnum={valueEnum} />
    </>
  )
}
```
