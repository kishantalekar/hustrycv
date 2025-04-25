import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/AppNavigator';
import {navigate} from '../../utils/navigation';
import {BORDER_RADIUS, COLORS, SHADOW, SPACING, typography} from '../../theme';

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
    backgroundColor: COLORS.background.primary,
    padding: SPACING.lg,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    ...typography.h1,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  createButtonText: {
    color: COLORS.white,
    ...typography.button,
  },
  resumeList: {
    gap: SPACING.lg,
  },
  resumeCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  resumePreview: {
    height: 120,
    backgroundColor: COLORS.preview,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: COLORS.text.secondary,
    ...typography.body1,
  },
  resumeInfo: {
    padding: SPACING.md,
  },
  resumeName: {
    fontSize: 18,
    fontFamily: typography.h1.fontFamily,
    marginBottom: SPACING.xs,
  },
  resumeDate: {
    ...typography.body2,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  resumeTemplate: {
    ...typography.body2,
    color: COLORS.text.secondary,
  },
});
