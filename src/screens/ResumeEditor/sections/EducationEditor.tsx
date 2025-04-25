import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Card, TextInput, Button, IconButton, Text} from 'react-native-paper';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';

export const EducationEditor = () => {
  const {
    sections: {education},
    addEducation,
    updateEducation,
    removeEducation,
  } = useResumeStore();

  const addNewEducation = () => {
    addEducation({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: '',
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle} variant="headlineMedium">
          Education
        </Text>

        {education?.items?.map((edu, index) => (
          <Card key={edu.id} style={styles.educationCard}>
            <Card.Title
              title={edu.institution || `Education ${index + 1}`}
              right={props => (
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={() => removeEducation(edu.id)}
                />
              )}
            />
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Institution Name"
                placeholder="Enter institution name"
                style={styles.input}
                value={edu.institution}
                onChangeText={text =>
                  updateEducation(edu.id, {institution: text})
                }
              />
              <TextInput
                mode="outlined"
                label="Degree"
                placeholder="Enter your degree"
                style={styles.input}
                value={edu.degree}
                onChangeText={text => updateEducation(edu.id, {degree: text})}
              />
              <View style={styles.row}>
                <TextInput
                  mode="outlined"
                  label="Start Date"
                  placeholder="MM/YYYY"
                  style={[styles.input, styles.flex1]}
                  value={edu.startDate}
                  onChangeText={text =>
                    updateEducation(edu.id, {startDate: text})
                  }
                />
                <TextInput
                  mode="outlined"
                  label="End Date"
                  placeholder="MM/YYYY or Present"
                  style={[styles.input, styles.flex1]}
                  value={edu.endDate}
                  onChangeText={text =>
                    updateEducation(edu.id, {endDate: text})
                  }
                />
              </View>
              <TextInput
                mode="outlined"
                label="GPA (Optional)"
                placeholder="Enter your GPA"
                style={styles.input}
                value={edu.gpa}
                onChangeText={text => updateEducation(edu.id, {gpa: text})}
                keyboardType="decimal-pad"
              />
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="contained"
          onPress={addNewEducation}
          style={styles.addButton}
          icon="plus">
          Add Education
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },
  educationCard: {
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  addButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});
