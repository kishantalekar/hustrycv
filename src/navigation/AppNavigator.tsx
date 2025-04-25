import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dashboard} from '../screens/Dashboard/Dashboard';
import {ResumeEditor} from '../screens/ResumeEditor/ResumeEditor';
import {PreviewScreen} from '../screens/Preview/PreviewScreen';
import DownloadedResumes from '../screens/DownloadedResumes/DownloadedResumes';
import {navigationRef} from '../utils/navigation';

export type RootStackParamList = {
  Dashboard: undefined;
  ResumeEditor: {resumeId?: string};
  Preview: {resumeData: any};
  DownloadedResumes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
