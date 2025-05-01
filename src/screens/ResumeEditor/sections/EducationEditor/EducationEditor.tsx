import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from '@/components';
import {TextInput} from '@/components/TextInput';
import {FONTS} from '@/constants';
import {AppNavigationProp} from '@/navigation/AppNavigator';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {EducationCard} from './EducationCard';
import {styles} from './EducationEditor.styles';

export const EducationEditor = () => {
  const {getActiveResume, addEducation, updateEducation, removeEducation} =
    useResumeStore();
  const education = getActiveResume().sections.education;
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {education?.items?.map(edu => (
            <EducationCard
              key={edu.id}
              edu={edu}
              toggleExpand={toggleExpand}
              expandedItems={expandedItems}
              updateEducation={updateEducation}
              removeEducation={removeEducation}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Button
            title="Add New Education"
            onPress={() => {
              const id = addEducation({
                institution: '',
                degree: '',
                startDate: '',
                endDate: '',
                gpa: '',
              });
              setExpandedItems(prev => ({
                ...prev,
                [id]: true,
              }));
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
