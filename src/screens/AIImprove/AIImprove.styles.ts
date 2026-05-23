import {StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, FONT_WEIGHT} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContentContainer: {
    flexGrow: 1, // Ensures content can scroll if it overflows
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    padding: SPACING.lg,
  },
  animation: {
    width: 250,
    height: 250,
    marginBottom: SPACING.lg,
  },
  emptyStateAnimation: {
    width: 280,
    height: 280,
    marginBottom: SPACING.md,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  loadingSubtitle: {
    fontSize: TYPOGRAPHY.size.md, // Updated from FONT_SIZE.md
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  progressBar: {
    marginTop: SPACING.md,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    paddingTop: SPACING.xxl, // More space at the top
  },
  startTitle: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  startDescription: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: TYPOGRAPHY.size.md * 1.5,
  },
  startButton: {
    width: '90%',
    maxWidth: 320,
  },
  header: {
    padding: SPACING.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  scoreCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  scoreCircleText: {
    fontSize: TYPOGRAPHY.size.xxxl, // Larger score text
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary, // Match progress color
  },
  overallScoreLabel: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  reanalyzeButton: {
    marginTop: SPACING.lg,
    borderColor: COLORS.primary,
  },
  sectionsContainer: {
    padding: SPACING.md,
  },
  sectionCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionIcon: {
    marginRight: SPACING.sm,
  },
  sectionName: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    flex: 1, // Allow text to take available space
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  sectionScore: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
  },
  scoreOutOf: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  sectionProgressBar: {
    marginVertical: SPACING.sm,
    borderRadius: SPACING.xs,
  },
  feedbackTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  feedbackText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    lineHeight: TYPOGRAPHY.size.sm * 1.6,
    marginBottom: SPACING.md,
  },
  recommendationsContainer: {
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  recommendationsTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start for multi-line text
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.xs,
  },
  bulletPoint: {
    marginRight: SPACING.sm,
    marginTop: SPACING.xxs, // Adjust for better alignment with text
  },
  recommendationText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    flex: 1,
    lineHeight: TYPOGRAPHY.size.sm * 1.6,
  },
  errorText: {
    marginTop: SPACING.lg,
    color: COLORS.accent.error,
    fontSize: TYPOGRAPHY.size.md,
    textAlign: 'center',
  },
  errorTextCenter: {
    color: COLORS.accent.error,
    fontSize: TYPOGRAPHY.size.md,
    textAlign: 'center',
    marginVertical: SPACING.md,
  },
});
