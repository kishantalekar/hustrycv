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

export const WorkExperienceEditor = () => {
  const {
    sections: {work: workExperience},
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
  } = useResumeStore();

  const addNewExperience = () => {
    addWorkExperience({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: [],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Work Experience</Text>

      {workExperience?.items?.map(experience => (
        <View key={experience.id} style={styles.experienceCard}>
          <TextInput
            style={styles.input}
            value={experience.company}
            onChangeText={text =>
              updateWorkExperience(experience.id, {company: text})
            }
            placeholder="Company Name"
          />
          <TextInput
            style={styles.input}
            value={experience.position}
            onChangeText={text =>
              updateWorkExperience(experience.id, {position: text})
            }
            placeholder="Position"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.flex1]}
              value={experience.startDate}
              onChangeText={text =>
                updateWorkExperience(experience.id, {startDate: text})
              }
              placeholder="Start Date"
            />
            <TextInput
              style={[styles.input, styles.flex1]}
              value={experience.endDate}
              onChangeText={text =>
                updateWorkExperience(experience.id, {endDate: text})
              }
              placeholder="End Date"
            />
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeWorkExperience(experience.id)}>
            <Text style={styles.deleteButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addNewExperience}>
        <Text style={styles.addButtonText}>+ Add Experience</Text>
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
  experienceCard: {
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
