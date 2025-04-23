export const FONT_SIZES = {
  h1: 24,
  h2: 20,
  h3: 16,
  body: 12,
  small: 8,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const COLORS = {
  primary: '#2D3748',
  secondary: '#4A5568',
  accent: '#3182CE',
  link: '#2B6CB0',
  divider: '#CBD5E0',
  background: '#FFFFFF',
} as const;

export const getResumeStyles = (scale: number) => ({
  container: `
    margin-bottom: ${SPACING.md}px;
  `,
  header: `
    font-family: 'FiraSans-Bold';
    font-size: ${FONT_SIZES.h1 * scale}px;
    color: ${COLORS.primary};
    margin: 0;
  `,
  subheader: `
    font-family: 'FiraSans-Medium';
    font-size: ${FONT_SIZES.h2 * scale}px;
    color: ${COLORS.secondary};
    margin: ${SPACING.sm}px 0;
  `,
  body: `
    font-family: 'FiraSans-Regular';
    font-size: ${FONT_SIZES.body * scale}px;
    color: ${COLORS.primary};
    line-height: 1.5;
  `,
  small: `
    font-family: 'FiraSans-Regular';
    font-size: ${FONT_SIZES.small * scale}px;
    color: ${COLORS.secondary};
  `,
  link: `
    color: ${COLORS.link};
    text-decoration: none;
  `,
  divider: `
    border-bottom: 1px solid ${COLORS.divider};
    margin: ${SPACING.md}px 0;
  `,
  centered: `
    text-align: center;
  `,
});
