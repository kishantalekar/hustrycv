import {LoadingIndicator} from '@/components/LoadingIndicator';
import {
  Dashboard,
  KeywordsEditor,
  NameInputScreen,
  OnboardingScreen,
  PreviewScreen,
  ProjectLinksScreen,
  ResumeEditor,
  SocialProfilesScreen,
  UploadResumeScreen,
} from '@/screens';
import {
  ContentType,
  RichTextEditorScreen,
} from '@/screens/ResumeEditor/screens/RichTextEditorScreen';
import {useAppStore} from '@/store/useAppStore';
import {navigationRef} from '@/utils/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react'; // Added useEffect
import BootSplash from 'react-native-bootsplash'; // Added BootSplash
import {RootScreens} from './constants';

export type RootStackParamList = {
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.NAME_INPUT]: undefined; // Add NameInputScreen to param list
  [RootScreens.DASHBOARD]: undefined;
  [RootScreens.RESUME_EDITOR]: {resumeId?: string; name?: string};
  [RootScreens.PREVIEW]: {resumeData: any};
  [RootScreens.DOWNLOADED_RESUMES]: undefined;
  [RootScreens.RICH_TEXT_EDITOR]: {
    initialContent: string;
    contentType: ContentType;
    itemId?: string; // ID for work experience or project items
  };
  [RootScreens.SOCIAL_PROFILES]: undefined;
  [RootScreens.PROJECT_CONFIG]: {
    id: string;
  };
  [RootScreens.KEYWORDS_EDITOR]: {
    id: string;
    type: 'project' | 'work';
  };
  [RootScreens.UPLOAD_RESUME]: undefined;
  [RootScreens.AI_CHAT]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const AppNavigator = () => {
  const onboardingCompleted = useAppStore(state => state.onboardingCompleted);
  const nameInputCompleted = useAppStore(state => state.nameInputCompleted); // Get name input status
  const isHydrated = useAppStore(state => state.isHydrated); // Get hydration status

  useEffect(() => {
    if (isHydrated) {
      BootSplash.hide({fade: true}); // Hide splash screen when hydrated
    }
  }, [isHydrated]);

  console.log('onboardingCompleted', onboardingCompleted);
  console.log('nameInputCompleted', nameInputCompleted);
  console.log('isHydrated', isHydrated); // Log hydration status
  const initialRouteName = onboardingCompleted
    ? nameInputCompleted
      ? RootScreens.DASHBOARD
      : RootScreens.NAME_INPUT // Navigate to NameInput if onboarding is done but name is not
    : RootScreens.ONBOARDING;
  console.log('initialRouteName', initialRouteName);

  if (!isHydrated) {
    // Show a loading indicator or a splash screen while the store is rehydrating
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initialRouteName}>
        <Stack.Screen name={RootScreens.DASHBOARD} component={Dashboard} />
        <Stack.Screen
          name={RootScreens.RESUME_EDITOR}
          component={ResumeEditor}
        />
        <Stack.Screen name={RootScreens.PREVIEW} component={PreviewScreen} />
        <Stack.Screen
          name={RootScreens.RICH_TEXT_EDITOR}
          component={RichTextEditorScreen}
          options={{title: 'Edit Summary'}}
        />
        <Stack.Screen
          name={RootScreens.SOCIAL_PROFILES}
          component={SocialProfilesScreen}
          options={{title: 'Social Profiles'}}
        />
        <Stack.Screen
          name={RootScreens.PROJECT_CONFIG}
          component={ProjectLinksScreen}
          options={{title: 'Project Configuration'}}
        />
        <Stack.Screen
          name={RootScreens.KEYWORDS_EDITOR}
          component={KeywordsEditor}
          options={{title: 'Project Configuration'}}
        />
        <Stack.Screen
          name={RootScreens.UPLOAD_RESUME}
          component={UploadResumeScreen}
          options={{title: 'Upload Resume'}}
        />

        <Stack.Screen
          name={RootScreens.ONBOARDING}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name={RootScreens.NAME_INPUT} // Add NameInputScreen to stack
          component={NameInputScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
