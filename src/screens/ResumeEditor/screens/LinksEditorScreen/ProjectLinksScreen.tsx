import {Button} from '@/components';
import {Header} from '@/components/Header';
import {IconSelector} from '@/components/IconSelector/IconSelector';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {COLORS} from '@/theme';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {v4 as uuidv4} from 'uuid';
import {LinkEditorCard} from './LinkEditorCard';
import {styles} from './LinksEditorScreen.styles';

interface ProjectConfigScreenProps {
  route: {
    params: {
      id: string;
    };
  };
  navigation: any;
}

export function ProjectLinksScreen({
  route,
}: Readonly<ProjectConfigScreenProps>) {
  const {id} = route.params;
  const {activeResumeId, resumes, updateProject} = useResumeStore();
  const activeResume = resumes.find(r => r.metadata.id === activeResumeId);

  const project = activeResume?.sections.projects?.items?.find(
    p => p.id === id,
  );
  const projectLinks = project?.links;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<{
    index: number;
    link: LinkItem;
  } | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsIconSelectorOpen(index === 0);
  }, []);

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: uuidv4(),
      label: '',
      url: '',
      icon: 'link',
    };
    updateProject(id, {
      ...project,
      links: [...(projectLinks || []), newLink],
    });
    setExpandedId(newLink.id);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleUpdateLink = (index: number, updatedLink: LinkItem) => {
    const newLinks = [...(project?.links || [])];
    newLinks[index] = updatedLink;
    updateProject(id, {
      ...project,
      links: newLinks,
    });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = [...(project?.links || [])];
    newLinks.splice(index, 1);
    updateProject(id, {
      ...project,
      links: newLinks,
    });
  };

  const handleSelectIcon = (icon: string, variant: string) => {
    if (editingLink) {
      handleUpdateLink(editingLink.index, {
        ...editingLink.link,
        icon,
        iconVariant: variant as any,
      });
    }
    setIsIconSelectorOpen(false);
  };

  const openIconSelector = (index: number, link: LinkItem) => {
    setEditingLink({index, link});
    setIsIconSelectorOpen(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Header title="Project Links" />
          <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
              {(project?.links || []).map((link, index) => (
                <LinkEditorCard
                  key={link.id}
                  link={link}
                  index={index}
                  toggleExpand={toggleExpand}
                  expanded={expandedId === link.id}
                  handleUpdateLink={handleUpdateLink}
                  handleRemoveLink={handleRemoveLink}
                  openIconSelector={openIconSelector}
                />
              ))}

              <Button
                variant="outline"
                title="Add Link"
                onPress={handleAddLink}
              />
            </View>
          </ScrollView>
          <BottomSheet
            ref={bottomSheetRef}
            index={isIconSelectorOpen ? 0 : -1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
            backgroundStyle={{
              backgroundColor: COLORS.background.primary,
            }}
            handleIndicatorStyle={styles.bottomSheetHandleIndicationStyles}
            handleStyle={styles.bottomSheethandleStyle}
            style={styles.bottomSheet}>
            <BottomSheetView style={styles.bottomSheetContent}>
              <IconSelector
                onSelect={handleSelectIcon}
                onClose={() => bottomSheetRef.current?.close()}
              />
            </BottomSheetView>
          </BottomSheet>
        </SafeAreaView>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
}
