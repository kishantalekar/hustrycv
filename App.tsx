import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import React, {useEffect, useState} from 'react';
import {Alert, DevSettings, Platform} from 'react-native';
import {updateService} from './src/services/UpdateService';
import StorybookUIRoot from './.storybook';
import {posthog} from './src/analytics/posthog/PostHog';
import {AppNavigator} from './src/navigation/AppNavigator';

import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {
  handleJsExceptionHandler,
  handleNativeExceptionHandler,
} from './errorHandlers';
Sentry.init({
  dsn: 'https://4e53c676d66d1e4b3fe19315c0ba28a0@o4509298628100096.ingest.de.sentry.io/4509298629738576',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  // replaysSessionSampleRate: 0.1,
  // replaysOnErrorSampleRate: 1,
  // integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

setJSExceptionHandler(handleJsExceptionHandler);

setNativeExceptionHandler(handleNativeExceptionHandler);
//===

const App = () => {
  const [storybookEnabled, setStorybookEnabled] = useState(false);

  // Make toggle function available globally in dev mode
  useEffect(() => {
    const checkUpdatesAndFirstLaunch = async () => {
      // Check for app updates
      const updateInfo = await updateService.checkForUpdates();
      if (updateInfo?.shouldUpdate) {
        Alert.alert(
          'Update Available',
          'A new version is available. Would you like to update now?',
          [
            {
              text: 'Update',
              onPress: async () => {
                const started = await updateService.startFlexibleUpdate();
                if (started) {
                  Alert.alert(
                    'Update Downloaded',
                    'The update has been downloaded. The app will update on next launch.',
                    [
                      {
                        text: 'OK',
                        onPress: () => updateService.completeFlexibleUpdate(),
                      },
                    ],
                  );
                }
              },
            },
            {
              text: 'Later',
              style: 'cancel',
            },
          ],
        );
      }

      // Check first launch
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          // First time launch - capture install event
          posthog.capture('app_installed', {
            platform: Platform.OS,
            version: Platform.Version,
          });
          await AsyncStorage.setItem('hasLaunched', 'true');
        }

        // Capture app open event with context
        posthog.capture('app_opened', {
          platform: Platform.OS,
          version: Platform.Version,
          isDev: __DEV__,
        });
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    checkUpdatesAndFirstLaunch();

    if (__DEV__) {
      // Add a "Toggle Storybook" item to the Dev Menu
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setStorybookEnabled(prev => !prev);
      });
    }
  }, []);

  return storybookEnabled ? <StorybookUIRoot /> : <AppNavigator />;
};

export default Sentry.wrap(App);
