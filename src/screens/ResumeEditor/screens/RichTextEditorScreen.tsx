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
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TextInput} from '@/components/TextInput/TextInput';
import {COLORS} from '@/theme';
import {globalStyles} from '@/styles';

const genAI = new GoogleGenAI({apiKey: GOOGLE_GEMINI_API_KEY});

const generateAIContent = async (
  contentType: ContentType,
  activeResume: any,
  initialContent: string,
  additionalContext: string = '', // Added parameter for additional context
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

        // Add additional context if provided
        if (additionalContext) {
          context += `\nAdditional Context: ${additionalContext}`;
        }

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

          // Add additional context if provided
          if (additionalContext) {
            context += `\nAdditional Context: ${additionalContext}`;
          }

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

          // Add additional context if provided
          if (additionalContext) {
            context += `\nAdditional Context: ${additionalContext}`;
          }

          prompt = `Create 4 technical bullet points for this project: ${context}. Include:
  - Challenge faced and technical solution
  - Specific tools/tech used (include versions if relevant)
  - Measurable outcome or performance gains
  - Team role and collaboration aspects
  Format as HTML: <ul> with <li>. Use <strong> for technologies and metrics. Example:
  <li>Developed <strong>Python ETL pipeline</strong> reducing data processing time by 65%</li>
  if the project has skills then give like in this format <strong >Skills</strong> : skill1,skill2 and .. in appropriate format
  `;
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [additionalContext, setAdditionalContext] = useState('');
  const [hiddenToolBar, setHiddenToolBar] = useState(false);
  // Bottom sheet ref and snap points
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['80%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === 0);
  }, []);

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

  const handleAIGenerate = () => {
    setIsBottomSheetOpen(true);
    setHiddenToolBar(true);
    bottomSheetRef.current?.expand();
  };

  const handleGenerateWithContext = async () => {
    if (!activeResume) return;

    setIsGenerating(true);
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();

    try {
      const generatedContent = await generateAIContent(
        contentType,
        activeResume,
        initialContent,
        additionalContext,
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

  const getContextPlaceholder = () => {
    switch (contentType) {
      case 'professional_summary':
        return 'Add details about your career goals, industry focus, or specific achievements...';
      case 'project_description':
        return 'Add details about project challenges, your role, technologies used, or outcomes...';
      case 'work_description':
        return 'Add details about your responsibilities, achievements, team size, or technologies used...';
      default:
        return 'Add additional context for AI generation...';
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView style={globalStyles.keyboardAvoidingView}>
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
          <RichTextEditor editor={editor} hiddenToolbar={hiddenToolBar} />

          <BottomSheet
            ref={bottomSheetRef}
            index={isBottomSheetOpen ? 0 : -1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            onClose={() => {
              setHiddenToolBar(false);
            }}
            enablePanDownToClose
            backgroundStyle={{
              backgroundColor: COLORS.background.primary,
            }}
            handleIndicatorStyle={styles.handleIndicator}
            handleStyle={styles.handleStyle}
            style={styles.bottomSheet}>
            <BottomSheetView style={styles.bottomSheetContent}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={styles.bottomSheetTitle}>Enhance with AI</Text>
                <Text style={styles.bottomSheetDescription}>
                  Add details to make the content more specific
                </Text>
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={styles.contextInput}
                  placeholder={getContextPlaceholder()}
                  value={additionalContext}
                  onChangeText={setAdditionalContext}
                />
                <TouchableOpacity
                  style={styles.generateButton}
                  onPress={handleGenerateWithContext}>
                  <Text style={styles.generateButtonText}>
                    Generate With AI
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.background.primary,
  },
  bottomSheet: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    padding: 16,
  },
  handleIndicator: {
    backgroundColor: COLORS.border,
    width: 40,
    height: 4,
  },
  handleStyle: {
    backgroundColor: COLORS.background.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.text.primary,
  },
  bottomSheetDescription: {
    fontSize: 14,
    marginBottom: 16,
    color: COLORS.text.secondary,
  },
  contextInput: {
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: COLORS.background.primary,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonText: {
    color: COLORS.text.light,
    fontWeight: '500',
    fontSize: 16,
  },
});
