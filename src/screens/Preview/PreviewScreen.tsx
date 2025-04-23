import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {FONTS} from '../../constants';
import ResumePreview from '../../components/ResumePreview/ResumePreview';
import {useResumeStore} from '../../store/useResumeStore';
import {goBack} from '../../utils/navigation';

export const PreviewScreen = () => {
  const resumeData = useResumeStore();
  console.log(resumeData.basics);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Editor</Text>
        </TouchableOpacity>
      </View>
      <ResumePreview resumeData={resumeData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
});
