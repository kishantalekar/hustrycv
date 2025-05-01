import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FormNavigator} from '@/navigation/FormNavigator';
import {COLORS} from '@/theme';
import {styles} from './ResumeEditor.styles';
import {DownloadScreen} from '../Download/DownloadScreen';
import {PreviewScreen} from '../Preview/PreviewScreen';

const Tab = createBottomTabNavigator();

const ImproveScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>AI Improvements Coming Soon</Text>
  </View>
);

export const ResumeEditor = () => {
  return (
    <Tab.Navigator
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
