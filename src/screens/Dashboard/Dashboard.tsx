import {posthog} from '@/analytics/posthog/PostHog';
import {
  ChangesLogModal,
  LottieAnimation,
  Typography,
  TypographyVariant,
} from '@/components';
import {CreateResumeModal} from '@/components/CreateResumeModal/CreateResumeModal';
import {RootScreens} from '@/navigation/constants';
import {useAppStore} from '@/store/useAppStore';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {createInitialResume} from '@/types';
import {navigate} from '@/utils/navigation';
import BottomSheet from '@gorhom/bottom-sheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {styles} from './Dashboard.styles';
import {renderResumeItem} from './ResumeItem';
import {checkForChangeLogUpdates} from '@/utils/changelogUtils';

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {setActiveResume, resumes, addResume, deleteResume} = useResumeStore();
  const {userName} = useAppStore();
  const [changelogVisible, setChangelogVisible] = useState(false);
  const [unseenChanges, setUnseenChanges] = useState([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    async function check() {
      const changes = await checkForChangeLogUpdates();
      if (changes) {
        setUnseenChanges(changes);
        setChangelogVisible(true);
      }
    }
    check();
  }, []);

  const handleResumePress = (resumeId: string) => {
    setActiveResume(resumeId);
    posthog.capture('resume_selected', {
      resume_id: resumeId,
      user_name: userName || 'Anonymous',
    });
    navigation.navigate('ResumeEditor');
  };

  const handleDelete = (resumeId: string) => {
    Alert.alert(
      'Delete Resume',
      'Are you sure you want to delete this resume?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            posthog.capture('resume_deleted', {
              resume_id: resumeId,
              user_name: userName || 'Anonymous',
            });
            deleteResume(resumeId);
          },
        },
      ],
    );
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreateResumePress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCreateManual = () => {
    const newResume = createInitialResume();
    addResume(newResume as Resume);
    const id = newResume.metadata.id;
    posthog.capture('create_resume', {
      type: 'manual',
      resume_id: id,
      user_name: userName || 'Anonymous',
    });
    setActiveResume(id);
    navigate('ResumeEditor');
    setShowDropdown(false);
  };

  const handleUploadResume = () => {
    posthog.capture('upload_resume_initiated', {
      user_name: userName || 'Anonymous',
    });
    navigate('UploadResume');
    setShowDropdown(false);
  };

  const hanldeImportResume = () => {
    posthog.capture('import_resume_initiated', {
      user_name: userName || 'Anonymous',
    });
    navigate(RootScreens.LINKEDIN_IMPORT);
    setShowDropdown(false);
  };

  return (
    <GestureHandlerRootView style={globalStyles.keyboardAvoidingView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Resumes</Text>
          <View style={styles.createButtonContainer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateResumePress}>
              <Text style={styles.createButtonText}>Create New</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CreateResumeModal
          visible={showDropdown}
          onClose={() => setShowDropdown(false)}
          onCreateManual={handleCreateManual}
          onUploadResume={handleUploadResume}
          onImportResume={hanldeImportResume}
        />

        <FlatList
          data={resumes}
          renderItem={item =>
            renderResumeItem({
              item: item.item,
              handleDelete,
              handleResumePress,
            })
          }
          keyExtractor={item => item.metadata.id}
          contentContainerStyle={styles.resumeList}
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <LottieAnimation
                source={require('@/assets/animations/fox_ meditating.json')}
                style={styles.emptyAnimation}
                autoPlay
                loop
              />
              <Typography
                variant={TypographyVariant.H2}
                style={styles.emptyStateTitle}>
                No Resumes Yet
              </Typography>
              <Typography
                variant={TypographyVariant.BodyMedium}
                style={styles.emptyStateDescription}>
                Create your first resume or upload an existing one to get
                started
              </Typography>
            </View>
          }
        />
      </View>
      <ChangesLogModal
        bottomSheetRef={bottomSheetRef}
        isVisible={changelogVisible}
        onClose={() => setChangelogVisible(false)}
        changes={unseenChanges}
      />
    </GestureHandlerRootView>
  );
};
