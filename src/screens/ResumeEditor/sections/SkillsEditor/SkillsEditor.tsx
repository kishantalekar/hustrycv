import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from '@/components';
import {TextInput} from '@/components/TextInput';
import {FONTS} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {SkillsCard} from './SkillsCard';
import {styles} from './SkillsEditor.styles';

export const SkillsEditor = () => {
  const {getActiveResume, addSkill, updateSkill, removeSkill} =
    useResumeStore();
  const skills = getActiveResume().sections.skills;
  const [expandedItemId, setExpandedItemId] = useState<string>('');

  const [newKeyword, setNewKeyword] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedItemId(
      prev => (prev === id ? '' : id), // prev === id? '' : prev
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {skills?.items.map(skill => (
            <SkillsCard
              key={skill.id}
              skill={skill}
              expandedItemId={expandedItemId}
              toggleExpand={toggleExpand}
              updateSkill={updateSkill}
              removeSkill={removeSkill}
              newKeyword={newKeyword}
              setNewKeyword={setNewKeyword}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Button
            title="Add New Skill"
            onPress={() => {
              const id = addSkill({
                name: '',
                level: 'intermediate',
                keywords: [],
              });
              setExpandedItemId(id);
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
