import {StyleSheet} from 'react-native';
import {FONTS} from '../../../../constants';
import {
  BORDER_RADIUS,
  COLORS,
  SHADOW,
  SPACING,
  TYPOGRAPHY,
} from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: SPACING.md,
    gap: SPACING.lg,
  },
  scrollContainer: {
    gap: SPACING.lg,
  },
  header: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: SPACING.lg,
    marginTop: SPACING.xxl + SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  sectionsContainer: {},
  sectionButton: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    // marginBottom: SPACING.sm + 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOW.light,
    // backgroundColor: 'red',
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
  firstSection: {},
  section: {},
  arrow: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.text.secondary,
  },
});
