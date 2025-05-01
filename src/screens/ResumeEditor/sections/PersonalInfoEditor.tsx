import React from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Card, Text, Divider} from 'react-native-paper';
import {TextInput} from '@/components/TextInput';
import {FONTS} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';

export const PersonalInfoEditor = () => {
  const {getActiveResume, updateBasics} = useResumeStore();

  const basics = getActiveResume().basics;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Full Name"
              value={basics.name}
              onChangeText={text => updateBasics({name: text})}
              placeholder="Enter your full name"
              style={styles.input}
              leftIcon="person"
            />

            <TextInput
              label="Email"
              value={basics.email}
              onChangeText={text => updateBasics({email: text})}
              placeholder="Enter your email"
              keyboardType="email-address"
              style={styles.input}
              leftIcon="email"
            />

            <TextInput
              label="Phone"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              onChangeText={text => updateBasics({phone: text})}
              value={basics.phone}
              style={styles.input}
              leftIcon="phone"
            />

            <TextInput
              label="Location"
              placeholder="City, Country"
              value={basics.location}
              onChangeText={text => updateBasics({location: text})}
              style={styles.input}
              leftIcon="location-on"
            />

            <Divider style={styles.divider} />
            <Text style={styles.subsectionTitle}>Professional Profiles</Text>

            <TextInput
              label="LinkedIn"
              placeholder="LinkedIn profile URL"
              value={basics.linkedin}
              onChangeText={text => updateBasics({linkedin: text})}
              style={styles.input}
              leftIcon="link"
            />

            <TextInput
              label="GitHub"
              placeholder="GitHub profile URL"
              value={basics.github}
              onChangeText={text => updateBasics({github: text})}
              style={styles.input}
              leftIcon="code"
            />

            <Divider style={styles.divider} />
            <Text style={styles.subsectionTitle}>Professional Summary</Text>
            <TextInput
              label="Professional Summary"
              multiline
              numberOfLines={6}
              value={basics.summary}
              onChangeText={text => updateBasics({summary: text})}
              placeholder="Write a brief summary highlighting your key professional achievements, skills, and career objectives..."
              style={[styles.input, styles.summaryInput]}
              textAlignVertical="top"
              helperText="Share your professional journey and aspirations"
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 24,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  subsectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: '#333',
    marginBottom: 16,
  },
  summaryInput: {
    minHeight: 120,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  container: {
    flex: 1,
    padding: 16,
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
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderRadius: 8,
  },
});
