import {Dimensions} from 'react-native';
import {FONTS} from '../constants';

const {width, height} = Dimensions.get('window');

export const COLORS = {
  // Primary Colors
  primary: '#007AFF',
  secondary: '#DC3545',
  white: '#FFFFFF',

  // Background Colors
  background: {
    primary: '#F5F5F5',
    secondary: '#FFFFFF',
  },

  // Text Colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#FFFFFF',
  },

  // Status Colors
  status: {
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FFCC00',
  },

  // Border & Shadow
  border: '#E5E5E5',
  shadow: '#000000',
  preview: '#E8E8E8',
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
