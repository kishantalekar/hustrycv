import {ResumeProgress} from '@/components/ResumeProgress/ResumeProgress';
import {useResumeStore} from '@/store/useResumeStore';
import {createInitialResume} from '@/types';
import {navigate} from '@/utils/navigation';
import {calculateProgress, getCompletionStatus} from '@/utils/resumeUtils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Dashboard.styles';

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {setActiveResume, resumes, addResume} = useResumeStore();

  const handleResumePress = (resumeId: string) => {
    setActiveResume(resumeId);
    navigation.navigate('ResumeEditor');
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreateResumePress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCreateManual = () => {
    const newResume = createInitialResume();
    addResume(newResume);
    const id = newResume.metadata.id;
    setActiveResume(id);
    navigate('ResumeEditor');
    setShowDropdown(false);
  };

  const handleCreateWithAI = () => {
    // TODO: Implement AI resume creation
    setShowDropdown(false);
  };

  const handleUploadResume = () => {
    // TODO: Implement resume upload
    console.log('Upload Resume');
    navigate('UploadResume');
    setShowDropdown(false);
  };

  const renderResumeItem = ({item}: {item: (typeof resumes)[0]}) => {
    const lastModified = new Date(item.metadata.updatedAt).toLocaleDateString();
    const progress = calculateProgress(item);
    const status = getCompletionStatus(progress);

    return (
      <TouchableOpacity
        style={styles.resumeCard}
        activeOpacity={0.7}
        onPress={() => handleResumePress(item.metadata.id)}>
        <View style={styles.resumePreview}>
          <ResumeProgress resume={item} status={status} />
        </View>
        <View style={styles.resumeInfo}>
          <Text style={styles.resumeName}>
            {item.basics.name || 'Untitled Resume'}
          </Text>
          <View style={styles.resumeMetaRow}>
            <Text style={styles.resumeDate}>Last modified: {lastModified}</Text>
            <Text style={styles.resumeTemplate}>
              Template: {item.metadata.templateId}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Resumes</Text>
        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateResumePress}>
            <Text style={styles.createButtonText}>Create New</Text>
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleCreateManual}>
                <Text style={styles.dropdownItemText}>Create Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleCreateWithAI}>
                <Text style={styles.dropdownItemText}>
                  Create Resume with AI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleUploadResume}>
                <Text style={styles.dropdownItemText}>Upload Resume</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={resumes}
        renderItem={renderResumeItem}
        keyExtractor={item => item.metadata.id}
        contentContainerStyle={styles.resumeList}
      />
    </View>
  );
};
