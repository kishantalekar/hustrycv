import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from '@/components';
import {HTMLPreview} from '@/components/HTMLPreview/HTMLPreview';
import {TextInput} from '@/components/TextInput';
import {AppNavigationProp} from '@/navigation/AppNavigator';
import {useResumeStore} from '@/store/useResumeStore';
import {WorkExperienceCard} from './components/WorkExperienceCard';
import {styles} from './WorkExperienceEditor.styles';

export const WorkExperienceEditor = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const {
    getActiveResume,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
  } = useResumeStore();
  const workExperience = getActiveResume().sections.work;
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
      style={styles.keyboardAvoidingView}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {workExperience?.items.map(experience => (
            <WorkExperienceCard
              key={experience.id}
              experience={experience}
              toggleExpand={toggleExpand}
              expandedItems={expandedItems}
              navigation={navigation}
              updateWorkExperience={updateWorkExperience}
              removeWorkExperience={removeWorkExperience}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Button
            title="Add New Experience"
            onPress={() => {
              const id = addWorkExperience({
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
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
