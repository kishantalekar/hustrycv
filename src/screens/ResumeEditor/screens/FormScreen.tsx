import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FONTS} from '../../../constants/fonts';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: 20,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#666',
  },
});

export default FormScreen;
