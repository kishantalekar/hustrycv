import {IconProps} from 'react-native-vector-icons/Icon';

export type IconVariant =
  | 'material'
  | 'octicon'
  | 'fontawesome'
  | 'ionicon'
  | 'antdesign'
  | 'ionicons'
  | 'svg';

export interface CustomIconProps extends Omit<IconProps, 'name'> {
  variant?: IconVariant;
  name: string;
  size?: number;
  color?: string;
  SvgComponent?: React.ComponentType<any>;
}
