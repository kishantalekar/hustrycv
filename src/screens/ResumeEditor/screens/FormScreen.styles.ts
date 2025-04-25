import {StyleSheet} from 'react-native';
import {FONTS} from '../../../constants';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  TYPOGRAPHY,
  SHADOW,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: SPACING.lg,
    marginTop: SPACING.xxl + SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  sectionsContainer: {
    padding: SPACING.md,
  },
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
