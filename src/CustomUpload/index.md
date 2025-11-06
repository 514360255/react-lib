# 上传文件

```jsx
/**
 * title: 基础用法
 * description: 点击上传
 */
import {CustomUpload} from '@guo514360255/antd-lib';
import {fileTransformBase64} from '@guo514360255/antd-lib/utils'

const fieldProps = {
  request: async (val) => {
    const file = val.get('file');
    return {
      url: await fileTransformBase64(file),
      name: file.name,
      uid: file.uid
    }
  }
}

export default () => <CustomUpload {...fieldProps} />;
```

```jsx
/**
 * title: 裁切图片
 * description: 配合 <a target="_blank" href="https://github.com/nanxiaobei/antd-img-crop">antd-img-crop</a> 实现上传前裁切图片。
 */
import {CustomUpload} from '@guo514360255/antd-lib';
import {fileTransformBase64} from '@guo514360255/antd-lib/utils'

const fieldProps = {
  isCrop: true,
  request: async (val) => {
    const file = val.get('file');
    return {
      url: await fileTransformBase64(file),
      name: file.name,
      uid: file.uid
    }
  }
}

export default () => <CustomUpload {...fieldProps}/>;
```

```jsx
/**
 * title: 拖拽上传
 */
import {CustomUpload} from '@guo514360255/antd-lib';
import {fileTransformBase64} from '@guo514360255/antd-lib/utils'

const fieldProps = {
  isDragger: true,
  request: async (val) => {
    const file = val.get('file');
    return {
      url: await fileTransformBase64(file),
      name: file.name,
      uid: file.uid
    }
  }
}

export default () => <CustomUpload {...fieldProps} />;
```


## API

| 参数           | 说明         | 类型  | 默认值   | 版本 |
|--------------|------------| --- |-------| --- |
| previewImage | 是否显示预览图    | boolean | true  |
| isCrop       | 上传前是否裁剪图片  | boolean | false |
| isDragger           | 是否拖拽上传         | boolean | false |
| request      | 自定义上传方法    | (value) => void | -     |
| onChange     | 上传文件改变时的回调 | (value) => void | -     |

