import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {Button} from '@/components';
import {AppNavigationProp} from '@/navigation/AppNavigator';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {ProjectCard} from './ProjectCard';
import {styles} from './ProjectsEditor.styles';

export const ProjectsEditor = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const {getActiveResume, addProject, updateProject, removeProject} =
    useResumeStore();
  const projects = getActiveResume().sections.projects;
  const [expandedItemId, setExpandedItemId] = useState<string>('');

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
          {projects?.items.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              expandedItemId={expandedItemId}
              toggleExpand={toggleExpand}
              updateProject={updateProject}
              removeProject={removeProject}
              navigation={navigation}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Button
            title="Add New Project"
            onPress={() => {
              const id = addProject({
                name: '',
                description: '',
                url: '',
              });
              setExpandedItemId(id);
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
