import {TextProps} from 'react-native';

export enum TypographyVariant {
  H1 = 'h1',
  H2 = 'h2',
  Body1 = 'body1',
  Body2 = 'body2',
  Button = 'button',
  Caption = 'caption',
}

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}
