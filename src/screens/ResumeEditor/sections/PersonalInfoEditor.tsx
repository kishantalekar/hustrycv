import React from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Card, TextInput, Text} from 'react-native-paper';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';

export const PersonalInfoEditor = () => {
  const {getActiveResume, updateBasics} = useResumeStore();

  const basics = getActiveResume().basics;
  console.log('basics');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle} variant="headlineMedium">
          Personal Information
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Full Name"
              value={basics.name}
              onChangeText={text => updateBasics({name: text})}
              placeholder="Enter your full name"
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="Email"
              value={basics.email}
              onChangeText={text => updateBasics({email: text})}
              placeholder="Enter your email"
              keyboardType="email-address"
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="Phone"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              onChangeText={text => updateBasics({phone: text})}
              value={basics.phone}
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="Location"
              placeholder="City, Country"
              value={basics.location}
              onChangeText={text => updateBasics({location: text})}
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="LinkedIn"
              placeholder="LinkedIn profile URL"
              value={basics.linkedin}
              onChangeText={text => updateBasics({linkedin: text})}
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="GitHub"
              placeholder="GitHub profile URL"
              value={basics.github}
              onChangeText={text => updateBasics({github: text})}
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
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderRadius: 8,
  },
});
