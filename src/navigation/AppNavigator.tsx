import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {Dashboard} from '@/screens';
import {PreviewScreen} from '@/screens/Preview/PreviewScreen';
import {ResumeEditor} from '@/screens/ResumeEditor/ResumeEditor';
import {ProjectConfigScreen} from '@/screens/ResumeEditor/screens/ProjectConfigScreen';
import {
  ContentType,
  RichTextEditorScreen,
} from '@/screens/ResumeEditor/screens/RichTextEditorScreen';
import {SocialProfilesScreen} from '@/screens/ResumeEditor/screens/SocialProfilesScreen';
import {navigationRef} from '@/utils/navigation';
import DownloadedResumes from '../screens/DownloadedResumes/DownloadedResumes';

export type RootStackParamList = {
  Dashboard: undefined;
  ResumeEditor: {resumeId?: string};
  Preview: {resumeData: any};
  DownloadedResumes: undefined;
  RichTextEditor: {
    initialContent: string;
    contentType: ContentType;
    itemId?: string; // ID for work experience or project items
  };
  SocialProfiles: undefined;
  ProjectConfig: {
    project: any;
    updateProject: (id: string, project: any) => void;
  };
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
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ResumeEditor" component={ResumeEditor} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
        <Stack.Screen
          name="DownloadedResumes"
          component={DownloadedResumes}
          options={{
            title: 'Downloaded Resumes',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="RichTextEditor"
          component={RichTextEditorScreen}
          options={{title: 'Edit Summary'}}
        />
        <Stack.Screen
          name="SocialProfiles"
          component={SocialProfilesScreen}
          options={{title: 'Social Profiles'}}
        />
        <Stack.Screen
          name="ProjectConfig"
          component={ProjectConfigScreen}
          options={{title: 'Project Configuration'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
