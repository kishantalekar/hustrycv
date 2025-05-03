import {IconProps} from 'react-native-vector-icons/Icon';

export type IconVariant =
  | 'material'
  | 'octicon'
  | 'fontawesome'
  | 'ionicon'
  | 'antdesign'
  | 'ionicons';

export interface CustomIconProps extends Omit<IconProps, 'name'> {
  variant?: IconVariant;
  name: string;
}
