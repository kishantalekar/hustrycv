import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './KeywordItem.styles';
import {KeywordItemProps} from './KeywordItem.types';

export function KeywordItem({keyword, onRemove}: Readonly<KeywordItemProps>) {
  return (
    <View style={styles.keywordItem}>
      <Text style={styles.keywordText}>{keyword}</Text>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Icon name="close" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
}
