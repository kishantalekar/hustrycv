import {Button} from '@/components';
import {Header} from '@/components/Header';
import {IconSelector} from '@/components/IconSelector/IconSelector';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {COLORS} from '@/theme';
import {LinkItem} from '@/types';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {v4 as uuidv4} from 'uuid';
import {LinkEditorCard} from '../LinksEditorScreen/LinkEditorCard';
import {styles} from './SocialProfileScreen.styles';

export const SocialProfilesScreen = () => {
  const {getActiveResume, updateBasics} = useResumeStore();
  const basics = getActiveResume().basics;
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
  const socials = basics.socials || [];

  const handleUpdateSocial = (index: number, updatedLink: LinkItem) => {
    const updatedSocials = [...socials];
    updatedSocials[index] = updatedLink;
    updateBasics({socials: updatedSocials});
  };

  const handleDeleteSocial = (index: number) => {
    const updatedSocials = socials.filter((_, i) => i !== index);
    updateBasics({socials: updatedSocials});
  };

  const handleAddSocial = () => {
    const newSocial: LinkItem = {
      id: uuidv4(),
      url: '',
      label: '',
      icon: 'link',
      iconVariant: 'material',
    };
    updateBasics({socials: [...socials, newSocial]});
    setExpandedId(newSocial.id);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSelectIcon = (icon: string, variant: string) => {
    if (editingLink) {
      handleUpdateSocial(editingLink.index, {
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
        <SafeAreaView style={styles.container}>
          <Header title="Social Profiles" />
          <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
              {socials.map((social, index) => (
                <LinkEditorCard
                  key={social.id}
                  link={social}
                  index={index}
                  expanded={expandedId === social.id}
                  toggleExpand={toggleExpand}
                  handleRemoveLink={handleDeleteSocial}
                  handleUpdateLink={handleUpdateSocial}
                  openIconSelector={openIconSelector}
                />
              ))}

              <Button
                variant="outline"
                title="Add Social Link"
                onPress={handleAddSocial}
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
};
