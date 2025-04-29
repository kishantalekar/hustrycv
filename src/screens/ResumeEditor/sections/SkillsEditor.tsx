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

export const SkillsEditor = () => {
  const {getActiveResume, addSkill, updateSkill, removeSkill} =
    useResumeStore();
  const skills = getActiveResume().sections.skills;
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'intermediate',
    keywords: [],
  });
  const [newKeyword, setNewKeyword] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.name) {
      addSkill({
        name: newSkill.name,
        level: newSkill.level,
        keywords: newSkill.keywords,
      });
      setNewSkill({
        name: '',
        level: 'intermediate',
        keywords: [],
      });
      setShowAddForm(false);
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setNewSkill(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setNewSkill(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {skills?.items.map(skill => (
            <View key={skill.id} style={styles.skillCard}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(skill.id)}>
                <View>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillLevel}>
                    {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                  </Text>
                </View>
                <Icon
                  name={expandedItems[skill.id] ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
              {expandedItems[skill.id] && (
                <View style={styles.cardContent}>
                  <TextInput
                    style={styles.input}
                    placeholder="Skill Name"
                    placeholderTextColor="#999"
                    value={skill.name}
                    onChangeText={text =>
                      updateSkill(skill.id, {...skill, name: text})
                    }
                  />
                  <Text style={styles.label}>Level:</Text>
                  <View style={styles.levelSelector}>
                    {['beginner', 'intermediate', 'advanced'].map(level => (
                      <TouchableOpacity
                        key={level}
                        style={[
                          styles.levelChip,
                          skill.level === level && styles.selectedLevelChip,
                        ]}
                        onPress={() =>
                          updateSkill(skill.id, {...skill, level})
                        }>
                        <Text
                          style={[
                            styles.levelChipText,
                            skill.level === level &&
                              styles.selectedLevelChipText,
                          ]}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.keywordsSection}>
                    <Text style={styles.keywordsTitle}>Keywords:</Text>
                    <View style={styles.keywordsList}>
                      {skill.keywords.map((keyword, index) => (
                        <View key={index} style={styles.keywordItem}>
                          <Text style={styles.skillDetail}>• {keyword}</Text>
                          <TouchableOpacity
                            onPress={() =>
                              updateSkill(skill.id, {
                                ...skill,
                                keywords: skill.keywords.filter(
                                  (_, i) => i !== index,
                                ),
                              })
                            }>
                            <Icon name="close" size={20} color="#666" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.keywordsContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Add Keyword"
                      placeholderTextColor="#999"
                      value={newKeyword}
                      onChangeText={setNewKeyword}
                      onSubmitEditing={() => {
                        if (newKeyword.trim()) {
                          updateSkill(skill.id, {
                            ...skill,
                            keywords: [...skill.keywords, newKeyword.trim()],
                          });
                          setNewKeyword('');
                        }
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeSkill(skill.id)}>
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
              <Text style={styles.addButtonText}>Add New Skill</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.addFormHeader}>
                {newSkill.name ? (
                  <Text style={styles.newSkillTitle}>{newSkill.name}</Text>
                ) : (
                  <Text style={styles.addFormTitle}>Add New Skill</Text>
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Skill Name *"
                placeholderTextColor="#999"
                value={newSkill.name}
                onChangeText={text =>
                  setNewSkill(prev => ({...prev, name: text}))
                }
              />

              <Text style={styles.label}>Level:</Text>
              <View style={styles.levelSelector}>
                {['beginner', 'intermediate', 'advanced'].map(level => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.levelChip,
                      newSkill.level === level && styles.selectedLevelChip,
                    ]}
                    onPress={() => setNewSkill(prev => ({...prev, level}))}>
                    <Text
                      style={[
                        styles.levelChipText,
                        newSkill.level === level &&
                          styles.selectedLevelChipText,
                      ]}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.keywordsContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Add Keyword"
                  placeholderTextColor="#999"
                  value={newKeyword}
                  onChangeText={setNewKeyword}
                />
                <TouchableOpacity
                  style={[styles.formButton, styles.addKeywordButton]}
                  onPress={handleAddKeyword}>
                  <Text style={styles.addKeywordButtonText}>Add Keyword</Text>
                </TouchableOpacity>
              </View>

              {newSkill.keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordItem}>
                  <Text style={styles.keywordText}>• {keyword}</Text>
                  <TouchableOpacity onPress={() => handleRemoveKeyword(index)}>
                    <Icon name="close" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewSkill({
                      name: '',
                      level: 'intermediate',
                      keywords: [],
                    });
                  }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.formButton,
                    styles.saveButton,
                    !newSkill.name && styles.disabledButton,
                  ]}
                  onPress={handleAddSkill}
                  disabled={!newSkill.name}>
                  <Text style={styles.saveButtonText}>Save Skill</Text>
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
  skillCard: {
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
  skillName: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
    marginBottom: 4,
  },
  skillLevel: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  skillDetail: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  keywordsSection: {
    marginTop: 8,
  },
  keywordsTitle: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  keywordText: {
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
  newSkillTitle: {
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
  label: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  levelSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  levelChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  selectedLevelChip: {
    backgroundColor: '#007AFF',
  },
  levelChipText: {
    color: '#666',
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  selectedLevelChipText: {
    color: 'white',
  },
  keywordsContainer: {
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
  addKeywordButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  addKeywordButtonText: {
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
