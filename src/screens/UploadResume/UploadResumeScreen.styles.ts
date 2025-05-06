import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/theme';

export const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  card: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filePickerButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  filePickerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filePickerText: {
    color: COLORS.text.primary,
    fontSize: 16,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  fileSize: {
    color: COLORS.text.secondary,
    fontSize: 14,
    marginTop: SPACING.xs,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: COLORS.text.secondary,
    opacity: 0.5,
  },
  uploadButtonText: {
    color: COLORS.text.light,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  infoSection: {
    padding: SPACING.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoText: {
    color: COLORS.text.secondary,
    fontSize: 14,
    marginLeft: SPACING.xs,
  },
});
