import {Button} from '@/components';
import {Header} from '@/components/Header';
import {AppNavigationProp} from '@/navigation/AppNavigator';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {COLORS} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WorkExperienceCard} from './components/WorkExperienceCard';
import {styles} from './WorkExperienceEditor.styles';

export const WorkExperienceEditor = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const {
    getActiveResume,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    updateAllWorkExperiences,
  } = useResumeStore();
  const workExperience = getActiveResume().sections.work;
  const [isDraggableListVisible, setIsDraggableListVisible] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );
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
    <SafeAreaView style={styles.keyboardAvoidingView}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <View style={globalStyles.keyboardAvoidingView}>
            <Header
              title="Work Experience"
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
              <NestableScrollContainer>
                <NestableDraggableFlatList
                  data={workExperience?.items || []}
                  keyExtractor={item => item.id}
                  renderItem={({item, drag}) => (
                    <View style={styles.section}>
                      <WorkExperienceCard
                        key={item.id}
                        experience={item}
                        toggleExpand={toggleExpand}
                        expandedItems={expandedItems}
                        navigation={navigation}
                        updateWorkExperience={updateWorkExperience}
                        removeWorkExperience={removeWorkExperience}
                        isDraggableListVisible={isDraggableListVisible}
                        drag={drag}
                      />
                    </View>
                  )}
                  onDragEnd={({data}) => {
                    console.log('onDragEnd', data);
                    updateAllWorkExperiences(data);
                  }}
                />
              </NestableScrollContainer>

              <View style={styles.section}>
                <Button
                  title="Add New Experience"
                  onPress={() => {
                    const id = addWorkExperience({
                      company: '',
                      position: '',
                      location: '',
                      startDate: '',
                      endDate: '',
                      current: false,
                      description: '',
                      status: '',
                    });
                    setExpandedItems(prev => ({
                      ...prev,
                      [id]: true,
                    }));
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
