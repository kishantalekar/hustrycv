import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FONTS} from '@/constants';
import {COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY} from '@/theme';
import {TextInputProps, TextInputVariant} from './TextInput.types';
import {Typography, TypographyVariant} from '../Typography';

export const TextInput: React.FC<TextInputProps> = ({
  variant = TextInputVariant.Outlined,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  onLeftIconPress,
  style,
  containerStyle,
  ...props
}) => {
  const isOutlined = variant === TextInputVariant.Outlined;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typography
          variant={TypographyVariant.LabelLarge}
          style={[styles.label, error && styles.errorLabel]}>
          {label}
        </Typography>
      )}
      <View
        style={[
          styles.inputContainer,
          isOutlined && styles.outlinedInput,
          !isOutlined && styles.flatInput,
          error && styles.errorInput,
          style,
        ]}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
            style={styles.iconContainer}>
            <Icon
              name={leftIcon}
              size={20}
              color={error ? COLORS.status.error : COLORS.text.secondary}
            />
          </TouchableOpacity>
        )}
        <RNTextInput
          style={[styles.input, leftIcon && styles.inputWithLeftIcon]}
          placeholderTextColor={COLORS.text.secondary}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={styles.iconContainer}>
            <Icon
              name={rightIcon}
              size={20}
              color={error ? COLORS.status.error : COLORS.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {helperText && !error && (
        <Typography
          variant={TypographyVariant.BodySmall}
          style={styles.helperText}>
          {helperText}
        </Typography>
      )}
      {error && (
        <Typography
          variant={TypographyVariant.BodySmall}
          style={[styles.helperText, styles.errorText]}>
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    marginBottom: SPACING.xs,
    color: COLORS.text.secondary,
  },
  errorLabel: {
    color: COLORS.status.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
  },
  outlinedInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
  },
  flatInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 0,
  },
  errorInput: {
    borderColor: COLORS.status.error,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.sm,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.primary,
  },
  inputWithLeftIcon: {
    paddingLeft: SPACING.xs,
  },
  iconContainer: {
    padding: SPACING.xs,
  },
  helperText: {
    marginTop: SPACING.xs,
    color: COLORS.text.secondary,
  },
  errorText: {
    color: COLORS.status.error,
  },
});
