import {Button, TipsCard, TipSets} from '@/components';
import {Header} from '@/components/Header';
import {REORDER_TIPS_SHOWN, SWIPE_TIPS_SHOWN} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
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
import {SkillsCard} from './SkillsCard';
import {styles} from './SkillsEditor.styles';

export const SkillsEditor = () => {
  const {getActiveResume, addSkill, updateSkill, removeSkill, updateAllSkills} =
    useResumeStore();
  const skills = getActiveResume().sections.skills;
  const [expandedItemId, setExpandedItemId] = useState<string>('');
  const [isDraggableListVisible, setIsDraggableListVisible] = useState(false);

  const [newKeyword, setNewKeyword] = useState('');

  const toggleExpand = useCallback((id: string) => {
    setExpandedItemId(prev => (prev === id ? '' : id));
  }, []);

  const handleDragIconPress = useCallback(() => {
    setExpandedItemId('');
    setIsDraggableListVisible(prev => !prev);
  }, []);

  const renderItem = useCallback(
    ({item, drag, isActive}) => (
      <View style={styles.section}>
        <SkillsCard
          key={item.id}
          skill={item}
          expandedItemId={expandedItemId}
          toggleExpand={toggleExpand}
          updateSkill={updateSkill}
          removeSkill={removeSkill}
          newKeyword={newKeyword}
          setNewKeyword={setNewKeyword}
          drag={drag}
          isActive={isActive}
          isDraggableListVisible={isDraggableListVisible}
        />
      </View>
    ),
    [
      expandedItemId,
      isDraggableListVisible,
      newKeyword,
      removeSkill,
      toggleExpand,
      updateSkill,
    ],
  );
  const handleDragEnd = useCallback(
    ({data}) => {
      updateAllSkills(data);
    },
    [updateAllSkills],
  );
  const skillItems = useMemo(() => skills?.items || [], [skills?.items]);
  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={globalStyles.keyboardAvoidingView}>
          <Header
            title="Skills"
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
            {skillItems?.length > 0 && (
              <TipsCard
                tips={TipSets.swipe}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={SWIPE_TIPS_SHOWN}
                animationType="fade"
              />
            )}
            {skillItems?.length > 2 && (
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
                data={skillItems}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                onDragEnd={handleDragEnd}
              />
            </NestableScrollContainer>
            <View style={styles.section}>
              <Button
                title="Add New Skill"
                onPress={() => {
                  const id = addSkill({
                    name: '',
                    level: 'intermediate',
                    keywords: [],
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
