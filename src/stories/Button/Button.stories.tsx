import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from '../../components/Button';
import {COLORS} from '../../theme';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Variants = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Button
          title="Primary Button"
          variant="primary"
          style={styles.marginBottom}
        />
        <Button
          title="Secondary Button"
          variant="secondary"
          style={styles.marginBottom}
        />
        <Button
          title="Outline Button"
          variant="outline"
          style={styles.marginBottom}
        />
        <Button
          title="Text Button"
          variant="text"
          style={styles.marginBottom}
        />
      </View>

      <View style={styles.section}>
        <Button
          title="Disabled Primary"
          variant="primary"
          disabled
          style={styles.marginBottom}
        />
        <Button
          title="Disabled Secondary"
          variant="secondary"
          disabled
          style={styles.marginBottom}
        />
        <Button
          title="Disabled Outline"
          variant="outline"
          disabled
          style={styles.marginBottom}
        />
        <Button
          title="Disabled Text"
          variant="text"
          disabled
          style={styles.marginBottom}
        />
      </View>
    </ScrollView>
  );
};

export const Sizes = () => {
  return (
    <View style={styles.container}>
      <Button title="Small Button" size="small" style={styles.marginBottom} />
      <Button title="Medium Button" size="medium" style={styles.marginBottom} />
      <Button title="Large Button" size="large" style={styles.marginBottom} />
    </View>
  );
};

export const WithIcons = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Left Icon"
        leftIcon={<Icon name="add" size={20} color={COLORS.white} />}
        style={styles.marginBottom}
      />
      <Button
        title="Right Icon"
        rightIcon={<Icon name="arrow-forward" size={20} color={COLORS.white} />}
        style={styles.marginBottom}
      />
      <Button
        title="Both Icons"
        leftIcon={<Icon name="star" size={20} color={COLORS.white} />}
        rightIcon={<Icon name="star" size={20} color={COLORS.white} />}
        style={styles.marginBottom}
      />
      <Button
        title="Outline with Icons"
        variant="outline"
        leftIcon={<Icon name="edit" size={20} color={COLORS.primary} />}
        style={styles.marginBottom}
      />
    </View>
  );
};

export const Loading = () => {
  return (
    <View style={styles.container}>
      <Button title="Loading Primary" loading style={styles.marginBottom} />
      <Button
        title="Loading Secondary"
        variant="secondary"
        loading
        style={styles.marginBottom}
      />
      <Button
        title="Loading Outline"
        variant="outline"
        loading
        style={styles.marginBottom}
      />
    </View>
  );
};

export const FullWidth = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Full Width Primary"
        fullWidth
        style={styles.marginBottom}
      />
      <Button
        title="Full Width Secondary"
        variant="secondary"
        fullWidth
        style={styles.marginBottom}
      />
      <Button
        title="Full Width Outline"
        variant="outline"
        fullWidth
        style={styles.marginBottom}
      />
      <Button
        title="Full Width Danger"
        variant="danger"
        fullWidth
        style={styles.marginBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background.primary,
  },
  section: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
  },
  marginBottom: {
    marginBottom: 16,
  },
});
