import {FONTS} from '@/constants';
import {typography} from '@/theme';
import {StyleSheet} from 'react-native';
import {TypographyVariant} from './Typography.types';

export const typographyStyles = StyleSheet.create({
  // Display variants
  [TypographyVariant.DisplayLarge]: {
    fontSize: 57,
    lineHeight: 64,
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },
  [TypographyVariant.DisplayMedium]: {
    fontSize: 45,
    lineHeight: 52,
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },
  [TypographyVariant.DisplaySmall]: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },

  // Headline variants
  [TypographyVariant.HeadlineLarge]: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: FONTS.FIRA_SANS.SEMIBOLD,
  },
  [TypographyVariant.HeadlineMedium]: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: FONTS.FIRA_SANS.SEMIBOLD,
  },
  [TypographyVariant.HeadlineSmall]: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FONTS.FIRA_SANS.SEMIBOLD,
  },

  // Title variants
  [TypographyVariant.TitleLarge]: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
  [TypographyVariant.TitleMedium]: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
  [TypographyVariant.TitleSmall]: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },

  // Body variants
  [TypographyVariant.BodyLarge]: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  [TypographyVariant.BodyMedium]: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  [TypographyVariant.BodySmall]: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },

  // Label variants
  [TypographyVariant.LabelLarge]: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
  [TypographyVariant.LabelMedium]: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },

  // Legacy variants (for backward compatibility)
  [TypographyVariant.H1]: typography.h1,
  [TypographyVariant.H2]: typography.h2,
  [TypographyVariant.Body1]: typography.body1,
  [TypographyVariant.Body2]: typography.body2,
  [TypographyVariant.Button]: typography.button,
  [TypographyVariant.Caption]: typography.caption,
});
