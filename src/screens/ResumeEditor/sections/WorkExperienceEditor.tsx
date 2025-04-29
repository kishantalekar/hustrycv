import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';

export const WorkExperienceEditor = () => {
  const {
    getActiveResume,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
  } = useResumeStore();
  const workExperience = getActiveResume().sections.work;
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    highlights: [],
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      addWorkExperience(newExperience);
      setNewExperience({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        highlights: [],
      });
      setShowAddForm(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {workExperience?.items.map(experience => (
            <View key={experience.id} style={styles.experienceCard}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(experience.id)}>
                <View>
                  <Text style={styles.companyName}>{experience.company}</Text>
                  <Text style={styles.position}>{experience.position}</Text>
                  {experience.location && (
                    <Text style={styles.location}>{experience.location}</Text>
                  )}
                </View>
                <Icon
                  name={
                    expandedItems[experience.id] ? 'expand-less' : 'expand-more'
                  }
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
              {expandedItems[experience.id] && (
                <View style={styles.cardContent}>
                  <TextInput
                    style={styles.input}
                    placeholder="Company Name"
                    placeholderTextColor="#999"
                    value={experience.company}
                    onChangeText={text =>
                      updateWorkExperience(experience.id, {
                        ...experience,
                        company: text,
                      })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Position"
                    placeholderTextColor="#999"
                    value={experience.position}
                    onChangeText={text =>
                      updateWorkExperience(experience.id, {
                        ...experience,
                        position: text,
                      })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Location (optional)"
                    placeholderTextColor="#999"
                    value={experience.location}
                    onChangeText={text =>
                      updateWorkExperience(experience.id, {
                        ...experience,
                        location: text,
                      })
                    }
                  />
                  <View style={styles.row}>
                    <TextInput
                      style={[styles.input, styles.flex1]}
                      placeholder="Start Date (MM/YYYY)"
                      placeholderTextColor="#999"
                      value={experience.startDate}
                      onChangeText={text =>
                        updateWorkExperience(experience.id, {
                          ...experience,
                          startDate: text,
                        })
                      }
                    />
                    <TextInput
                      style={[styles.input, styles.flex1]}
                      placeholder="End Date (MM/YYYY)"
                      placeholderTextColor="#999"
                      value={experience.endDate}
                      onChangeText={text =>
                        updateWorkExperience(experience.id, {
                          ...experience,
                          endDate: text,
                        })
                      }
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeWorkExperience(experience.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          {!showAddForm ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddForm(true)}>
              <Text style={styles.addButtonText}>Add New Experience</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.addFormHeader}>
                {newExperience.company ? (
                  <Text style={styles.newExperienceTitle}>
                    {newExperience.company}
                  </Text>
                ) : (
                  <Text style={styles.addFormTitle}>Add New Experience</Text>
                )}
                {newExperience.position && (
                  <Text style={styles.position}>{newExperience.position}</Text>
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Company Name *"
                placeholderTextColor="#999"
                value={newExperience.company}
                onChangeText={text =>
                  setNewExperience(prev => ({...prev, company: text}))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Position *"
                placeholderTextColor="#999"
                value={newExperience.position}
                onChangeText={text =>
                  setNewExperience(prev => ({...prev, position: text}))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Location (optional)"
                placeholderTextColor="#999"
                value={newExperience.location}
                onChangeText={text =>
                  setNewExperience(prev => ({...prev, location: text}))
                }
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.flex1]}
                  placeholder="Start Date (MM/YYYY) *"
                  placeholderTextColor="#999"
                  value={newExperience.startDate}
                  onChangeText={text =>
                    setNewExperience(prev => ({...prev, startDate: text}))
                  }
                />
                <TextInput
                  style={[styles.input, styles.flex1]}
                  placeholder="End Date (MM/YYYY)"
                  placeholderTextColor="#999"
                  value={newExperience.endDate}
                  onChangeText={text =>
                    setNewExperience(prev => ({...prev, endDate: text}))
                  }
                />
              </View>

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewExperience({
                      company: '',
                      position: '',
                      location: '',
                      startDate: '',
                      endDate: '',
                      current: false,
                      highlights: [],
                    });
                  }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.formButton,
                    styles.saveButton,
                    (!newExperience.company || !newExperience.position) &&
                      styles.disabledButton,
                  ]}
                  onPress={handleAddExperience}
                  disabled={!newExperience.company || !newExperience.position}>
                  <Text style={styles.saveButtonText}>Save Experience</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
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
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: 16,
    color: '#333',
  },
  experienceCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  companyName: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
    marginBottom: 4,
  },
  position: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addFormHeader: {
    marginBottom: 16,
  },
  addFormTitle: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  newExperienceTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  formButton: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  cancelButtonText: {
    color: '#666',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
