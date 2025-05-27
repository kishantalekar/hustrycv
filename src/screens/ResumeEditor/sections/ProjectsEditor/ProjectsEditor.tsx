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
import {ProjectCard} from './ProjectCard';
import {styles} from './ProjectsEditor.styles';

export const ProjectsEditor = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const {
    getActiveResume,
    addProject,
    updateProject,
    removeProject,
    updateAllProjects,
  } = useResumeStore();
  const projects = getActiveResume().sections.projects;
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
            {projects?.items.length > 0 && (
              <TipsCard
                tips={TipSets.swipe}
                variant="default"
                dismissible={true}
                showOnce={true}
                storageKey={SWIPE_TIPS_SHOWN}
                animationType="fade"
              />
            )}
            {projects?.items.length > 2 && (
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
                data={projects?.items || []}
                keyExtractor={item => item.id}
                renderItem={({item, drag}) => (
                  <View style={styles.section}>
                    <ProjectCard
                      key={item.id}
                      project={item}
                      expandedItemId={expandedItemId}
                      toggleExpand={toggleExpand}
                      updateProject={updateProject}
                      removeProject={removeProject}
                      navigation={navigation}
                      drag={drag}
                      isDraggableListVisible={isDraggableListVisible}
                    />
                  </View>
                )}
                onDragEnd={({data}) => {
                  updateAllProjects(data);
                }}
              />
            </NestableScrollContainer>
            <View style={styles.section}>
              <Button
                title="Add New Project"
                onPress={() => {
                  const id = addProject({
                    name: '',
                    description: '',
                    url: '',
                    status: '',
                    links: [],
                    current: false,
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
