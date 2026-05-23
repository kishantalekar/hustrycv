import React from 'react';
import {Text} from 'react-native';
import {COLORS} from '@/theme';
import {TypographyProps, TypographyVariant} from './Typography.types';
import {typographyStyles} from './Typography.styles';

export const Typography: React.FC<TypographyProps> = ({
  variant = TypographyVariant.BodyMedium,
  children,
  style,
  color = COLORS.text.primary,
  align = 'auto',
  ...props
}) => {
  return (
    <Text
      style={[typographyStyles[variant], {color, textAlign: align}, style]}
      {...props}>
      {children}
    </Text>
  );
};
