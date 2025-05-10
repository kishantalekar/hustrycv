import {AppNavigator} from '@/navigation/AppNavigator';
import * as Sentry from '@sentry/react-native';
import React, {useEffect, useState} from 'react';
import {DevSettings} from 'react-native';
import StorybookUIRoot from './.storybook';
import {posthog} from './src/analytics/posthog/PostHog';

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

const App = () => {
  const [storybookEnabled, setStorybookEnabled] = useState(false);

  // Make toggle function available globally in dev mode
  useEffect(() => {
    posthog.capture('App started');
    if (__DEV__) {
      // Add a "Toggle Storybook" item to the Dev Menu
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setStorybookEnabled(prev => !prev);
      });
    }
  }, []);

  return storybookEnabled ? (
    <StorybookUIRoot />
  ) : (
    // <PostHogProvider
    //   client={posthog}
    //   apiKey="phc_Kdp1tWMDGoBrXxA1FHo0NXoxrNy18O9SE35cm8YN5vn"
    //   options={{
    //     host: 'https://us.i.posthog.com',
    //   }}>
    <AppNavigator />
    // </PostHogProvider>
  );
};

export default Sentry.wrap(App);
