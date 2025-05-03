import {StyleSheet} from 'react-native';
import {COLORS} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: COLORS.text.primary,
    fontSize: 14,
  },
});
