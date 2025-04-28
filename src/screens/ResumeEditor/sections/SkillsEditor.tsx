import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Card, TextInput, Button, Chip, Text} from 'react-native-paper';
import {FONTS} from '../../../constants/fonts';
import {useResumeStore} from '../../../store/useResumeStore';

export const SkillsEditor = () => {
  const {getActiveResume, addSkill, updateSkill, removeSkill} =
    useResumeStore();
  const [newKeyword, setNewKeyword] = useState('');
  const skills = getActiveResume().sections.skills;
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle} variant="headlineMedium">
          Skills
        </Text>

        {skills.items?.map(skill => (
          <Card key={skill.id} style={styles.skillCard}>
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Skill Name"
                placeholder="e.g., Programming Languages"
                style={styles.input}
                value={skill.name}
                onChangeText={text => updateSkill(skill.id, {name: text})}
              />
              <Text style={styles.label}>Level:</Text>
              <View style={styles.levelSelector}>
                {['beginner', 'intermediate', 'advanced'].map(level => (
                  <Chip
                    key={level}
                    selected={skill.level === level}
                    onPress={() => updateSkill(skill.id, {level})}
                    style={styles.levelChip}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Chip>
                ))}
              </View>

              <View style={styles.keywordsContainer}>
                <Text style={styles.label}>Keywords:</Text>
                <View style={styles.keywordsList}>
                  {skill.keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      onClose={() =>
                        removeKeyword(skill.id, skill.keywords, index)
                      }
                      style={styles.keyword}>
                      {keyword}
                    </Chip>
                  ))}
                </View>
                <View style={styles.addKeywordRow}>
                  <TextInput
                    mode="outlined"
                    label="Add keyword"
                    style={[styles.input, styles.flex1]}
                    value={newKeyword}
                    onChangeText={setNewKeyword}
                  />
                  <Button
                    mode="contained"
                    onPress={() => addKeyword(skill.id, skill.keywords)}
                    style={styles.addButton}>
                    Add
                  </Button>
                </View>
              </View>
              <Button
                mode="outlined"
                icon="delete"
                onPress={() => removeSkill(skill.id)}
                style={styles.deleteButton}>
                Remove Skill
              </Button>
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="contained"
          icon="plus"
          onPress={addNewSkill}
          style={styles.addSkillButton}>
          Add Skill
        </Button>
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
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 24,
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },
  skillCard: {
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  levelSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  levelChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 8,
  },
  keywordsContainer: {
    marginTop: 16,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  keyword: {
    marginRight: 8,
    marginBottom: 8,
  },
  addKeywordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
  },
  deleteButton: {
    marginTop: 8,
  },
  addButton: {
    marginLeft: 8,
  },
  addSkillButton: {
    marginTop: 16,
    marginBottom: 24,
  },
});
