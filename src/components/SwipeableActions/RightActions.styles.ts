import {COLORS} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  deleteAction: {
    backgroundColor: COLORS.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteActionText: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 4,
  },
});
