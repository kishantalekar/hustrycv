import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

export interface SvgIconProps extends Omit<SvgProps, 'width' | 'height'> {
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number;
  /**
   * Icon color
   */
  color?: string;
  /**
   * Additional style for the icon container
   */
  style?: StyleProp<ViewStyle>;
}

export function SvgIcon({
  size = 24,
  color,
  style,
  ...props
}: React.PropsWithChildren<SvgIconProps>) {
  const iconProps = {
    width: size,
    height: size,
    color,
    style,
    ...props,
  };

  return React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, iconProps);
    }
    return child;
  });
}
