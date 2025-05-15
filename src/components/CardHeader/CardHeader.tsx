import {FONTS} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface CardHeaderProps {
  containerStyle?: any;
  title: string;
  subtitle?: string;
  location?: string;
  titlePlaceholder?: string;
  subtitlePlaceholder?: string;
  rightIcon?: string;
}

export function CardHeader({
  containerStyle,
  title,
  subtitle,
  location,
  titlePlaceholder = 'Title',
  subtitlePlaceholder = 'Subtitle',
  rightIcon,
}: Readonly<CardHeaderProps>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>
          {title.length > 0 ? title : titlePlaceholder}
        </Text>
        <Text style={styles.subtitle}>
          {subtitle?.length ? subtitle : subtitlePlaceholder}
        </Text>
        {!!location && <Text style={styles.location}>{location}</Text>}
      </View>
      <View>{rightIcon && <Icon name={rightIcon} size={24} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
});
