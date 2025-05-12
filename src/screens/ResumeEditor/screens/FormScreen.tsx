import {Header} from '@/components/Header';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../../utils/navigation';
import {styles} from './FormScreen.styles';

interface SectionsInterface {
  id: string;
  title: string;
  screenName: string;
}

const sections: SectionsInterface[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    screenName: 'PersonalInfo',
  },
  {
    id: 'experience',
    title: 'Work Experience',
    screenName: 'Experience',
  },
  {
    id: 'education',
    title: 'Education',
    screenName: 'Education',
  },
  {
    id: 'skills',
    title: 'Skills',
    screenName: 'Skills',
  },
  {
    id: 'projects',
    title: 'Projects',
    screenName: 'Projects',
  },
  {
    id: 'certifications',
    title: 'Certifications',
    screenName: 'Certifications',
  },
];

const FormScreen = () => {
  const {updateMetadata, getActiveResume} = useResumeStore();
  const activeResume = getActiveResume();
  const metadata = activeResume.metadata;
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={styles.container}>
        <Header
          title={metadata?.title?.length ? metadata.title : 'My Resume'}
          leftIcon="home"
          iconVariant="octicon"
          editable
          onTitleChange={newTitle => updateMetadata({title: newTitle})}
        />
        <View style={styles.sectionsContainer}>
          {sections.map(section => (
            <TouchableOpacity
              key={section.id}
              style={styles.sectionButton}
              onPress={() => navigate(section.screenName)}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormScreen;
