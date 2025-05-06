import {StyleSheet} from 'react-native';
import {FONTS} from '../constants';
import {COLORS, SPACING, BORDER_RADIUS, SHADOW} from '../theme';

// const {width, height} = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  // Layout styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: SPACING.container,
  },
  contentContainer: {
    padding: SPACING.container,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: SPACING.container,
  },

  // Keyboard avoiding view styles
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },

  // Card styles
  card: {
    marginBottom: 16,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.background.secondary,
    ...SHADOW.medium,
  },

  // Input styles
  input: {
    marginBottom: 16,
    backgroundColor: COLORS.background.secondary,
    fontSize: 16,
    borderRadius: BORDER_RADIUS.md,
  },

  // Text styles
  title: {
    fontSize: 24,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.primary,
  },

  // Icon input container
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
  },
  inputIcon: {
    marginRight: 12,
  },

  // Divider
  divider: {
    marginVertical: SPACING.sectionGap,
    height: 1,
    backgroundColor: COLORS.border,
  },

  // Button styles
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.text.light,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
});
