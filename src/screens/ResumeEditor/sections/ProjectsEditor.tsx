import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from '@/components/TextInput';
import {FONTS} from '@/constants';
import {useResumeStore, ProjectItem} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';

export const ProjectsEditor = () => {
  const {getActiveResume, addProject, updateProject, removeProject} =
    useResumeStore();
  const projects = getActiveResume().sections.projects;
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    name: '',
    description: '',
    url: '',
    highlights: [],
  });
  const [newHighlight, setNewHighlight] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      addProject({
        name: newProject.name,
        description: newProject.description,
        url: newProject.url || '',
        highlights: newProject.highlights || [],
      });
      setNewProject({
        name: '',
        description: '',
        url: '',
        highlights: [],
      });
      setShowAddForm(false);
    }
  };

  const handleAddHighlight = () => {
    if (newHighlight) {
      setNewProject(prev => ({
        ...prev,
        highlights: [...(prev.highlights || []), newHighlight],
      }));
      setNewHighlight('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {projects?.items.map(project => (
            <View key={project.id} style={styles.projectCard}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(project.id)}>
                <View>
                  <Text style={styles.projectName}>{project.name}</Text>
                  {project.url && (
                    <Text style={styles.projectUrl}>{project.url}</Text>
                  )}
                </View>
                <Icon
                  name={
                    expandedItems[project.id] ? 'expand-less' : 'expand-more'
                  }
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
              {expandedItems[project.id] && (
                <View style={styles.cardContent}>
                  <TextInput
                    label="Project Name"
                    placeholder="Enter project name"
                    value={project.name}
                    onChangeText={text =>
                      updateProject(project.id, {...project, name: text})
                    }
                  />
                  <TextInput
                    label="Project Description"
                    placeholder="Enter project description"
                    value={project.description}
                    onChangeText={text =>
                      updateProject(project.id, {...project, description: text})
                    }
                    multiline
                    style={{height: 80}}
                  />
                  <TextInput
                    label="Project URL"
                    placeholder="Enter project URL (optional)"
                    value={project.url}
                    onChangeText={text =>
                      updateProject(project.id, {...project, url: text})
                    }
                  />
                  <View style={styles.highlightsSection}>
                    <Text style={styles.highlightsTitle}>Highlights:</Text>
                    {project.highlights.map((highlight, index) => (
                      <View key={index} style={styles.highlightItem}>
                        <Text style={styles.projectDetail}>• {highlight}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            updateProject(project.id, {
                              ...project,
                              highlights: project.highlights.filter(
                                (_, i) => i !== index,
                              ),
                            })
                          }>
                          <Icon name="close" size={20} color="#666" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <View style={styles.highlightsContainer}>
                    <TextInput
                      label="Add Highlight"
                      placeholder="Enter project highlight"
                      value={newHighlight}
                      onChangeText={setNewHighlight}
                      onSubmitEditing={() => {
                        if (newHighlight.trim()) {
                          updateProject(project.id, {
                            ...project,
                            highlights: [
                              ...project.highlights,
                              newHighlight.trim(),
                            ],
                          });
                          setNewHighlight('');
                        }
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeProject(project.id)}>
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
              <Text style={styles.addButtonText}>Add New Project</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.addFormHeader}>
                {newProject.name ? (
                  <Text style={styles.newProjectTitle}>{newProject.name}</Text>
                ) : (
                  <Text style={styles.addFormTitle}>Add New Project</Text>
                )}
              </View>

              <TextInput
                label="Project Name *"
                placeholder="Enter project name"
                value={newProject.name}
                onChangeText={text =>
                  setNewProject(prev => ({...prev, name: text}))
                }
                error={!newProject.name ? 'Project name is required' : ''}
              />
              <TextInput
                label="Project Description *"
                placeholder="Enter project description"
                value={newProject.description}
                onChangeText={text =>
                  setNewProject(prev => ({...prev, description: text}))
                }
                multiline
                style={{height: 80}}
              />
              <TextInput
                label="Project URL"
                placeholder="Enter project URL (optional)"
                value={newProject.url}
                onChangeText={text =>
                  setNewProject(prev => ({...prev, url: text}))
                }
              />

              <View style={styles.highlightsContainer}>
                <TextInput
                  label="Add Highlight"
                  placeholder="Enter project highlight"
                  value={newHighlight}
                  onChangeText={setNewHighlight}
                />
                <TouchableOpacity
                  style={[styles.formButton, styles.addHighlightButton]}
                  onPress={handleAddHighlight}>
                  <Text style={styles.addHighlightButtonText}>
                    Add Highlight
                  </Text>
                </TouchableOpacity>
              </View>

              {newProject.highlights?.map((highlight, index) => (
                <View key={index} style={styles.highlightItem}>
                  <Text style={styles.highlightText}>• {highlight}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      setNewProject(prev => ({
                        ...prev,
                        highlights: prev.highlights?.filter(
                          (_, i) => i !== index,
                        ),
                      }))
                    }>
                    <Icon name="close" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewProject({
                      name: '',
                      description: '',
                      url: '',
                      highlights: [],
                    });
                  }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.formButton,
                    styles.saveButton,
                    (!newProject.name || !newProject.description) &&
                      styles.disabledButton,
                  ]}
                  onPress={handleAddProject}
                  disabled={!newProject.name || !newProject.description}>
                  <Text style={styles.saveButtonText}>Save Project</Text>
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
  projectCard: {
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
  projectName: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
    marginBottom: 4,
  },
  projectUrl: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  projectDetail: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  highlightsSection: {
    marginTop: 8,
  },
  highlightsTitle: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
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
  newProjectTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
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
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  highlightsContainer: {
    marginBottom: 12,
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
  addHighlightButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  addHighlightButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 14,
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
