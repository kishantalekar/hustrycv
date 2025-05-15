import {ResumePreview, TemplateSelector} from '@/components';
import {FONTS} from '@/constants';
import {posthog} from '@/analytics/posthog/PostHog';
import {useResumeStore} from '@/store/useResumeStore';
import {useAppStore} from '@/store/useAppStore';
import {
  getModernResumeHTML,
  getProfessionalResumeHTML,
  getTechnicalResumeHTML,
  getTemplateById,
} from '@/templates';
import {COLORS} from '@/theme';
import {goBack} from '@/utils/navigation';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const resumeTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    image: require('../../assets/templates/professional.png'),
    getHTML: getProfessionalResumeHTML,
  },
  {
    id: 'technical',
    name: 'Technical',
    image: require('../../assets/templates/technical.png'),
    getHTML: getTechnicalResumeHTML,
  },
  // {
  //   id: 'minimalist',
  //   name: 'Minimalist',
  //   image: require('../../assets/templates/minimalist.png'),
  //   getHTML: getMinimalistResumeHTML,
  // },
  {
    id: 'modern',
    name: 'Modern',
    image: require('../../assets/templates/minimalist.png'),
    getHTML: getModernResumeHTML,
  },
];
export const PreviewScreen = () => {
  const {resumes, activeResumeId, updateResumeTemplateId} = useResumeStore();
  const {userName} = useAppStore();
  const activeResume = resumes.find(
    resume => resume.metadata.id === activeResumeId,
  );
  const templateId = activeResume?.metadata?.templateId;
  const defaultTemplate = getTemplateById(templateId);
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate.id);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    updateResumeTemplateId(templateId);
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();

    // Track template selection
    posthog.capture('template_selected', {
      template_id: templateId,
      resume_id: activeResumeId,
      previous_template: defaultTemplate.id,
      user_name: userName || 'Anonymous',
    });
  };

  const snapPoints = useMemo(() => ['40%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === 0);

    // Track bottom sheet interactions
    posthog.capture('template_selector_interaction', {
      action: index === 0 ? 'open' : 'close',
      resume_id: activeResumeId,
      user_name: userName || 'Anonymous',
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
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
        selectedTemplate={selectedTemplate}
        templates={resumeTemplates}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={isBottomSheetOpen ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: COLORS.background.primary,
        }}
        handleIndicatorStyle={{
          backgroundColor: COLORS.border,
          width: 40,
          height: 4,
        }}
        handleStyle={{
          backgroundColor: COLORS.background.primary,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          paddingVertical: 10,
        }}
        style={styles.bottomSheet}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
            templates={resumeTemplates}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 46,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  templateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  templateButtonText: {
    color: COLORS.text.light,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 14,
  },
});
