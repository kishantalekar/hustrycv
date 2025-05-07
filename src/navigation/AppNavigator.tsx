import {Dashboard, KeywordsEditor, SocialProfilesScreen} from '@/screens';
import {AIChatScreen} from '@/screens/AIChat/AIChatScreen';
import {PreviewScreen} from '@/screens/Preview/PreviewScreen';
import {ResumeEditor} from '@/screens/ResumeEditor/ResumeEditor';
import {ProjectConfigScreen} from '@/screens/ResumeEditor/screens/ProjectConfigScreen';
import {
  ContentType,
  RichTextEditorScreen,
} from '@/screens/ResumeEditor/screens/RichTextEditorScreen';
import {UploadResumeScreen} from '@/screens/UploadResume/UploadResumeScreen';
import {navigationRef} from '@/utils/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {RootScreens} from './constants';

export type RootStackParamList = {
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
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
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
          component={ProjectConfigScreen}
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
          name={RootScreens.AI_CHAT}
          component={AIChatScreen}
          options={{title: 'AI Chat'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
