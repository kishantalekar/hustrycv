import {AddSections, FormScreen} from '@/screens';
import {
  CertificationsEditor,
  EducationEditor,
  HobbiesEditor,
  PersonalInfoEditor,
  ProjectsEditor,
  ReferenceEditor,
  SkillsEditor,
  StrengthEditor,
  WorkExperienceEditor,
} from '@/screens/ResumeEditor/sections';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
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
  [FormScreens.ADD_SECTIONS]: undefined;
  [FormScreens.HOBBIES]: undefined;
  [FormScreens.REFERENCES]: undefined;
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
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={FormScreens.EXPERIENCE}
        component={WorkExperienceEditor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.EDUCATION}
        component={EducationEditor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.SKILLS}
        component={SkillsEditor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.PROJECTS}
        component={ProjectsEditor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.CERTIFICATIONS}
        component={CertificationsEditor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.HOBBIES}
        component={HobbiesEditor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.STRENGTHS}
        component={StrengthEditor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.ADD_SECTIONS}
        component={AddSections}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={FormScreens.REFERENCES}
        component={ReferenceEditor}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
