import {Dimensions} from 'react-native';

/**
 * Get screen width based on percentage
 * @param percentage - Percentage of screen width (0-100)
 * @returns Width in pixels
 */
export const getScreenWidth = (percentage: number): number => {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }
  const {width} = Dimensions.get('window');
  return (width * percentage) / 100;
};

/**
 * Get screen height based on percentage
 * @param percentage - Percentage of screen height (0-100)
 * @returns Height in pixels
 */
export const getScreenHeight = (percentage: number): number => {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }
  const {height} = Dimensions.get('window');
  return (height * percentage) / 100;
};

/**
 * Get current screen dimensions
 * @returns Object containing screen width and height
 */
export const getScreenDimensions = () => {
  return Dimensions.get('window');
};
