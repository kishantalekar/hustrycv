import {Button} from '@/components';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
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
                current: false,
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
