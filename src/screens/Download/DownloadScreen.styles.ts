import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants';
import {COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOW} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    paddingBottom: SPACING.xl,
  },
  header: {
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xxxl,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
  },

  // Resume actions card
  actionsCard: {
    margin: SPACING.md,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOW.medium,
  },
  resumeInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resumeInfoText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  resumeName: {
    fontSize: TYPOGRAPHY.size.lg,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  resumeDate: {
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
  },

  // Action icons section
  actionIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  actionIconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    ...SHADOW.light,
  },
  iconText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: COLORS.text.primary,
    textAlign: 'center',
  },

  // Share card
  shareCard: {
    margin: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOW.medium,
  },
  shareHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  shareTitle: {
    fontSize: TYPOGRAPHY.size.lg,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
  },
  shareDescription: {
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.light,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background.primary,
  },
  emptyText: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.size.lg,
    textAlign: 'center',
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
});
