import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TypographyProps, TypographyVariant} from './Typography.types';
import {typography, COLORS} from '../../theme';

export const Typography: React.FC<TypographyProps> = ({
  variant = TypographyVariant.Body1,
  children,
  style,
  color = COLORS.text.primary,
  align = 'auto',
  ...props
}) => {
  return (
    <Text
      style={[styles[variant], {color, textAlign: align}, style]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create(typography);
