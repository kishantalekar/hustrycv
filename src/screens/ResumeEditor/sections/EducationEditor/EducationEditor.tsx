import {Button, TipsCard, TipSets} from '@/components';
import {Header} from '@/components/Header';
import {REORDER_TIPS_SHOWN, SWIPE_TIPS_SHOWN} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {EducationCard} from './EducationCard';
import {styles} from './EducationEditor.styles';

export const EducationEditor = () => {
  const {
    getActiveResume,
    addEducation,
    updateEducation,
    updateAllEducation,
    removeEducation,
  } = useResumeStore();
  const education = getActiveResume().sections.education;
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );
  const [isDraggableListVisible, setIsDraggableListVisible] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleDragIconPress = () => {
    setExpandedItems(prev =>
      Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {},
      ),
    );
    setIsDraggableListVisible(!isDraggableListVisible);
  };
  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={globalStyles.keyboardAvoidingView}>
          <Header
            title="Education"
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
            {education?.items.length > 0 && (
              <TipsCard
                tips={TipSets.swipe}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={SWIPE_TIPS_SHOWN}
                animationType="fade"
              />
            )}

            {education?.items.length > 2 && (
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
                data={education?.items || []}
                keyExtractor={item => item.id}
                renderItem={({item, drag, isActive}) => (
                  <View style={styles.section}>
                    <EducationCard
                      key={item.id}
                      edu={item}
                      toggleExpand={toggleExpand}
                      expandedItems={expandedItems}
                      updateEducation={updateEducation}
                      removeEducation={removeEducation}
                      drag={drag}
                      isActive={isActive}
                      isDraggableListVisible={isDraggableListVisible}
                    />
                  </View>
                )}
                onDragEnd={({data}) => {
                  updateAllEducation(data);
                }}
              />
            </NestableScrollContainer>

            <View style={styles.section}>
              <Button
                title="Add New Education"
                onPress={() => {
                  const id = addEducation({
                    institution: '',
                    degree: '',
                    startDate: '',
                    endDate: '',
                    gpa: '',
                    current: false,
                    isPercentage: false,
                  });
                  setExpandedItems(prev => ({
                    ...prev,
                    [id]: true,
                  }));
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
