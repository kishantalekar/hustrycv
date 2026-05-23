import {posthog} from '@/analytics/posthog/PostHog';
import {Button, Header, RightActions} from '@/components';
import {FormScreens, RootScreens} from '@/navigation/constants';
import {useAppStore} from '@/store/useAppStore';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS, SPACING} from '@/theme';
import {navigate} from '@/utils/navigation';
import {showAlert} from '@/utils/utils';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './FormScreen.styles';

interface SectionsInterface {
  id: SectionType;
  title: string;
  screenName: string;
}

export const sections: SectionsInterface[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    screenName: 'PersonalInfo',
  },
  {
    id: 'work',
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
  {
    id: 'hobbies',
    title: 'Hobbies & Interests',
    screenName: 'Hobbies',
  },
  {
    id: 'strengths',
    title: 'Strengths',
    screenName: 'Strengths',
  },
  {
    id: 'references',
    title: 'References',
    screenName: 'References',
  },
];

const FormScreen = () => {
  const {updateMetadata, getActiveResume, deleteSection} = useResumeStore();
  const {userName} = useAppStore();
  const activeResume = getActiveResume();
  const metadata = activeResume?.metadata;

  function loadSections() {
    const resumeSections = metadata?.sectionOrder;
    const sectionOrder = sections
      .filter(section => {
        return resumeSections?.includes(section.id) ?? true;
      })
      .sort((a, b) => {
        if (!resumeSections) return 0;
        const aIndex = resumeSections.indexOf(a.id);
        const bIndex = resumeSections.indexOf(b.id);
        return aIndex - bIndex;
      });
    setSectionOrder(sectionOrder);
  }
  const [sectionOrder, setSectionOrder] = useState<SectionsInterface[]>([]);

  useEffect(() => {
    if (metadata?.sectionOrder) {
      loadSections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata?.sectionOrder]);

  const handleSectionDelete = (item: SectionsInterface) => {
    posthog.capture('section_deleted', {
      section: item.title,
      user: userName,
    });
    setSectionOrder(prev => prev.filter(section => section.id !== item.id));
    updateMetadata({
      sectionOrder: sectionOrder
        .filter(section => section.id !== item.id)
        .map(section => section.id),
    });
    deleteSection(item.id);
  };

  // useEffect(() => {
  //   loadSections();
  // }, [metadata.sectionOrder]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={globalStyles.keyboardAvoidingView}>
        <Header
          title={metadata?.title?.length ? metadata.title : 'My Resume'}
          leftIcon="home"
          onLeftPress={() => navigate(RootScreens.DASHBOARD)}
          iconVariant="octicon"
          editable
          onTitleChange={newTitle => updateMetadata({title: newTitle})}
        />
        {/* <ScrollView
          nestedScrollEnabled
          style={styles.container}
          
          contentContainerStyle={styles.scrollContainer}> */}
        <NestableScrollContainer
          style={styles.container}
          contentContainerStyle={[styles.scrollContainer, {paddingBottom: 40}]}>
          <NestableDraggableFlatList
            data={sectionOrder}
            contentContainerStyle={{
              gap: SPACING.sm + 4,
            }}
            nestedScrollEnabled
            keyExtractor={item => item.id}
            onDragEnd={({data}) => {
              setSectionOrder(data);
              updateMetadata({
                sectionOrder: data.map(section => section.id),
              });
            }}
            ListFooterComponent={
              <ListFooterComponent
                handleNavigate={() => navigate(FormScreens.ADD_SECTIONS)}
              />
            }
            // ListFooterComponentStyle={{marginBottom: 40}}
            renderItem={({item, drag, isActive, getIndex}) => {
              const isFirstItem = getIndex() === 0;
              if (getIndex() === 0) {
                console.log(item.title);
              }
              const expanded = isFirstItem ? true : isActive;
              return (
                <SwipeCard
                  expanded={expanded}
                  id={item.id}
                  handleDelete={() =>
                    showAlert(
                      'Delete Section',
                      `Are you sure you want to delete the ${item.title} section?`,
                      () => handleSectionDelete(item),
                    )
                  }>
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.sectionButton,
                      isActive && styles.sectionButtonActive,
                    ]}
                    onPress={() => {
                      posthog.capture('screens', {
                        user_name: userName || 'Anonymous',
                        screen: item.screenName,
                      });
                      navigate(item.screenName);
                    }}
                    onLongPress={!isFirstItem ? drag : undefined}>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                </SwipeCard>
              );
            }}
          />
        </NestableScrollContainer>

        {/* <Button
            onPress={() => navigate(FormScreens.ADD_SECTIONS)}
            title="Add More Sections"
            leftIcon={<Icon name="plus" size={24} color={COLORS.white} />}
          />
        </ScrollView> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export {FormScreen};

interface ListFooterComponentProps {
  handleNavigate: () => void;
}

const ListFooterComponent = ({handleNavigate}: ListFooterComponentProps) => (
  <View style={{marginTop: 20}}>
    <Button
      onPress={handleNavigate}
      title="Add More Sections"
      leftIcon={<Icon name="plus" size={24} color={COLORS.white} />}
    />
  </View>
);
interface SwipeCardProps {
  children: React.ReactNode;
  expanded?: boolean;
  id?: string;
  handleDelete: (id: string) => void;
}
export const SwipeCard = ({
  expanded,
  id,
  handleDelete,
  children,
}: SwipeCardProps) => {
  return (
    <ReanimatedSwipeable
      enabled={!expanded}
      friction={1}
      dragOffsetFromRightEdge={80}
      dragOffsetFromLeftEdge={80}
      onSwipeableOpen={direction => console.log('Opened:', direction)}
      onSwipeableClose={direction => console.log('Closed:', direction)}
      onSwipeableWillOpen={direction => console.log('Will open:', direction)}
      onSwipeableWillClose={direction => console.log('Will close:', direction)}
      renderRightActions={(progress, translation) =>
        RightActions({
          progress,
          drag: translation,
          handleDelete: handleDelete,
          id: id,
          showDelete: false,
        })
      }>
      {children}
    </ReanimatedSwipeable>
  );
};
