import {StyleSheet} from 'react-native';
import {
  BORDER_RADIUS,
  COLORS,
  SHADOW,
  SPACING,
  typography,
  TYPOGRAPHY,
} from '../../theme';

export const styles = StyleSheet.create({
  createButtonContainer: {
    position: 'relative',
  },
  modalOverlay: {
    flex: 1,
  },
  dropdownPosition: {
    position: 'absolute',
    top: 80,
    right: SPACING.lg,
  },
  dropdown: {
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    ...SHADOW.light,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: SPACING.sm,
    minWidth: 200,
    borderRadius: BORDER_RADIUS.sm,
    marginVertical: SPACING.xs / 2,
  },
  dropdownItemText: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.primary,
    fontFamily: typography.body1.fontFamily,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: SPACING.lg,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...typography.h1,
    color: COLORS.text.primary,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  createButtonText: {
    color: COLORS.white,
    ...typography.button,
    fontWeight: 'bold',
  },
  resumeList: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  swipeableContainer: {
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
    // paddingBottom: SPACING.sm,
    paddingBottom: 2,
  },
  resumeCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOW.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    marginHorizontal: SPACING.xs,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    paddingBottom: SPACING.sectionGap,
  },
  deleteAction: {
    backgroundColor: COLORS.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    overflow: 'hidden',
    borderTopRightRadius: BORDER_RADIUS.md,
    borderBottomRightRadius: BORDER_RADIUS.md,
  },
  deleteActionText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.size.sm,
    marginTop: SPACING.xs,
    shadowRadius: 3,
  },
  resumePreview: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  resumeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  resumeName: {
    fontSize: TYPOGRAPHY.size.lg,
    fontFamily: typography.h2.fontFamily,
    marginBottom: SPACING.sm,
    color: COLORS.text.primary,
  },
  resumeMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  resumeDate: {
    ...typography.body2,
    color: COLORS.text.secondary,
    marginRight: SPACING.md,
  },
  resumeTemplate: {
    ...typography.body2,
    color: COLORS.text.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: COLORS.secondary || '#555',
  },
  actionButtonText: {
    color: COLORS.white,
    ...typography.button,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: SPACING.xxl,
  },
  emptyAnimation: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  emptyStateTitle: {
    marginBottom: 8,
    textAlign: 'center',
    color: COLORS.text.primary,
  },
  emptyStateDescription: {
    textAlign: 'center',
    color: COLORS.text.secondary,
    marginBottom: 24,
  },
  emptyStateButton: {
    minWidth: 200,
  },
});
