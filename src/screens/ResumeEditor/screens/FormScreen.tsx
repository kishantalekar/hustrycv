import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
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
    id: 'summary',
    title: 'Professional Summary',
    screenName: 'Summary',
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
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Resume Sections</Text>
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
  );
};

export default FormScreen;
