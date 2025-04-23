import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';

export const SkillsEditor = () => {
  const {
    sections: {skills},
    addSkill,
    updateSkill,
    removeSkill,
  } = useResumeStore();
  const [newKeyword, setNewKeyword] = useState('');

  const addNewSkill = () => {
    addSkill({
      name: '',
      level: 'intermediate',
      keywords: [],
    });
  };

  const addKeyword = (skillId: string, keywords: string[]) => {
    if (newKeyword.trim()) {
      updateSkill(skillId, {keywords: [...keywords, newKeyword.trim()]});
      setNewKeyword('');
    }
  };

  const removeKeyword = (
    skillId: string,
    keywords: string[],
    index: number,
  ) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    updateSkill(skillId, {keywords: newKeywords});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Skills</Text>

      {skills.items?.map(skill => (
        <View key={skill.id} style={styles.skillCard}>
          <TextInput
            style={styles.input}
            value={skill.name}
            onChangeText={text => updateSkill(skill.id, {name: text})}
            placeholder="Skill Name (e.g., Programming Languages)"
          />
          <View style={styles.levelSelector}>
            <Text style={styles.label}>Level:</Text>
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelButton,
                  skill.level === level && styles.selectedLevel,
                ]}
                onPress={() => updateSkill(skill.id, {level})}>
                <Text
                  style={[
                    styles.levelText,
                    skill.level === level && styles.selectedLevelText,
                  ]}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.keywordsContainer}>
            <Text style={styles.label}>Keywords:</Text>
            <View style={styles.keywordsList}>
              {skill.keywords.map((keyword, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.keyword}
                  onPress={() =>
                    removeKeyword(skill.id, skill.keywords, index)
                  }>
                  <Text style={styles.keywordText}>{keyword} ×</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.addKeywordRow}>
              <TextInput
                style={[styles.input, styles.flex1]}
                value={newKeyword}
                onChangeText={setNewKeyword}
                placeholder="Add keyword"
              />
              <TouchableOpacity
                style={styles.addKeywordButton}
                onPress={() => addKeyword(skill.id, skill.keywords)}>
                <Text style={styles.addKeywordText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeSkill(skill.id)}>
            <Text style={styles.deleteButtonText}>Remove Skill</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addNewSkill}>
        <Text style={styles.addButtonText}>+ Add Skill</Text>
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
  skillCard: {
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
  levelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
  },
  levelButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
  },
  selectedLevel: {
    backgroundColor: '#007AFF',
  },
  levelText: {
    color: '#333',
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  selectedLevelText: {
    color: 'white',
  },
  keywordsContainer: {
    gap: 8,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keyword: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 4,
  },
  keywordText: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  addKeywordRow: {
    flexDirection: 'row',
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  addKeywordButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addKeywordText: {
    color: 'white',
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.BOLD,
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
