import React from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Card, Text, TextInput} from 'react-native-paper';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';

export const SummaryEditor = () => {
  const {getActiveResume, updateBasics} = useResumeStore();
  const basics = getActiveResume().basics;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle} variant="headlineMedium">
          Professional Summary
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              mode="outlined"
              multiline
              numberOfLines={8}
              value={basics.summary}
              onChangeText={text => updateBasics({summary: text})}
              placeholder="Write a brief summary highlighting your key professional achievements, skills, and career objectives..."
              style={styles.input}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 24,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    fontSize: 28,
    color: '#1A1A1A',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    minHeight: 160,
  },
});
