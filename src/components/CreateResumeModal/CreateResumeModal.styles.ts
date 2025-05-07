import {
  BORDER_RADIUS,
  COLORS,
  SHADOW,
  SPACING,
  TYPOGRAPHY,
  typography,
} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 10,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1000,
  },
  dropdown: {
    position: 'absolute',
    top: 60, // Adjust this value based on your header height
    right: 16,
    minWidth: 180,
    zIndex: 1001,
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
});
