/**
 * PreviewScreen — Phase 6.1 polish
 *
 * Changes from the old implementation:
 *  - Uses `selectActiveResume` typed selector instead of `getActiveResume()` + navigation.addListener
 *  - Derives defaultTemplate from the Zustand selector (no local useState for it)
 *  - Cleans up unused imports
 */

import {posthog} from '@/analytics/posthog/PostHog';
import {ResumePreview, TemplateSelector} from '@/components';
import {useAppStore} from '@/store/useAppStore';
import {useResumeStore} from '@/store/useResumeStore';
import {selectActiveResume} from '@/store/selectors/resumeSelectors';
import {globalStyles} from '@/styles';
import {getTemplateById, resumeTemplates} from '@/templates';
import {COLORS} from '@/theme';
import {goBack} from '@/utils/navigation';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './PreviewScreen.styles';

export const PreviewScreen = () => {
  const activeResume = useResumeStore(selectActiveResume);
  const {activeResumeId, updateResumeTemplateId} = useResumeStore();
  const {userName} = useAppStore();

  // Derive current template from resume metadata; default to 'professional'
  const defaultTemplateId = activeResume?.metadata?.templateId ?? 'professional';
  const [selectedTemplateId, setSelectedTemplateId] = useState(defaultTemplateId);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['85%'], []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    updateResumeTemplateId(templateId);
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();

    posthog.capture('template_selected', {
      template_id: templateId,
      resume_id: activeResumeId,
      previous_template: defaultTemplateId,
      user_name: userName ?? 'Anonymous',
    });
  };

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === 0);
    posthog.capture('template_selector_interaction', {
      action: index === 0 ? 'open' : 'close',
      resume_id: activeResumeId,
      user_name: userName ?? 'Anonymous',
    });
  }, [activeResumeId, userName]);

  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView style={globalStyles.keyboardAvoidingView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back to Editor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsBottomSheetOpen(true)}
            style={styles.templateButton}>
            <Text style={styles.templateButtonText}>Change Template</Text>
          </TouchableOpacity>
        </View>

        <ResumePreview
          resumeData={activeResume}
          selectedTemplate={selectedTemplateId}
          templates={resumeTemplates}
        />

        <BottomSheet
          ref={bottomSheetRef}
          index={isBottomSheetOpen ? 0 : -1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backgroundStyle={{backgroundColor: COLORS.background.primary}}
          handleIndicatorStyle={styles.handleIndicator}
          handleStyle={styles.handleStyle}
          style={styles.bottomSheet}>
          <BottomSheetScrollView style={styles.bottomSheetContent}>
            <TemplateSelector
              selectedTemplate={selectedTemplateId}
              onSelectTemplate={handleTemplateSelect}
              templates={resumeTemplates}
            />
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
