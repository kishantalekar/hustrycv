import {
  TextInputProps as RNTextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export enum TextInputVariant {
  Outlined = 'outlined',
  Flat = 'flat',
}

export interface TextInputProps extends RNTextInputProps {
  /**
   * The variant of the text input
   * @default TextInputVariant.Outlined
   */
  variant?: TextInputVariant;

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below the input
   */
  helperText?: string;

  /**
   * Left icon name from MaterialIcons
   */
  leftIcon?: string;

  /**
   * Right icon name from MaterialIcons
   */
  rightIcon?: string;

  /**
   * Callback when right icon is pressed
   */
  onRightIconPress?: () => void;

  /**
   * Callback when left icon is pressed
   */
  onLeftIconPress?: () => void;

  containerStyle?: StyleProp<ViewStyle>;
}
