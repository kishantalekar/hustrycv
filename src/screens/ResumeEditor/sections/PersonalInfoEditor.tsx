import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';

export const PersonalInfoEditor = () => {
  const {basics, updateBasics} = useResumeStore();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={basics.name}
          onChangeText={text => updateBasics({name: text})}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={basics.email}
          onChangeText={text => updateBasics({email: text})}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          onChangeText={text => updateBasics({phone: text})}
          value={basics.phone}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="City, Country"
          value={basics.location}
          onChangeText={text => updateBasics({location: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>LinkedIn</Text>
        <TextInput
          style={styles.input}
          placeholder="LinkedIn profile URL"
          value={basics.linkedin}
          onChangeText={text => updateBasics({linkedin: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>GitHub</Text>
        <TextInput
          style={styles.input}
          placeholder="GitHub profile URL"
          value={basics.github}
          onChangeText={text => updateBasics({github: text})}
        />
      </View>
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
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
