import {Header} from '@/components/Header';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {navigate} from '@/utils/navigation';
import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './FormScreen.styles';

interface SectionsInterface {
  id: string;
  title: string;
  screenName: string;
}

const sections: SectionsInterface[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    screenName: 'PersonalInfo',
  },
  {
    id: 'experience',
    title: 'Work Experience',
    screenName: 'Experience',
  },
  {
    id: 'education',
    title: 'Education',
    screenName: 'Education',
  },
  {
    id: 'skills',
    title: 'Skills',
    screenName: 'Skills',
  },
  {
    id: 'projects',
    title: 'Projects',
    screenName: 'Projects',
  },
  {
    id: 'certifications',
    title: 'Certifications',
    screenName: 'Certifications',
  },
];

const FormScreen = () => {
  const {updateMetadata, getActiveResume} = useResumeStore();
  const activeResume = getActiveResume();
  const metadata = activeResume.metadata;
  const [sectionOrder, setSectionOrder] = React.useState(
    metadata.sectionOrder
      ? sections.sort((a, b) => {
          const aIndex = metadata.sectionOrder!.indexOf(a.id);
          const bIndex = metadata.sectionOrder!.indexOf(b.id);
          return aIndex - bIndex;
        })
      : sections,
  );
  console.log(sectionOrder);
  console.log(metadata.sectionOrder);
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={globalStyles.keyboardAvoidingView}>
        <Header
          title={metadata?.title?.length ? metadata.title : 'My Resume'}
          leftIcon="home"
          iconVariant="octicon"
          editable
          onTitleChange={newTitle => updateMetadata({title: newTitle})}
        />
        <ScrollView style={styles.container}>
          <NestableScrollContainer>
            <NestableDraggableFlatList
              data={sectionOrder}
              keyExtractor={item => item.id}
              onDragEnd={({data}) => {
                setSectionOrder(data);
                updateMetadata({
                  sectionOrder: data.map(section => section.id),
                });
              }}
              renderItem={({item, drag, isActive, getIndex}) => {
                const isFirstItem = getIndex() === 0;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.sectionButton,
                      isActive && styles.sectionButtonActive,
                    ]}
                    onPress={() => navigate(item.screenName)}
                    onLongPress={!isFirstItem ? drag : undefined}>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </NestableScrollContainer>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default FormScreen;
