import {posthog} from '@/analytics/posthog/PostHog';
import {ResumePreview, TemplateSelector} from '@/components';
import {useAppStore} from '@/store/useAppStore';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {getProfessionalResumeHTML, getTemplateById} from '@/templates';
import {COLORS} from '@/theme';
import {goBack} from '@/utils/navigation';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './PreviewScreen.styles';

const resumeTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    image: require('../../assets/templates/professional.png'),
    getHTML: getProfessionalResumeHTML,
  },
  // {
  //   id: 'technical',
  //   name: 'Technical',
  //   image: require('../../assets/templates/technical.png'),
  //   getHTML: getTechnicalResumeHTML,
  // },
  // {
  //   id: 'minimalist',
  //   name: 'Minimalist',
  //   image: require('../../assets/templates/minimalist.png'),
  //   getHTML: getMinimalistResumeHTML,
  // },
  // {
  //   id: 'modern',
  //   name: 'Modern',
  //   image: require('../../assets/templates/minimalist.png'),
  //   getHTML: getModernResumeHTML,
  // },
];
export const PreviewScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {activeResumeId, updateResumeTemplateId, getActiveResume} =
    useResumeStore();
  const {userName} = useAppStore();
  const [activeResume, setActiveResume] = useState<Resume>();
  // const activeResume = getActiveResume();

  function loadResume() {
    setActiveResume(getActiveResume());
  }
  useEffect(() => {
    const subscribe = navigation.addListener('focus', loadResume);
    return subscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const defaultTemplate = getTemplateById(activeResume?.metadata?.templateId);
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
      user_name: userName ?? 'Anonymous',
    });
  };

  const snapPoints = useMemo(() => ['40%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === 0);

    // Track bottom sheet interactions
    posthog.capture('template_selector_interaction', {
      action: index === 0 ? 'open' : 'close',
      resume_id: activeResumeId,
      user_name: userName ?? 'Anonymous',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          handleIndicatorStyle={styles.handleIndicator}
          handleStyle={styles.handleStyle}
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
    </SafeAreaView>
  );
};
