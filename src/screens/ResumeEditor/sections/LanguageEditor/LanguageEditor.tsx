import {Button, TipsCard, TipSets} from '@/components';
import {Header} from '@/components/Header';
import {REORDER_TIPS_SHOWN, SWIPE_TIPS_SHOWN} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {selectLanguagesSection} from '@/store/selectors/resumeSelectors';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import React, {useCallback, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LanguageCard} from './LanguageCard';
import {styles} from './LanguageEditor.styles';

export const LanguageEditor = () => {
  const {
    addLanguage,
    updateLanguage,
    removeLanguage,
    updateAllLanguage,
  } = useResumeStore();

  const languages = useResumeStore(selectLanguagesSection);
  const [expandedItemId, setExpandedItemId] = useState<string>('');
  const [isDraggableListVisible, setIsDraggableListVisible] = useState(false);

  const toggleExpand = useCallback((id: string) => {
    setExpandedItemId(prev => (prev === id ? '' : id));
  }, []);

  const handleDragIconPress = useCallback(() => {
    setExpandedItemId('');
    setIsDraggableListVisible(prev => !prev);
  }, []);

  const renderItem = useCallback(
    ({item, drag, isActive}: {item: LanguageItem; drag: () => void; isActive: boolean}) => (
      <View style={styles.section}>
        <LanguageCard
          key={item.id}
          language={item}
          expandedItemId={expandedItemId}
          toggleExpand={toggleExpand}
          updateLanguage={updateLanguage}
          removeLanguage={removeLanguage}
          drag={drag}
          isActive={isActive}
          isDraggableListVisible={isDraggableListVisible}
        />
      </View>
    ),
    [
      expandedItemId,
      isDraggableListVisible,
      removeLanguage,
      toggleExpand,
      updateLanguage,
    ],
  );

  const handleDragEnd = useCallback(
    ({data}: {data: LanguageItem[]}) => {
      updateAllLanguage(data);
    },
    [updateAllLanguage],
  );

  const languageItems = useMemo(
    () => languages?.items || [],
    [languages?.items],
  );

  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={globalStyles.keyboardAvoidingView}>
          <Header
            title="Languages"
            showPreviewButton={true}
            rightComponent={
              <Icon
                name="drag-indicator"
                size={24}
                color={isDraggableListVisible ? COLORS.primary : undefined}
              />
            }
            onRightPress={handleDragIconPress}
          />
          <ScrollView style={styles.container}>
            {languageItems?.length > 0 && (
              <TipsCard
                tips={TipSets.swipe}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={SWIPE_TIPS_SHOWN}
                animationType="fade"
              />
            )}
            {languageItems?.length > 2 && (
              <TipsCard
                tips={TipSets.reorder}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={REORDER_TIPS_SHOWN}
                animationType="fade"
              />
            )}
            <NestableScrollContainer>
              <NestableDraggableFlatList
                data={languageItems}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                onDragEnd={handleDragEnd}
              />
            </NestableScrollContainer>
            <View style={styles.section}>
              <Button
                title="Add Language"
                onPress={() => {
                  const id = addLanguage({
                    name: '',
                    level: 'Intermediate',
                  });
                  setExpandedItemId(id);
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
