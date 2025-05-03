import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '@/components/Header';
import {RichTextEditor} from '@/components/RichTextEditor/RichTextEditor';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {useResumeStore} from '@/store/useResumeStore';

export type ContentType =
  | 'professional_summary'
  | 'project_description'
  | 'work_description';

type Props = NativeStackScreenProps<RootStackParamList, 'RichTextEditor'>;

export const RichTextEditorScreen = ({route, navigation}: Props) => {
  const {initialContent, contentType, itemId} = route.params;
  const {updateBasics, updateWorkExperience} = useResumeStore();

  const handleContentChange = (text: string) => {
    switch (contentType) {
      case 'professional_summary':
        updateBasics({summary: text});
        break;
      case 'project_description':
        // Handle project description update
        break;
      case 'work_description':
        if (itemId) {
          updateWorkExperience(itemId, {description: text});
        }
        break;
      default:
        console.warn('Unknown content type:', contentType);
    }
  };

  const getTitle = () => {
    switch (contentType) {
      case 'professional_summary':
        return 'Professional Summary';
      case 'project_description':
        return 'Project Description';
      case 'work_description':
        return 'Work Experience';
      default:
        return 'Edit Content';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={getTitle()}
        // rightIcon="check"
        onRightPress={() => navigation.goBack()}
      />
      <RichTextEditor
        initialContent={initialContent}
        onChangeContent={handleContentChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.background.primary,
  },
});
