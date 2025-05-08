import {FONTS} from '@/constants';
import {SPACING} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  section: {
    marginBottom: 24,
    gap: SPACING.sectionGap,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: 16,
    color: '#333333',
  },
});
