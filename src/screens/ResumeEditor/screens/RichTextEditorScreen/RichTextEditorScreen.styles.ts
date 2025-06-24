import {COLORS} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.background.primary,
  },
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
    padding: 16,
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
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.text.primary,
  },
  bottomSheetDescription: {
    fontSize: 14,
    marginBottom: 16,
    color: COLORS.text.secondary,
  },
  contextInput: {
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: COLORS.background.primary,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonText: {
    color: COLORS.text.light,
    fontWeight: '500',
    fontSize: 16,
  },
});
