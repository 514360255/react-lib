/*
 * @Author: 郭郭
 * @Date: 2025/9/3
 * @Description:
 */
import IconComponent, * as Icons from '@ant-design/icons';
import React, { memo } from 'react';

interface DynamicIconProps {
  iconName?: string;
  component?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  component,
  ...props
}) => {
  // 自定义icon component
  const CustomComponent = component;
  if (CustomComponent) {
    return (
      <IconComponent
        // @ts-ignore
        component={CustomComponent as React.ReactNode}
        {...props}
      />
    );
  }

  if (!iconName) return null;

  // 尝试匹配 Outlined、Filled、TwoTone 等
  const Icon =
    (Icons as any)[`${iconName}Outlined`] ||
    (Icons as any)[`${iconName}Filled`] ||
    (Icons as any)[`${iconName}TwoTone`] ||
    (Icons as any)[`${iconName}`] ||
    null;

  if (!Icon) {
    console.warn(`Icon ${iconName} not found in @ant-design/icons`);
    return null;
  }

  return <Icon {...props} />;
};

export default memo(DynamicIcon);
