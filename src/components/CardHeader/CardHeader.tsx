import {FONTS} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  location?: string;
  titlePlaceholder?: string;
  subtitlePlaceholder?: string;
}

export function CardHeader({
  title,
  subtitle,
  location,
  titlePlaceholder = 'Title',
  subtitlePlaceholder = 'Subtitle',
}: Readonly<CardHeaderProps>) {
  return (
    <View>
      <Text style={styles.title}>
        {title.length > 0 ? title : titlePlaceholder}
      </Text>
      <Text style={styles.subtitle}>
        {subtitle?.length ? subtitle : subtitlePlaceholder}
      </Text>
      {!!location && <Text style={styles.location}>{location}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
