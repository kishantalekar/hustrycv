import {FONTS} from '@/constants';
import {COLORS, SPACING, BORDER_RADIUS, SHADOW, TYPOGRAPHY} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  sectionButton: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm + 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOW.light,
  },
  sectionButtonActive: {
    backgroundColor: COLORS.background.secondary,
    transform: [{scale: 1.02}],
    ...SHADOW.medium,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.primary,
  },
  arrow: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.text.secondary,
  },
});
