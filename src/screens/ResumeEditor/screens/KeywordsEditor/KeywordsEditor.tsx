import React, {useState} from 'react';
import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '@/components';
import {Header} from '@/components/Header';
import {KeywordItem} from '@/components/KeywordItem';
import {TextInput} from '@/components/TextInput';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {styles} from './KeywordsEditor.styles';

interface KeywordsEditorProps {
  route: {
    params: {
      id: string;
      type: 'project' | 'work';
    };
  };
  navigation: any;
}

export function KeywordsEditor({route}: Readonly<KeywordsEditorProps>) {
  const {id, type} = route.params;
  const [newKeyword, setNewKeyword] = useState('');

  const {updateProject, updateWorkExperience, getActiveResume} =
    useResumeStore();
  const {projects, work} = getActiveResume().sections;
  const item =
    type === 'project'
      ? projects.items.find(p => p.id === id)
      : work.items.find(w => w.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
      </View>
    );
  }

  const keywords = item.keywords || [];

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) {
      return;
    }

    const updatedKeywords = [...keywords, newKeyword.trim()];
    if (type === 'project') {
      updateProject(id, {...item, keywords: updatedKeywords});
    } else {
      updateWorkExperience(id, {...item, keywords: updatedKeywords});
    }
    setNewKeyword('');
  };

  const handleRemoveKeyword = (index: number) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    if (type === 'project') {
      updateProject(id, {...item, keywords: updatedKeywords});
    } else {
      updateWorkExperience(id, {...item, keywords: updatedKeywords});
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView style={globalStyles.keyboardAvoidingView}>
        <View style={styles.container}>
          <Header
            title={type === 'project' ? 'Project Skills' : 'Work Skills'}
          />

          <ScrollView style={styles.content}>
            <View style={styles.keywordsContainer}>
              {keywords.length === 0 ? (
                <Text style={styles.emptyText}>
                  No skills added yet. Add your first skill below!
                </Text>
              ) : (
                keywords.map((keyword, index) => (
                  <KeywordItem
                    key={index}
                    keyword={keyword}
                    onRemove={() => handleRemoveKeyword(index)}
                  />
                ))
              )}
            </View>
            <View style={styles.footer}>
              <TextInput
                label="Add Skill"
                value={newKeyword}
                onChangeText={setNewKeyword}
                onSubmitEditing={handleAddKeyword}
                returnKeyType="done"
                placeholder="Enter a skill"
              />
              <Button
                title="Add"
                onPress={handleAddKeyword}
                disabled={!newKeyword.trim()}
                variant="primary"
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
