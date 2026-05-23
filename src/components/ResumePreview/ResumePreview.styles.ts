import {FONTS} from '@/constants';
import {COLORS, SPACING, TYPOGRAPHY} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    minHeight: 400,
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: SPACING.container,
    justifyContent: 'flex-start',
    minHeight: 'auto',
    height: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  // exportButton: {
  //   paddingHorizontal: SPACING.lg,
  //   paddingVertical: SPACING.sm,
  //   backgroundColor: COLORS.primary,
  //   borderRadius: BORDER_RADIUS.md,
  //   marginTop: SPACING.lg,
  //   ...SHADOW.light,
  // },
  // exportButtonText: {
  //   color: COLORS.text.light,
  //   fontSize: TYPOGRAPHY.size.md,
  //   fontFamily: FONTS.FIRA_SANS.REGULAR,
  // },

  pdfView: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
});
