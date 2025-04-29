import React, {useEffect, useState} from 'react';
import {DevSettings} from 'react-native';
import StorybookUIRoot from './.storybook';
import {AppNavigator} from './src/navigation/AppNavigator';

const App = () => {
  const [storybookEnabled, setStorybookEnabled] = useState(true);

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

export default App;
