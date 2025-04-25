import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS} from '../../constants/fonts';
import {useResumeStore} from '../../store/useResumeStore';
import ResumePreview from '../../components/ResumePreview/ResumePreview';
import {PreviewScreen} from '../Preview/PreviewScreen';
import {FormNavigator} from '../../navigation/FormNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const ImproveScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>AI Improvements Coming Soon</Text>
  </View>
);

const DownloadScreen = () => {
  const resumeData = useResumeStore();
  return <ResumePreview resumeData={resumeData} />;
};

export const ResumeEditor = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabBarLabel: {
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 12,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     marginTop: 20, // Adjust this value as needed to move the content downwards
//   },
//   contentContainerStyle: {
//     flex: 1,
//   },

//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: 'white',
//   },
//   backButton: {
//     padding: 8,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#007AFF',
//     fontFamily: FONTS.FIRA_SANS.REGULAR,
//   },
//   mainContent: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   editorSection: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   previewSection: {
//     flex: 0.5,
//     borderLeftWidth: 1,
//     borderLeftColor: '#E0E0E0',
//     backgroundColor: 'white',
//   },
//   previewButton: {
//     marginLeft: 'auto',
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   previewButtonText: {
//     color: 'white',
//     fontFamily: FONTS.FIRA_SANS.REGULAR,
//     fontSize: 16,
//   },
// });
