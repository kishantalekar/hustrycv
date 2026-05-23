import {Button, Header, RichTextEditor, TextInput} from '@/components';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {RootScreens} from '@/navigation/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {COLORS} from '@/theme';
import {TenTapStartKit, useEditorBridge} from '@10play/tentap-editor';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './RichTextEditorScreen.styles';
import {
  generateAIContent,
  getInitialContent,
} from './RichTextEditorScreen.utils';

type Props = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.RICH_TEXT_EDITOR
>;

export const RichTextEditorScreen = ({route, navigation}: Props) => {
  const {contentType, itemId} = route.params;
  const {
    updateBasics,
    updateWorkExperience,
    updateProject,
    getActiveResume,
    updateReference,
  } = useResumeStore();
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

  const initialContent = getInitialContent(activeResume, contentType, itemId);

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
    if (!activeResume) {
      return;
    }

    setIsGenerating(true);
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();
    console.log('started');

    try {
      const generatedContent = await generateAIContent(
        contentType,
        activeResume,
        initialContent,
        additionalContext,
        itemId,
      );
      console.log('generated ai content', generateAIContent);
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
        case 'reference_description':
          if (itemId) {
            updateReference(itemId, {referenceText: text});
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
              <Button
                title="Ai Writer"
                variant="primary"
                onPress={handleAIGenerate}
                disabled={isGenerating}
                loading={isGenerating}
              />
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
