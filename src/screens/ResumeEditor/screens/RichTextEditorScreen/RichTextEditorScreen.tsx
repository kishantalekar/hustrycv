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
  ScrollView,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './RichTextEditorScreen.styles';
import {
  generateAIContent,
  getInitialContent,
} from './RichTextEditorScreen.utils';
import {useTextAnalysis} from '@/hooks/useTextAnalysis';
import {useAITransform, TransformAction} from '@/hooks/useAITransform';

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

  const [currentHtml, setCurrentHtml] = useState(initialContent);
  const {issues, isAnalyzing} = useTextAnalysis(currentHtml);
  const {status: transformStatus, result: transformResult, transformText, accept: acceptTransform, discard: discardTransform} = useAITransform();

  const handleTransformAction = (action: TransformAction) => {
    transformText(action, currentHtml);
  };

  const handleAcceptTransform = () => {
    if (transformResult?.transformed) {
      editor.setContent(transformResult.transformed);
      setCurrentHtml(transformResult.transformed);
      handleContentChange(transformResult.transformed);
    }
    acceptTransform();
    bottomSheetRef.current?.close();
  };

  const handleDiscardTransform = () => {
    discardTransform();
  };

  const editor = useEditorBridge({
    autofocus: true,
    initialContent: initialContent,
    onChange: () => {
      if (handleContentChange && editor) {
        editor.getHTML().then(html => {
          setCurrentHtml(html);
          return handleContentChange(html);
        });
      }
    },
    bridgeExtensions: TenTapStartKit,
  });

  const handleFixIssue = (issue: any) => {
    if (issue.replacementText && activeResume) {
      const regex = new RegExp(`\\b${issue.originalText}\\b`, 'i');
      const newHtml = currentHtml.replace(regex, issue.replacementText);
      editor.setContent(newHtml);
      setCurrentHtml(newHtml);
      handleContentChange(newHtml);
    }
  };

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

          {issues.length > 0 && !hiddenToolBar && (
            <View style={{height: 50, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.background.secondary}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems: 'center', paddingHorizontal: 10}}>
                {issues.map(issue => (
                  <TouchableOpacity
                    key={issue.id}
                    onPress={() => handleFixIssue(issue)}
                    style={{
                      marginHorizontal: 5,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor: issue.severity === 'error' ? COLORS.danger : (issue.severity === 'warning' ? '#F59E0B' : COLORS.primary),
                    }}>
                    <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{issue.message}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

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
                <Text style={styles.bottomSheetTitle}>AI Assistant</Text>
                
                {transformStatus === 'idle' && (
                  <>
                    <Text style={styles.bottomSheetDescription}>
                      Choose an action to improve your content instantly:
                    </Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 15}}>
                      <Button title="✨ Rewrite" onPress={() => handleTransformAction('rewrite')} />
                      <Button title="✂️ Shorten" onPress={() => handleTransformAction('shorten')} />
                      <Button title="📝 Expand" onPress={() => handleTransformAction('expand')} />
                      <Button title="📊 Quantify" onPress={() => handleTransformAction('quantify')} />
                    </View>
                  </>
                )}

                {transformStatus === 'loading' && (
                  <View style={{padding: 20, alignItems: 'center'}}>
                    <Text style={{color: COLORS.text.secondary, fontSize: 16}}>✨ AI is thinking...</Text>
                  </View>
                )}

                {transformStatus === 'preview' && transformResult && (
                  <View style={{marginTop: 15}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, color: COLORS.text.secondary}}>Original:</Text>
                    <Text style={{color: COLORS.text.secondary, marginBottom: 15}} numberOfLines={3}>{transformResult.original.replace(/<[^>]*>?/gm, '')}</Text>
                    
                    <Text style={{fontWeight: 'bold', marginBottom: 5, color: COLORS.primary}}>AI Suggestion:</Text>
                    <Text style={{color: COLORS.text.primary, marginBottom: 20, fontSize: 16}}>{transformResult.transformed}</Text>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 10}}>
                      <View style={{flex: 1}}>
                        <Button title="Discard" variant="outline" onPress={handleDiscardTransform} />
                      </View>
                      <View style={{flex: 1}}>
                        <Button title="Accept" variant="primary" onPress={handleAcceptTransform} />
                      </View>
                    </View>
                  </View>
                )}
              </KeyboardAvoidingView>
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
