import {FONTS} from '@/constants';
import {COLORS, SPACING} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
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
    paddingBottom: 46,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: SPACING.sectionGap,
  },
  linkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  linkHeaderContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  linkUrlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  linkUrl: {
    fontSize: 14,
    color: '#666',
  },
  linkHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkContent: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    marginBottom: 12,
  },
  linkLabelInput: {
    backgroundColor: '#F8F8F8',
  },
  linkUrlInput: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  iconSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  iconSelectorText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  urlInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlActions: {
    flexDirection: 'row',
    marginLeft: 8,
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    // flex: 1,
    gap: SPACING.sectionGap,
  },
  urlActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSheetHandleIndicationStyles: {
    backgroundColor: COLORS.border,
    width: 40,
    height: 4,
  },
  bottomSheethandleStyle: {
    backgroundColor: COLORS.background.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 10,
  },
});
