import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Education</Text>

      {education?.items?.map(edu => (
        <View key={edu.id} style={styles.educationCard}>
          <TextInput
            style={styles.input}
            value={edu.institution}
            onChangeText={text => updateEducation(edu.id, {institution: text})}
            placeholder="Institution Name"
          />
          <TextInput
            style={styles.input}
            value={edu.degree}
            onChangeText={text => updateEducation(edu.id, {degree: text})}
            placeholder="Degree"
          />
          {/* <TextInput
            style={styles.input}
            value={edu.field}
            onChangeText={text => updateEducation(edu.id, {field: text})}
            placeholder="Field of Study"
          /> */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.flex1]}
              value={edu.startDate}
              onChangeText={text => updateEducation(edu.id, {startDate: text})}
              placeholder="Start Date"
            />
            <TextInput
              style={[styles.input, styles.flex1]}
              value={edu.endDate}
              onChangeText={text => updateEducation(edu.id, {endDate: text})}
              placeholder="End Date"
            />
          </View>
          <TextInput
            style={styles.input}
            value={edu.gpa}
            onChangeText={text => updateEducation(edu.id, {gpa: text})}
            placeholder="GPA (Optional)"
            keyboardType="decimal-pad"
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeEducation(edu.id)}>
            <Text style={styles.deleteButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addNewEducation}>
        <Text style={styles.addButtonText}>+ Add Education</Text>
      </TouchableOpacity>
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
  educationCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  addButton: {
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },
  deleteButton: {
    padding: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
});
