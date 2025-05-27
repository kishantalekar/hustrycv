/* eslint-disable react-native/no-inline-styles */
import {LottieAnimation} from '@/components';
import {Header} from '@/components/Header';
import {RichTextEditor} from '@/components/RichTextEditor/RichTextEditor';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {RootScreens} from '@/navigation/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {GOOGLE_GEMINI_API_KEY} from '@/utils/apiKeys';
import {extractHtmlFromCodeBlock} from '@/utils/regex';
import {TenTapStartKit, useEditorBridge} from '@10play/tentap-editor';
import {GoogleGenAI} from '@google/genai';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const genAI = new GoogleGenAI({apiKey: GOOGLE_GEMINI_API_KEY});

const generateAIContent = async (
  contentType: ContentType,
  activeResume: any,
  initialContent: string, // Added initialContent parameter
  itemId?: string,
) => {
  try {
    let prompt = '';
    let context = '';
    // console.log('started');
    switch (contentType) {
      case 'professional_summary':
        context = `Name: ${
          activeResume.basics.name
        }\nSkills: ${activeResume.sections.skills.items
          .map((s: any) => s.name)
          .join(', ')}\nWork Experience: ${activeResume.sections.work.items
          .map((w: any) => w.position + ' at ' + w.company)
          .join(', ')}\nExisting Summary: ${initialContent}`;
        prompt = `You are a professional resume writer. Create a concise professional summary (3-4 lines max) using this context: ${context}. Focus on:
  - Core competencies matching job requirements
  - Years of experience in primary field
  - Key career achievements/metrics
  - Industry-specific expertise
  ${
    initialContent
      ? 'Refine existing summary, remove fluff, and strengthen impact.'
      : ''
  }
  Format as Html. Use serial commas and avoid pronouns. Example:
  "<p>Full-stack developer with 5+ years experience building scalable web applications...</p>"`;
        break;

      case 'work_description':
        const workItem = activeResume.sections.work.items.find(
          (item: any) => item.id === itemId,
        );
        if (workItem) {
          context = `Position: ${workItem.position}\nCompany: ${
            workItem.company
          }\nDuration: ${workItem.startDate} to ${
            workItem.endDate || 'Present'
          }\nSkills: ${activeResume.sections.skills.items
            .map((s: any) => s.name)
            .join(', ')}\nExisting Description: ${initialContent}`;
          prompt = `As a resume expert, generate 4-5 STRONG bullet points for this role: ${context}. Follow:
  1. Start with action verbs (Led, Engineered, Optimized)
  2. Focus on quantifiable achievements (not duties)
  3. Include technical specifics and business impact
  4. Prioritize metrics (% improvements, $ amounts, time savings)
  5. Remove generic statements
  ${initialContent ? 'Revise existing bullets to meet above criteria' : ''}
  Format as HTML: <ul> with <li> bullets. Only use <strong> for numbers/metrics. Example:
  <li>Increased conversion rates by 40% through <strong>React performance optimization</strong></li>`;
        }
        break;

      case 'project_description':
        const projectItem = activeResume.sections.projects.items.find(
          (item: any) => item.id === itemId,
        );
        if (projectItem) {
          context = `Project: ${
            projectItem.name
          }\nTechnologies: ${projectItem.keywords.join(', ')}\nDuration: ${
            projectItem.startDate
          } to ${
            projectItem.endDate || 'Present'
          }\nExisting Description: ${initialContent}`;
          prompt = `Create 4 technical bullet points for this project: ${context}. Include:
  - Challenge faced and technical solution
  - Specific tools/tech used (include versions if relevant)
  - Measurable outcome or performance gains
  - Team role and collaboration aspects
  Format as HTML: <ul> with <li>. Use <strong> for technologies and metrics. Example:
  <li>Developed <strong>Python ETL pipeline</strong> reducing data processing time by 65%</li>`;
        }
        break;
    }

    if (!prompt) return '';
    // console.log('prompt', prompt);
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    // console.log('result', result.text);
    return extractHtmlFromCodeBlock(result?.text || '') || '';
    // return '';
  } catch (error) {
    console.error('Error generating AI content:', error);
    return '';
  }
};

export type ContentType =
  | 'professional_summary'
  | 'project_description'
  | 'work_description';

type Props = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.RICH_TEXT_EDITOR
>;

export const RichTextEditorScreen = ({route, navigation}: Props) => {
  const {contentType, itemId} = route.params;
  const {updateBasics, updateWorkExperience, updateProject, getActiveResume} =
    useResumeStore();
  const activeResume = getActiveResume();
  const [isGenerating, setIsGenerating] = useState(false);
  // const [initialContent, setInitialContent] = useState('');

  const getInitialContent = () => {
    if (!activeResume) {
      return '';
    }

    switch (contentType) {
      case 'professional_summary':
        return activeResume.basics.summary ?? '';
      case 'project_description':
        return (
          activeResume.sections.projects?.items.find(item => item.id === itemId)
            ?.description ?? ''
        );
      case 'work_description':
        return (
          activeResume.sections.work.items.find(item => item.id === itemId)
            ?.description ?? ''
        );
      default:
        return '';
    }
  };
  const initialContent = getInitialContent();

  const editor = useEditorBridge({
    autofocus: true,
    initialContent: initialContent,
    onChange: () => {
      if (handleContentChange && editor) {
        editor.getHTML().then(html => {
          return handleContentChange(html);
        });
      }
    },
    bridgeExtensions: TenTapStartKit,
  });
  const handleAIGenerate = async () => {
    if (!activeResume) return;

    setIsGenerating(true);
    try {
      const generatedContent = await generateAIContent(
        contentType,
        activeResume,
        initialContent, // Pass initialContent here
        itemId,
      );
      if (generatedContent) {
        handleContentChange(generatedContent);
        editor.setContent(generatedContent);
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContentChange = (text: string) => {
    if (!activeResume || !text) {
      return;
    }

    try {
      switch (contentType) {
        case 'professional_summary':
          updateBasics({summary: text});
          break;
        case 'project_description':
          if (itemId) {
            updateProject(itemId, {description: text});
          }
          break;
        case 'work_description':
          if (itemId) {
            updateWorkExperience(itemId, {description: text});
          }
          break;
        default:
          console.warn('Unhandled content type:', contentType);
      }
    } catch (error) {
      console.error('Error updating content:', error);
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
        onRightPress={() => navigation.goBack()}
        customLeftComponent={
          <TouchableOpacity
            style={{width: 48, height: 48, marginRight: 20}}
            disabled={isGenerating}
            onPress={handleAIGenerate}>
            <LottieAnimation
              style={{width: 48, height: 48}}
              source={
                isGenerating
                  ? require('@/assets/animations/ai_twinkle_loading.json')
                  : require('@/assets/animations/ai_foriday.json')
              }
              autoPlay={isGenerating}
              loop={isGenerating}
            />
          </TouchableOpacity>
        }
      />
      <RichTextEditor editor={editor} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.background.primary,
  },
});
