import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants';
import {COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, SHADOW} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    marginBottom: SPACING.md,
    color: COLORS.text.primary,
  },
  listContainer: {
    flexGrow: 1,
  },
  resumeItem: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm + 4,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW.light,
  },
  resumeContent: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: COLORS.status.error,
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginLeft: SPACING.sm + 4,
  },
  deleteButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  resumeName: {
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  resumeDate: {
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
  },
});
