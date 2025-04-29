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
import {globalStyles} from '../../../styles/globalStyles';

export const EducationEditor = () => {
  const {getActiveResume, addEducation, updateEducation, removeEducation} =
    useResumeStore();
  const education = getActiveResume().sections.education;
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation({
        institution: '',
        degree: '',
        startDate: '',
        endDate: '',
        gpa: '',
      });
      setShowAddForm(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {education?.items?.map(edu => (
            <View key={edu.id} style={styles.educationCard}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(edu.id)}>
                <View>
                  <Text style={styles.institutionName}>{edu.institution}</Text>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
                </View>
                <Icon
                  name={expandedItems[edu.id] ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
              {expandedItems[edu.id] && (
                <View style={styles.cardContent}>
                  <TextInput
                    style={styles.input}
                    placeholder="Institution Name"
                    placeholderTextColor="#999"
                    value={edu.institution}
                    onChangeText={text =>
                      updateEducation(edu.id, {...edu, institution: text})
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Degree"
                    placeholderTextColor="#999"
                    value={edu.degree}
                    onChangeText={text =>
                      updateEducation(edu.id, {...edu, degree: text})
                    }
                  />
                  <View style={styles.row}>
                    <TextInput
                      style={[styles.input, styles.flex1]}
                      placeholder="Start Date (MM/YYYY)"
                      placeholderTextColor="#999"
                      value={edu.startDate}
                      onChangeText={text =>
                        updateEducation(edu.id, {...edu, startDate: text})
                      }
                    />
                    <TextInput
                      style={[styles.input, styles.flex1]}
                      placeholder="End Date (MM/YYYY)"
                      placeholderTextColor="#999"
                      value={edu.endDate}
                      onChangeText={text =>
                        updateEducation(edu.id, {...edu, endDate: text})
                      }
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="GPA (Optional)"
                    placeholderTextColor="#999"
                    value={edu.gpa}
                    onChangeText={text =>
                      updateEducation(edu.id, {...edu, gpa: text})
                    }
                    keyboardType="decimal-pad"
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeEducation(edu.id)}>
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
              <Text style={styles.addButtonText}>Add New Education</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.addFormHeader}>
                {newEducation.institution ? (
                  <Text style={styles.newEducationTitle}>
                    {newEducation.institution}
                  </Text>
                ) : (
                  <Text style={styles.addFormTitle}>Add New Education</Text>
                )}
                {newEducation.degree && (
                  <Text style={styles.degree}>{newEducation.degree}</Text>
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Institution Name *"
                placeholderTextColor="#999"
                value={newEducation.institution}
                onChangeText={text =>
                  setNewEducation(prev => ({...prev, institution: text}))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Degree *"
                placeholderTextColor="#999"
                value={newEducation.degree}
                onChangeText={text =>
                  setNewEducation(prev => ({...prev, degree: text}))
                }
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.flex1]}
                  placeholder="Start Date (MM/YYYY) *"
                  placeholderTextColor="#999"
                  value={newEducation.startDate}
                  onChangeText={text =>
                    setNewEducation(prev => ({...prev, startDate: text}))
                  }
                />
                <TextInput
                  style={[styles.input, styles.flex1]}
                  placeholder="End Date (MM/YYYY)"
                  placeholderTextColor="#999"
                  value={newEducation.endDate}
                  onChangeText={text =>
                    setNewEducation(prev => ({...prev, endDate: text}))
                  }
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="GPA (Optional)"
                placeholderTextColor="#999"
                value={newEducation.gpa}
                onChangeText={text =>
                  setNewEducation(prev => ({...prev, gpa: text}))
                }
                keyboardType="decimal-pad"
              />

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewEducation({
                      institution: '',
                      degree: '',
                      startDate: '',
                      endDate: '',
                      gpa: '',
                    });
                  }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.formButton,
                    styles.saveButton,
                    (!newEducation.institution || !newEducation.degree) &&
                      styles.disabledButton,
                  ]}
                  onPress={handleAddEducation}
                  disabled={!newEducation.institution || !newEducation.degree}>
                  <Text style={styles.saveButtonText}>Save Education</Text>
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
  educationCard: {
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
  institutionName: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
    marginBottom: 4,
  },
  degree: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 2,
  },
  gpa: {
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
  newEducationTitle: {
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
