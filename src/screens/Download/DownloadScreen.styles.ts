import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants';
import {COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOW} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    padding: SPACING.lg,
    paddingBottom: SPACING.sm,
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
  previewContainer: {
    flex: 1,
    margin: SPACING.md,
    minHeight: 400,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOW.medium,
    overflow: 'hidden',
  },
  pdfView: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    margin: 0,
    paddingVertical: 10,
    marginHorizontal: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
  },
  actionsContainer: {
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: 'white',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    marginBottom: 12,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#5856D6',
  },
  emailButton: {
    flex: 1,
    backgroundColor: '#34C759',
  },
  viewDownloadsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9500',
    marginHorizontal: 16,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viewDownloadsText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666666',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
});
