import {FONTS} from '@/constants'; // Import FONTS for fontWeight
import {COLORS, SPACING, TYPOGRAPHY} from '@/theme'; // Corrected import path
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  animation: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background.primary, // Corrected constant
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg, // Corrected constant
  },
  title: {
    marginBottom: SPACING.lg, // Corrected constant
    color: COLORS.text.primary, // Corrected constant
  },
  input: {
    width: '100%',
    padding: SPACING.md, // Corrected constant
  },
  button: {
    width: '100%',
    marginBottom: SPACING.md, // Added margin for spacing between buttons
  },
  buttonText: {
    color: COLORS.white, // Corrected constant
    fontSize: TYPOGRAPHY.size.lg, // Corrected constant
    fontFamily: FONTS.FIRA_SANS.BOLD, // Corrected: Use fontFamily from FONTS
  },
});
