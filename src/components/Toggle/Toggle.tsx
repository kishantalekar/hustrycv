import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, TYPOGRAPHY} from '@/theme';
import {FONTS} from '@/constants';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  leftLabel: string;
  rightLabel: string;
}

export function Toggle({
  value,
  onValueChange,
  leftLabel,
  rightLabel,
}: Readonly<ToggleProps>) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, !value && styles.activeOption]}
        onPress={() => onValueChange(false)}>
        <Text style={[styles.label, !value && styles.activeLabel]}>
          {leftLabel}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, value && styles.activeOption]}
        onPress={() => onValueChange(true)}>
        <Text style={[styles.label, value && styles.activeLabel]}>
          {rightLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 8,
    padding: 2,
    marginVertical: 8,
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: COLORS.primary,
  },
  label: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
  activeLabel: {
    color: COLORS.white,
  },
});
