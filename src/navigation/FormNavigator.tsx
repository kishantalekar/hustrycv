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
} from '@/screens/ResumeEditor/sections';
import {CertificationsEditor} from '@/screens/ResumeEditor/sections/CertificationsEditor';
import {PersonalInfoEditor} from '@/screens/ResumeEditor/sections/PersonalInfoEditor';
import FormScreen from '../screens/ResumeEditor/screens/FormScreen';

const Stack = createNativeStackNavigator();
export type FormStackParamList = {
  FormHome: undefined;
  PersonalInfo: undefined;
  Summary: undefined;
  Experience: undefined;
  Education: undefined;
  Skills: undefined;
  Projects: undefined;
  Certifications: undefined;
};

export type NavigationProp = NativeStackNavigationProp<FormStackParamList>;

export const FormNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FormHome"
        component={FormScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfoEditor}
        options={{title: 'Personal Information'}}
      />

      <Stack.Screen
        name="Experience"
        component={WorkExperienceEditor}
        options={{title: 'Work Experience'}}
      />
      <Stack.Screen
        name="Education"
        component={EducationEditor}
        options={{title: 'Education'}}
      />
      <Stack.Screen
        name="Skills"
        component={SkillsEditor}
        options={{title: 'Skills'}}
      />
      <Stack.Screen
        name="Projects"
        component={ProjectsEditor}
        options={{title: 'Projects'}}
      />
      <Stack.Screen
        name="Certifications"
        component={CertificationsEditor}
        options={{title: 'Certifications'}}
      />
    </Stack.Navigator>
  );
};
