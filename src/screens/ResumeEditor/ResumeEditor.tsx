import {RootStackParamList} from '@/navigation/AppNavigator';
import {RootScreens} from '@/navigation/constants';
import {FormNavigator} from '@/navigation/FormNavigator';
import {COLORS} from '@/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DownloadScreen} from '../Download/DownloadScreen';
import {PreviewScreen} from '../Preview/PreviewScreen';
import {styles} from './ResumeEditor.styles';

type ResumeEditorRouteProp = RouteProp<
  RootStackParamList,
  RootScreens.RESUME_EDITOR
>;

const Tab = createBottomTabNavigator();

const ImproveScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>AI Improvements Coming Soon</Text>
  </View>
);

type Props = {
  route: ResumeEditorRouteProp;
};

export const ResumeEditor = ({route}: Props) => {
  const {name} = route.params || {};
  let initialRoute = 'Form';
  if (
    name === 'Preview' ||
    name === 'Form' ||
    name === 'Improve' ||
    name === 'Download'
  ) {
    initialRoute = name;
  }
  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.secondary,
        headerShown: false,
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tab.Screen
        name="Form"
        component={FormNavigator}
        options={{
          tabBarLabel: 'Fill Details',
          tabBarIcon: ({color, size}) => (
            <Icon name="form-select" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Preview"
        component={PreviewScreen}
        options={{
          tabBarLabel: 'Preview',
          tabBarIcon: ({color, size}) => (
            <Icon name="eye" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Improve"
        component={ImproveScreen}
        options={{
          tabBarLabel: 'Improve',
          tabBarIcon: ({color, size}) => (
            <Icon name="magic" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Download"
        component={DownloadScreen}
        options={{
          tabBarLabel: 'Download',
          tabBarIcon: ({color, size}) => (
            <Icon name="download" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
