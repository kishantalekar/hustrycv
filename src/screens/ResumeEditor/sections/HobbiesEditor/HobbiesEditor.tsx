import {Button, Header, IconSelector, TipsCard, TipSets} from '@/components';
import {FONTS, REORDER_TIPS_SHOWN, SWIPE_TIPS_SHOWN} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {COLORS, SPACING} from '@/theme';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HobbiesCard} from './HobbiesCard/HobbiesCard';

const HobbiesEditor = () => {
  const {
    getActiveResume,
    addHobbie,
    removeHobbie,
    updateHobbie,
    updateAllHobbies,
  } = useResumeStore();
  const hobbies = getActiveResume().sections.hobbies;
  const [isDraggableListVisible, setIsDraggableListVisible] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string>('');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);

  const handleSheetChanges = useCallback((index: number) => {
    setIsIconSelectorOpen(index === 0);
  }, []);

  const handleSelectIcon = (icon: string, variant: string) => {
    console.log('Selected icon:', icon, 'Variant:', variant);
    if (expandedItemId) {
      const item = hobbies.items.find(item => item.id === expandedItemId);
      updateHobbie(expandedItemId, {
        ...item,
        link: {
          ...item?.link,
          icon: icon,
          iconVariant: variant,
        },
      });
    }
    setIsIconSelectorOpen(false);
    bottomSheetRef.current?.close();
  };
  const handleDragIconPress = () => {
    setExpandedItemId('');
    setIsDraggableListVisible(!isDraggableListVisible);
  };
  const toggleExpand = (id: string) => {
    setExpandedItemId(prev => (prev === id ? '' : id));
  };
  const openIconSelector = () => {
    setIsIconSelectorOpen(true);
  };
  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={globalStyles.keyboardAvoidingView}>
          <Header
            title="Hobbies & Interests"
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
            {expandedItemId.length === 0 && hobbies?.items.length > 0 && (
              <TipsCard
                tips={TipSets.swipe}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={SWIPE_TIPS_SHOWN}
                animationType="fade"
              />
            )}
            {hobbies?.items.length > 2 && (
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
                data={hobbies?.items || []}
                keyExtractor={item => item.id}
                renderItem={({item, drag}) => (
                  <View style={styles.section}>
                    <HobbiesCard
                      key={item.id}
                      hobbie={item}
                      toggleExpand={toggleExpand}
                      expandedItemId={expandedItemId}
                      updateHobbie={updateHobbie}
                      removeHobbie={removeHobbie}
                      isDraggableListVisible={isDraggableListVisible}
                      drag={drag}
                      openIconSelector={openIconSelector}
                    />
                  </View>
                )}
                onDragEnd={({data}) => {
                  updateAllHobbies(data);
                }}
              />
            </NestableScrollContainer>

            <View style={styles.section}>
              <Button
                title="Add New Hobbie"
                onPress={() => {
                  const id = addHobbie({
                    name: '',
                    link: {
                      url: '',
                      icon: 'link',
                      iconVariant: 'material',
                    },
                  });
                  setExpandedItemId(id);
                }}
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
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export {HobbiesEditor};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  section: {
    marginBottom: 24,
    gap: SPACING.sectionGap,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    marginBottom: 16,
    color: '#333333',
  },
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
  bottomSheetHandleIndicationStyles: {
    backgroundColor: COLORS.border,
    width: 40,
    height: 4,
  },
  bottomSheethandleStyle: {
    backgroundColor: COLORS.background.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 10,
  },
});
