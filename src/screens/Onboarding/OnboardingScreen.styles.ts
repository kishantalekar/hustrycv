import {BORDER_RADIUS, COLORS, SHADOW, SPACING} from '@/theme';
import {getScreenHeight} from '@/utils/dimensions';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
    paddingTop: getScreenHeight(10),
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: SPACING.sm,
  },
  animationContainer: {
    width: 250,
    height: 250,
    marginBottom: SPACING.xl,
  },
  title: {
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  subtitle: {
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 120, // Increased bottom spacing
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: COLORS.border,
    // marginHorizontal will be handled by gap in paginationDotsContainer
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row', // Added for horizontal layout of buttons
    justifyContent: 'space-between', // Distribute space when two buttons are present
    alignItems: 'center', // Align items vertically
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center', // Center text inside button
    ...SHADOW.medium,
    flex: 1, // Allow button to take available space if it's the only one
    marginHorizontal: SPACING.xs, // Add small margin if there are two buttons
  },
  buttonText: {
    color: COLORS.text.light,
  },
  skipButton: {
    backgroundColor: 'transparent',
    paddingVertical: SPACING.sm,
    flex: 0.5, // Take less space than the main button
    alignItems: 'center', // Center text
    justifyContent: 'center',
  },
  skipButtonText: {
    color: COLORS.text.secondary,
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm, // Adjust gap as needed for spacing between dots
    marginTop: 10,
  },
});
