import {TextProps} from 'react-native';

export enum TypographyVariant {
  // Display variants
  DisplayLarge = 'displayLarge',
  DisplayMedium = 'displayMedium',
  DisplaySmall = 'displaySmall',

  // Headline variants
  HeadlineLarge = 'headlineLarge',
  HeadlineMedium = 'headlineMedium',
  HeadlineSmall = 'headlineSmall',

  // Title variants
  TitleLarge = 'titleLarge',
  TitleMedium = 'titleMedium',
  TitleSmall = 'titleSmall',

  // Body variants
  BodyLarge = 'bodyLarge',
  BodyMedium = 'bodyMedium',
  BodySmall = 'bodySmall',

  // Label variants
  LabelLarge = 'labelLarge',
  LabelMedium = 'labelMedium',

  // Legacy variants (for backward compatibility)
  H1 = 'h1',
  H2 = 'h2',
  Body1 = 'body1',
  Body2 = 'body2',
  Button = 'button',
  Caption = 'caption',
}

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}
