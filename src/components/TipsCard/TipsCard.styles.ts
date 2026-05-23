import {StyleSheet} from 'react-native';
import {COLORS} from '@/theme';
import {FONTS} from '@/constants';

export const styles = StyleSheet.create({
  // Default variant
  tipsCard: {
    backgroundColor: COLORS.background || '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: COLORS.shadow || '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border || '#F0F0F0',
  },

  // Compact variant
  tipsCardCompact: {
    backgroundColor: COLORS.background || '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: COLORS.shadow || '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border || '#F0F0F0',
  },

  // Floating variant
  tipsCardFloating: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.shadow || '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(240, 240, 240, 0.8)',
  },

  // Floating position
  floatingPosition: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    zIndex: 1000,
  },

  // Headers
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  tipsTitle: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: COLORS.text.primary,
    marginLeft: 8,
  },

  tipsTitleCompact: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: COLORS.text.primary,
    marginLeft: 8,
  },

  titleFlex: {
    flex: 1,
  },

  // Content areas
  tipsContent: {
    gap: 12,
  },

  tipsContentCompact: {
    gap: 8,
  },

  // Tip items
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },

  tipText: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
    flex: 1,
    lineHeight: 20,
  },

  tipTextCompact: {
    fontSize: 13,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: COLORS.text.secondary,
    flex: 1,
    lineHeight: 18,
  },

  // Dismiss button
  dismissButton: {
    padding: 4,
    borderRadius: 4,
  },

  // Toast-like styles for floating tips
  toastContainer: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    zIndex: 1000,
  },

  toastCard: {
    backgroundColor: COLORS.text?.primary || '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.shadow || '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  toastText: {
    color: COLORS.background || '#FFFFFF',
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    flex: 1,
    marginLeft: 8,
  },
});
