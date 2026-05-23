import {posthog} from '@/analytics/posthog/PostHog';
import {Button, Header, RightActions, ResumePreview} from '@/components';
import BottomSheet from '@gorhom/bottom-sheet';
import {FormScreens, RootScreens} from '@/navigation/constants';
import {useAppStore} from '@/store/useAppStore';
import {useResumeStore} from '@/store/useResumeStore';
import {selectActiveResume} from '@/store/selectors/resumeSelectors';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS, SPACING} from '@/theme';
import {navigate} from '@/utils/navigation';
import {showAlert} from '@/utils/utils';
import {FEATURE_FLAGS} from '@/constants';
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
  {
    id: 'languages',
    title: 'Languages',
    screenName: 'Languages',
  },
];

const FormScreen = () => {
  const {updateMetadata, deleteSection} = useResumeStore();
  const activeResume = useResumeStore(selectActiveResume);
  const {userName} = useAppStore();
  const metadata = activeResume?.metadata;
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

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
          rightIcon="remove-red-eye"
          onRightPress={() => {
            if (FEATURE_FLAGS.ENABLE_NEW_EDITOR_NAV) {
              useResumeStore.getState().togglePreviewVisible();
            } else {
              setIsPreviewOpen(true);
            }
          }}
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
        
        {!FEATURE_FLAGS.ENABLE_NEW_EDITOR_NAV && (
          <BottomSheet
            ref={bottomSheetRef}
            index={isPreviewOpen ? 0 : -1}
            snapPoints={['90%']}
            enablePanDownToClose
            onClose={() => setIsPreviewOpen(false)}
            backgroundStyle={{
              backgroundColor: COLORS.background.primary,
            }}>
            <View style={{flex: 1}}>
              <ResumePreview
                resumeData={activeResume}
                selectedTemplate={metadata?.templateId || 'professional'}
                templates={[]}
              />
            </View>
          </BottomSheet>
        )}
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
