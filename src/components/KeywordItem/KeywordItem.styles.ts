import {StyleSheet} from 'react-native';
import {COLORS} from '@/theme';

export const styles = StyleSheet.create({
  keywordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  keywordText: {
    color: COLORS.primary,
    marginRight: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  removeButton: {
    padding: 4,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 12,
  },
});
