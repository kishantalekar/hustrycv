import {posthog} from '@/analytics/posthog/PostHog';
import FoxWalkingAnimation from '@/assets/animations/fox_walking.json';
import {
  Button,
  LottieAnimation,
  TextInput,
  Typography,
  TypographyVariant,
} from '@/components';
import {RootScreens} from '@/navigation/constants';
import {useAppStore} from '@/store/useAppStore';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles';
import {createInitialResume} from '@/types';
import {navigate, replace} from '@/utils/navigation';
import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {styles} from './NameInputScreen.styles';

export const NameInputScreen: React.FC = () => {
  const [name, setName] = useState('');
  const setUserName = useAppStore(state => state.setUserName);
  const setNameInputCompleted = useAppStore(
    state => state.setNameInputCompleted,
  );
  const {addResume, setActiveResume} = useResumeStore();

  const saveNameAndProceed = (callback: () => void) => {
    if (name.trim()) {
      const trimmedName = name.trim();
      setUserName(trimmedName);
      setNameInputCompleted(true);
      posthog.capture('name_input_completed', {
        user_name: trimmedName,
        has_spaces: trimmedName.includes(' '),
      });
      callback();
    } else {
      Alert.alert('Please enter your name.');
    }
  };

  const handleContinue = () => {
    setNameInputCompleted(true);
    posthog.capture('name_input', {
      user_name: name,
      type: 'continue',
    });
    replace(RootScreens.DASHBOARD); // Navigate to Dashboard
  };

  const handleCreateBlankResume = () => {
    saveNameAndProceed(() => {
      const newResume = createInitialResume();
      addResume(newResume);
      const id = newResume.metadata.id;
      posthog.capture('create_resume', {
        type: 'manual_from_name_input',
        user_name: name,
      });
      setActiveResume(id);
      replace(RootScreens.RESUME_EDITOR);
    });
  };

  const handleUploadPdf = () => {
    saveNameAndProceed(() => {
      replace(RootScreens.UPLOAD_RESUME);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.keyboardAvoidingView}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <LottieAnimation
            source={FoxWalkingAnimation}
            style={styles.animation}
          />
          <Typography
            variant={TypographyVariant.TitleLarge}
            style={styles.title}>
            What should we call you?
          </Typography>
          <TextInput
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleContinue}
            style={styles.input}
            placeholder="Enter your name"
          />

          <Button
            title="Create Blank Resume"
            onPress={handleCreateBlankResume}
            style={styles.button}
            variant="primary"
            disabled={!name.trim()}
          />
          <Button
            title="Upload Existing PDF"
            onPress={handleUploadPdf}
            style={styles.button}
            variant="outline"
            disabled={!name.trim()}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
