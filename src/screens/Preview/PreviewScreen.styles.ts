import {FONTS} from '@/constants';
import {COLORS} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    paddingBottom: 46,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  templateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  templateButtonText: {
    color: COLORS.text.light,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 14,
  },
  handleIndicator: {
    backgroundColor: COLORS.border,
    width: 40,
    height: 4,
  },
  handleStyle: {
    backgroundColor: COLORS.background.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 10,
  },
});
