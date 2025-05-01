import {ReactNode} from 'react';

export interface HeaderProps {
  title: string;
  rightIcon?: string;
  onRightPress?: () => void;
  showBack?: boolean;
  rightComponent?: ReactNode;
}
