import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

import {styles} from './FormItem.styles';
import {FormItemProps} from './FormItem.types';

export const FormItem = ({
  item,
  isActive,
  onPress,
  onLongPress = undefined,
}: FormItemProps) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={[styles.sectionButton, styles.sectionButtonActive]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );
};
