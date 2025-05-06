import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {
  WorkExperienceEditor,
  EducationEditor,
  ProjectsEditor,
  SkillsEditor,
  CertificationsEditor,
  PersonalInfoEditor,
} from '@/screens/ResumeEditor/sections';
import FormScreen from '../screens/ResumeEditor/screens/FormScreen';
import {FormScreens} from './constants';

const Stack = createNativeStackNavigator();
export type FormStackParamList = {
  [FormScreens.FORM_HOME]: undefined;
  [FormScreens.PERSONAL_INFO]: undefined;
  [FormScreens.SUMMARY]: undefined;
  [FormScreens.EXPERIENCE]: undefined;
  [FormScreens.EDUCATION]: undefined;
  [FormScreens.SKILLS]: undefined;
  [FormScreens.PROJECTS]: undefined;
  [FormScreens.CERTIFICATIONS]: undefined;
};

export type NavigationProp = NativeStackNavigationProp<FormStackParamList>;

export const FormNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={FormScreens.FORM_HOME}
        component={FormScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.PERSONAL_INFO}
        component={PersonalInfoEditor}
        options={{title: 'Personal Information'}}
      />

      <Stack.Screen
        name={FormScreens.EXPERIENCE}
        component={WorkExperienceEditor}
        options={{title: 'Work Experience'}}
      />
      <Stack.Screen
        name={FormScreens.EDUCATION}
        component={EducationEditor}
        options={{title: 'Education'}}
      />
      <Stack.Screen
        name={FormScreens.SKILLS}
        component={SkillsEditor}
        options={{title: 'Skills'}}
      />
      <Stack.Screen
        name={FormScreens.PROJECTS}
        component={ProjectsEditor}
        options={{title: 'Projects'}}
      />
      <Stack.Screen
        name={FormScreens.CERTIFICATIONS}
        component={CertificationsEditor}
        options={{title: 'Certifications'}}
      />
    </Stack.Navigator>
  );
};
