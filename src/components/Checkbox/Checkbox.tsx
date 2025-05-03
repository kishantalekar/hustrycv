import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {CustomIcon} from '@/components/CustomIcon';
import {COLORS} from '@/theme';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  label,
  disabled = false,
  color = COLORS.primary,
  size = 24,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onValueChange(!checked)}
        disabled={disabled}>
        <CustomIcon
          variant="material"
          name={checked ? 'check-box' : 'check-box-outline-blank'}
          size={size}
          color={disabled ? COLORS.text.secondary : color}
        />
      </TouchableOpacity>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};
