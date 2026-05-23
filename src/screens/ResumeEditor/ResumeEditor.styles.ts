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
  slideOutPanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    backgroundColor: '#FFFFFF',
  },
  previewHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: SPACING.sm,
  },
  closeButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: COLORS.text.primary,
  },
});
