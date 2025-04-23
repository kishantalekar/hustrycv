import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';

export const SummaryEditor = () => {
  const {basics, updateBasics} = useResumeStore();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Professional Summary</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={6}
        value={basics.summary}
        onChangeText={text => updateBasics({summary: text})}
        placeholder="Write a brief summary of your professional background and goals..."
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 120,
  },
});
