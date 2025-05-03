import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '@/components/Header';
import {globalStyles} from '@/styles/globalStyles';
import {styles} from './FormScreen.styles';
import {navigate} from '../../../utils/navigation';

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
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={styles.container}>
        <Header title="My Resume" leftIcon="home" iconVariant="octicon" />
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
