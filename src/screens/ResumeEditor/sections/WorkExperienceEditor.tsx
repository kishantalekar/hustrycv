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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle} variant="headlineMedium">
          Work Experience
        </Text>

        <Card style={styles.addCard}>
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Company Name"
              placeholder="Enter company name"
              style={styles.input}
              value={workExperience?.items?.[0]?.company || ''}
              onChangeText={text =>
                updateWorkExperience(workExperience?.items?.[0]?.id || '', {
                  company: text,
                })
              }
            />
            <TextInput
              mode="outlined"
              label="Position"
              placeholder="Enter your position"
              style={styles.input}
              value={workExperience?.items?.[0]?.position || ''}
              onChangeText={text =>
                updateWorkExperience(workExperience?.items?.[0]?.id || '', {
                  position: text,
                })
              }
            />
            <View style={styles.row}>
              <TextInput
                mode="outlined"
                label="Start Date"
                placeholder="MM/YYYY"
                style={[styles.input, styles.flex1]}
                value={workExperience?.items?.[0]?.startDate || ''}
                onChangeText={text =>
                  updateWorkExperience(workExperience?.items?.[0]?.id || '', {
                    startDate: text,
                  })
                }
              />
              <TextInput
                mode="outlined"
                label="End Date"
                placeholder="MM/YYYY or Present"
                style={[styles.input, styles.flex1]}
                value={workExperience?.items?.[0]?.endDate || ''}
                onChangeText={text =>
                  updateWorkExperience(workExperience?.items?.[0]?.id || '', {
                    endDate: text,
                  })
                }
              />
            </View>
          </Card.Content>
        </Card>

        {workExperience?.items?.slice(1).map(experience => (
          <Card key={experience.id} style={styles.experienceCard}>
            <Card.Title
              title={experience.company || 'Work Experience'}
              right={props => (
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={() => removeWorkExperience(experience.id)}
                />
              )}
            />
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Company Name"
                placeholder="Enter company name"
                style={styles.input}
                value={experience.company}
                onChangeText={text =>
                  updateWorkExperience(experience.id, {company: text})
                }
              />
              <TextInput
                mode="outlined"
                label="Position"
                placeholder="Enter your position"
                style={styles.input}
                value={experience.position}
                onChangeText={text =>
                  updateWorkExperience(experience.id, {position: text})
                }
              />
              <View style={styles.row}>
                <TextInput
                  mode="outlined"
                  label="Start Date"
                  placeholder="MM/YYYY"
                  style={[styles.input, styles.flex1]}
                  value={experience.startDate}
                  onChangeText={text =>
                    updateWorkExperience(experience.id, {startDate: text})
                  }
                />
                <TextInput
                  mode="outlined"
                  label="End Date"
                  placeholder="MM/YYYY or Present"
                  style={[styles.input, styles.flex1]}
                  value={experience.endDate}
                  onChangeText={text =>
                    updateWorkExperience(experience.id, {endDate: text})
                  }
                />
              </View>
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="contained"
          onPress={addNewExperience}
          style={styles.addButton}
          icon="plus">
          Add Experience
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
  addCard: {
    marginBottom: 16,
    elevation: 2,
  },
  experienceCard: {
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
