import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {TextInput} from '@/components/TextInput';
import {TextInputVariant} from '@/components/TextInput/TextInput.types';
import {SPACING, COLORS} from '@/theme';

export default {
  title: 'Components/TextInput',
  component: TextInput,
};

export const Variants = () => {
  const [text, setText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <TextInput
          placeholder="Basic Input (Default)"
          value={text}
          onChangeText={setText}
        />

        <TextInput
          variant={TextInputVariant.Outlined}
          label="Outlined Input"
          placeholder="Enter text"
        />

        <TextInput
          variant={TextInputVariant.Flat}
          label="Flat Input"
          placeholder="Enter text"
        />
      </View>
    </ScrollView>
  );
};

export const WithIcons = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <TextInput
          variant={TextInputVariant.Outlined}
          label="Left Icon"
          placeholder="Search"
          leftIcon="search"
        />

        <TextInput
          variant={TextInputVariant.Outlined}
          label="Right Icon"
          placeholder="Clear input"
          rightIcon="close"
        />

        <TextInput
          variant={TextInputVariant.Outlined}
          label="Both Icons"
          placeholder="Search and clear"
          leftIcon="search"
          rightIcon="close"
        />
      </View>
    </ScrollView>
  );
};

export const WithHelperAndError = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <TextInput
          variant={TextInputVariant.Outlined}
          label="With Helper Text"
          placeholder="Enter username"
          helperText="Username must be at least 3 characters"
        />

        <TextInput
          variant={TextInputVariant.Outlined}
          label="With Error"
          placeholder="Enter phone number"
          error="Invalid phone number"
          leftIcon="phone"
          keyboardType="phone-pad"
        />
      </View>
    </ScrollView>
  );
};

export const SpecialInputs = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <TextInput
          variant={TextInputVariant.Outlined}
          label="Password Input"
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          leftIcon="lock"
          rightIcon={showPassword ? 'visibility' : 'visibility-off'}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        <TextInput
          variant={TextInputVariant.Outlined}
          label="Multiline Input"
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TextInput
          variant={TextInputVariant.Outlined}
          label="Email Input"
          placeholder="Enter your email"
          leftIcon="email"
          keyboardType="email-address"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background.primary,
  },
  section: {
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
});
