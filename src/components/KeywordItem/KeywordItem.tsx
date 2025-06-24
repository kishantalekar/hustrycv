import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Typography, TypographyVariant} from '../Typography';
import {styles} from './KeywordItem.styles';
import {KeywordItemProps} from './KeywordItem.types';

export function KeywordItem({keyword, onRemove}: Readonly<KeywordItemProps>) {
  return (
    <View style={styles.keywordItem}>
      <Typography
        style={styles.keywordText}
        variant={TypographyVariant.Caption}>
        {keyword}
      </Typography>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Icon name="close" size={18} color="#666" />
      </TouchableOpacity>
    </View>
  );
}
