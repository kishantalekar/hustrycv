import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants';
import {COLORS, SPACING, TYPOGRAPHY} from '../../theme';

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.background.secondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tabBarLabel: {
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: TYPOGRAPHY.size.xs,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  placeholderText: {
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});
