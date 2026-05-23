import {TextProps} from 'react-native';

export interface IconProps extends TextProps {
  size?: number;
  color?: string;
}

export type IconVariant =
  | 'material'
  | 'octicon'
  | 'fontawesome'
  | 'ionicon'
  | 'antdesign'
  | 'ionicons'
  | 'svg';

export interface CustomIconProps extends IconProps {
  variant?: IconVariant;
  name: string;
  size?: number;
  color?: string;
  SvgComponent?: React.ComponentType<any>;
}
