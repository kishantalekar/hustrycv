import {COLORS, SPACING} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  header: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: '#666',
  },
  socialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  socialHeaderContent: {
    flex: 1,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  socialUrl: {
    fontSize: 14,
    color: '#666',
  },
  socialHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContent: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    marginBottom: 12,
  },
  socialTypeInput: {
    backgroundColor: '#F8F8F8',
  },
  socialUrlInput: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  urlInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlActions: {
    flexDirection: 'row',
    marginLeft: 8,
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
});
