import React from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {Card, TextInput, Text, Divider} from 'react-native-paper';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const PersonalInfoEditor = () => {
  const {getActiveResume, updateBasics} = useResumeStore();

  const basics = getActiveResume().basics;
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
            <View style={styles.iconInputContainer}>
              <Icon
                name="person"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                mode="outlined"
                label="Full Name"
                value={basics.name}
                onChangeText={text => updateBasics({name: text})}
                placeholder="Enter your full name"
                style={styles.input}
              />
            </View>

            <View style={styles.iconInputContainer}>
              <Icon
                name="email"
                size={20}
                color="#666"
                style={styles.inputIcon}
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
            </View>

            <View style={styles.iconInputContainer}>
              <Icon
                name="phone"
                size={20}
                color="#666"
                style={styles.inputIcon}
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
            </View>

            <View style={styles.iconInputContainer}>
              <Icon
                name="location-on"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                mode="outlined"
                label="Location"
                placeholder="City, Country"
                value={basics.location}
                onChangeText={text => updateBasics({location: text})}
                style={styles.input}
              />
            </View>

            <Divider style={styles.divider} />
            <Text style={styles.subsectionTitle}>Professional Profiles</Text>

            <View style={styles.iconInputContainer}>
              <Icon
                name="link"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                mode="outlined"
                label="LinkedIn"
                placeholder="LinkedIn profile URL"
                value={basics.linkedin}
                onChangeText={text => updateBasics({linkedin: text})}
                style={styles.input}
              />
            </View>

            <View style={styles.iconInputContainer}>
              <Icon
                name="code"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                mode="outlined"
                label="GitHub"
                placeholder="GitHub profile URL"
                value={basics.github}
                onChangeText={text => updateBasics({github: text})}
                style={styles.input}
              />
            </View>

            <Divider style={styles.divider} />
            <Text style={styles.subsectionTitle}>Professional Summary</Text>
            <TextInput
              mode="flat"
              multiline
              numberOfLines={6}
              value={basics.summary}
              onChangeText={text => updateBasics({summary: text})}
              placeholder="Write a brief summary highlighting your key professional achievements, skills, and career objectives..."
              style={[styles.input, styles.summaryInput]}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
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
    flex: 1,
  },
});
