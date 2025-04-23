import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {EditorTabs} from './components/EditorTabs';
import {PersonalInfoEditor} from './sections/PersonalInfoEditor';

type EditorTab = 'personal' | 'summary' | 'experience' | 'education' | 'skills';

import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from '../../navigation/AppNavigator';
import {FONTS} from '../../constants';
import {WorkExperienceEditor} from './sections/WorkExperienceEditor';
import {SummaryEditor} from './sections/SummaryEditor';
import {EducationEditor} from './sections/EducationEditor';
import {SkillsEditor} from './sections/SkillsEditor';
import {useResumeStore} from '../../store/useResumeStore';
import ResumePreview from '../../components/ResumePreview/ResumePreview';
import {mockResumeData} from '../../assets/resume_mock_data';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResumeEditor'
>;
type RouteProps = RouteProp<RootStackParamList, 'ResumeEditor'>;

export const ResumeEditor = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const {width} = useWindowDimensions();
  const resumeData = useResumeStore();

  const isLargeScreen = width > 768;

  const [activeTab, setActiveTab] = useState<EditorTab>('personal');
  // Update renderSection
  const renderSection = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoEditor />;
      case 'summary':
        return <SummaryEditor />;
      case 'experience':
        return <WorkExperienceEditor />;
      case 'education':
        return <EducationEditor />;
      case 'skills':
        return <SkillsEditor />;
      default:
        return null;
    }
  };

  const {resumeId} = route.params ?? {};
  console.log(resumeId);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        {!isLargeScreen && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Preview', {resumeData})}
            style={styles.previewButton}>
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mainContent}>
        <View style={[styles.editorSection, isLargeScreen && {flex: 0.5}]}>
          <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <ScrollView style={styles.content}>
            <View>{renderSection()}</View>
          </ScrollView>
        </View>

        {isLargeScreen && (
          <View style={styles.previewSection}>
            <ResumePreview resumeData={resumeData} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 20, // Adjust this value as needed to move the content downwards
  },
  contentContainerStyle: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  editorSection: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  previewSection: {
    flex: 0.5,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  previewButton: {
    marginLeft: 'auto',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  previewButtonText: {
    color: 'white',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
  },
});
