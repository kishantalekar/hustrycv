import {StyleSheet} from 'react-native';
import {COLORS, SPACING, typography, BORDER_RADIUS, SHADOW} from '../../theme';

export const styles = StyleSheet.create({
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
  },
  title: {
    ...typography.h1,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  createButtonText: {
    color: COLORS.white,
    ...typography.button,
  },
  resumeList: {
    gap: SPACING.lg,
  },
  resumeCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  resumePreview: {
    height: 100,
    backgroundColor: COLORS.preview,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfView: {
    width: '100%',
    height: '100%',
  },
  previewText: {
    color: COLORS.text.secondary,
    ...typography.body1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: SPACING.sm,
    color: COLORS.text.secondary,
    ...typography.body2,
  },
  resumeInfo: {
    padding: SPACING.md,
  },
  resumeName: {
    fontSize: 18,
    fontFamily: typography.h1.fontFamily,
    marginBottom: SPACING.xs,
  },
  resumeDate: {
    ...typography.body2,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  resumeTemplate: {
    ...typography.body2,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
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
});
