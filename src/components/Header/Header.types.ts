import {ReactNode} from 'react';
import {IconVariant} from '../CustomIcon/CustomIcon.types';

export interface HeaderProps {
  title: string;
  rightIcon?: string;
  leftIcon?: string;
  onRightPress?: () => void;
  showBack?: boolean;
  rightComponent?: ReactNode;
  onLeftPress?: () => void;
  iconVariant?: IconVariant;
  onTitleChange?: (newTitle: string) => void;
  editable?: boolean;
  textInputLabel?: string;
  customLeftComponent?: ReactNode;
}
