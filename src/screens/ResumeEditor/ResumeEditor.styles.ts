import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants';
import {COLORS, SPACING, TYPOGRAPHY} from '../../theme';

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.background.secondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: SPACING.xs,
    paddingTop: SPACING.xs,
    height: 60,
  },
  tabBarLabel: {
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    fontSize: TYPOGRAPHY.size.xs,
    lineHeight: TYPOGRAPHY.lineHeight.xs,
    marginBottom: SPACING.xs,
  },
  tabBarItem: {
    paddingTop: SPACING.xs,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background.primary,
  },
  placeholderText: {
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeight.md,
  },
});
