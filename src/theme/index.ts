import {Dimensions} from 'react-native';
import {FONTS} from '../constants';

const {width, height} = Dimensions.get('window');

export const COLORS = {
  // Primary Colors (10% usage)
  primary: '#FA6607', // Orange - Main CTAs
  secondary: '#00C2C4', // Teal - Secondary actions
  accent: '#1565C0', // Deep Blue - Navigation, info
  success: '#4CAF50', // Green - Success actions
  white: '#FFFFFF',

  danger: '#E53935', // Delete button
  dangerHover: '#D32F2F', // Hover/pressed state
  dangerBackground: '#FFCDD2', // Light red background for warnings
  dangerText: '#FFFFFF',
  // Background Colors (60% usage)
  background: {
    primary: '#F9FAFB', // Main surface color
    secondary: '#FFFFFF', // Card backgrounds
  },

  // Text Colors (30% usage)
  text: {
    primary: '#333333', // Main content, headings
    secondary: '#828282', // Supporting text, captions
    light: '#FFFFFF',
  },

  // Status Colors
  status: {
    error: '#FF3B30',
    success: '#4CAF50',
    warning: '#FFCC00',
  },

  // Border & Shadow
  border: '#E0E0E0', // Light gray for borders
  shadow: 'rgba(0, 0, 0, 0.08)', // Subtle depth
  preview: '#F5F5F5', // Light background for previews

  // Interactive States
  hover: {
    primary: '#FF7B2C', // Lighter orange
    secondary: '#00D6D8', // Lighter teal
  },
  focus: '#00C2C4', // Teal for focus states
};

export const SPACING = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,

  // Specific spacing
  container: 16,
  cardPadding: 16,
  sectionGap: 20,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

export const FONT_WEIGHT = {
  light: '300' as '300',
  regular: 'normal' as 'normal', // '400' is also 'normal'
  medium: '500' as '500',
  semibold: '600' as '600',
  bold: 'bold' as 'bold', // '700' is also 'bold'
  extrabold: '800' as '800',
};

export const TYPOGRAPHY = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
  },
};
export const typography = {
  h1: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },
  h2: {
    fontSize: TYPOGRAPHY.size.xl,
    fontFamily: FONTS.FIRA_SANS.SEMIBOLD,
  },
  body1: {
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  body2: {
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  button: {
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
  caption: {
    fontSize: 12,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
};
export const SHADOW = {
  light: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const LAYOUT = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
