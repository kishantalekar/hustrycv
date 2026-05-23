import type {RootStackParamList} from '@/navigation/AppNavigator';
import {RootScreens} from '@/navigation/constants';
import {FormNavigator} from '@/navigation/FormNavigator';
import {COLORS} from '@/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {MaterialDesignIcons as Icon} from '@react-native-vector-icons/material-design-icons';
import {DownloadScreen} from '../Download/DownloadScreen';
import {PreviewScreen} from '../Preview/PreviewScreen';
import {styles} from './ResumeEditor.styles';
import {AIImprove} from '../AIImprove/AIImprove';
import React from 'react';
import {Animated, Dimensions, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useResumeStore} from '@/store/useResumeStore';
import {selectActiveResume} from '@/store/selectors/resumeSelectors';
import {ResumePreview} from '@/components';
import {FEATURE_FLAGS} from '@/constants';

type ResumeEditorRouteProp = RouteProp<
  RootStackParamList,
  RootScreens.RESUME_EDITOR
>;

const Tab = createBottomTabNavigator();

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

  const previewVisible = useResumeStore(state => state.previewVisible);
  const activeResume = useResumeStore(selectActiveResume);
  const togglePreview = useResumeStore(state => state.togglePreviewVisible);
  const screenWidth = Dimensions.get('window').width;
  const slideAnim = React.useRef(new Animated.Value(screenWidth)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: previewVisible ? 0 : screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [previewVisible, screenWidth, slideAnim]);

  return (
    <View style={{flex: 1}}>
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
          component={AIImprove}
          options={{
            tabBarLabel: 'Improve',
            tabBarIcon: ({color, size}) => (
              <Icon name="robot" size={size} color={color} />
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

      {FEATURE_FLAGS.ENABLE_NEW_EDITOR_NAV && (
        <Animated.View
          style={[styles.slideOutPanel, {transform: [{translateX: slideAnim}]}]}
          pointerEvents={previewVisible ? 'auto' : 'none'}>
          {/* Header */}
          <View style={styles.previewHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={togglePreview}>
              <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
            <Text style={styles.previewTitle}>
              {activeResume?.metadata?.title || 'Live Preview'}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={togglePreview}>
              <Icon name="pencil" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Preview content */}
          <View style={{flex: 1}}>
            <ResumePreview
              resumeData={activeResume}
              selectedTemplate={activeResume?.metadata?.templateId || 'professional'}
              templates={[]}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
};
