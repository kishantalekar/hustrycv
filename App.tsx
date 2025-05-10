import * as Sentry from '@sentry/react-native';
import React, {useEffect, useState} from 'react';
import {DevSettings} from 'react-native';
import StorybookUIRoot from './.storybook';
import {AppNavigator} from './src/navigation/AppNavigator';

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

// setJSExceptionHandler((error, _) => {
//   Sentry.captureException(error);
// }, true);

// // Handle native exceptions
// setNativeExceptionHandler(
//   exceptionString => {
//     // This is a native-only handler and cannot display UI
//     // But we can still log to Sentry
//     Sentry.captureMessage(`Native Exception: ${exceptionString}`);
//   },
//   false,
//   true,
// );
const App = () => {
  const [storybookEnabled, setStorybookEnabled] = useState(false);

  // Make toggle function available globally in dev mode
  useEffect(() => {
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
