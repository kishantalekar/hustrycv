import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {FONTS} from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/AppNavigator';
import {navigate} from '../../utils/navigation';

interface ResumeItem {
  id: string;
  name: string;
  lastModified: string;
  template: string;
}

const mockResumes: ResumeItem[] = [
  {
    id: '1',
    name: 'Software Engineer Resume',
    lastModified: '2024-01-20',
    template: 'Professional',
  },
  {
    id: '2',
    name: 'Frontend Developer Resume',
    lastModified: '2024-01-19',
    template: 'Modern',
  },
];

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderResumeItem = ({item}: {item: ResumeItem}) => (
    <TouchableOpacity
      style={styles.resumeCard}
      onPress={() => navigation.navigate('ResumeEditor', {resumeId: item.id})}>
      <View style={styles.resumePreview}>
        <Text style={styles.previewText}>Preview</Text>
      </View>
      <View style={styles.resumeInfo}>
        <Text style={styles.resumeName}>{item.name}</Text>
        <Text style={styles.resumeDate}>
          Last modified: {item.lastModified}
        </Text>
        <Text style={styles.resumeTemplate}>Template: {item.template}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Resumes</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigate('ResumeEditor')}>
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockResumes}
        renderItem={renderResumeItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.resumeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.FIRA_SANS.BOLD,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
  },
  resumeList: {
    gap: 16,
  },
  resumeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resumePreview: {
    height: 120,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: '#666',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  resumeInfo: {
    padding: 12,
  },
  resumeName: {
    fontSize: 18,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: 4,
  },
  resumeDate: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    marginBottom: 2,
  },
  resumeTemplate: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
  },
});
