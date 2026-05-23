import {Button, TipsCard, TipSets} from '@/components';
import {Header} from '@/components/Header';
import {REORDER_TIPS_SHOWN, SWIPE_TIPS_SHOWN} from '@/constants';
import {AppNavigationProp} from '@/navigation/AppNavigator';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {ProjectCard} from './ProjectCard';
// import {ProjectCard} from '../ProjectsEditor/ProjectCard';
import {ReferenceCard} from './ReferenceCard';
import {styles} from './ReferenceEditor.styles';

export const ReferenceEditor = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const {
    getActiveResume,
    addReference,
    updateReference,
    removeReference,
    updateAllReferences,
  } = useResumeStore();
  const references = getActiveResume().sections.references;
  const [expandedItemId, setExpandedItemId] = useState<string>('');
  const [isDraggableListVisible, setIsDraggableListVisible] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedItemId(
      prev => (prev === id ? '' : id), // prev === id? '' : prev
    );
  };
  const handleDragIconPress = () => {
    setExpandedItemId('');
    setIsDraggableListVisible(!isDraggableListVisible);
  };

  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={globalStyles.keyboardAvoidingView}>
          <Header
            title="References"
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
            {references?.items.length > 0 && (
              <TipsCard
                tips={TipSets.swipe}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={SWIPE_TIPS_SHOWN}
                animationType="fade"
              />
            )}
            {references?.items.length > 2 && (
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
                data={references?.items || []}
                keyExtractor={item => item.id}
                renderItem={({item, drag}) => (
                  <View style={styles.section}>
                    <ReferenceCard
                      reference={item}
                      expandedItemId={expandedItemId}
                      toggleExpand={toggleExpand}
                      updateReference={updateReference}
                      removeReference={removeReference}
                      navigation={navigation}
                      isDraggableListVisible={isDraggableListVisible}
                      drag={drag}
                    />
                  </View>
                )}
                onDragEnd={({data}) => {
                  updateAllReferences(data);
                }}
              />
            </NestableScrollContainer>
            <View style={styles.section}>
              <Button
                title="Add New Reference"
                onPress={() => {
                  const id = addReference({
                    name: '',
                    company: '',
                    position: '',
                    contact1: '',
                    contact2: '',
                    referenceText: '',
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
