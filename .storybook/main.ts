import {StorybookConfig} from '@storybook/react-native';

const main: StorybookConfig = {
  stories: [
    './stories/**/*.stories.?(ts|tsx|js|jsx)',
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};

export default main;
