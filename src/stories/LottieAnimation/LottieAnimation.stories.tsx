import React from 'react';
import {View} from 'react-native';
import type {Meta, StoryObj} from '@storybook/react';
import {LottieAnimation} from '../../components/LottieAnimation/LottieAnimation';

const meta = {
  title: 'Components/LottieAnimation',
  component: LottieAnimation,
  decorators: [
    Story => (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof LottieAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CvLoading: Story = {
  args: {
    source: require('../../assets/animations/cv_loading.json'),
    autoPlay: true,
    loop: true,
    style: {width: 150, height: 150},
  },
};

export const FoxCongratulation: Story = {
  args: {
    source: require('../../assets/animations/fox_congratulation.json'),
    autoPlay: true,
    loop: false,
    style: {width: 200, height: 200},
  },
};

export const FoxMeditating: Story = {
  args: {
    source: require('../../assets/animations/fox_ meditating.json'),
    autoPlay: true,
    loop: true,
    speed: 2,
    style: {width: 100, height: 100},
  },
};
export const FoxWalking: Story = {
  args: {
    source: require('../../assets/animations/fox_walking.json'),
    autoPlay: true,
    loop: true,
    speed: 2,
    style: {width: 100, height: 100},
  },
};
export const GiraffeMeditating: Story = {
  args: {
    source: require('../../assets/animations/giraffe_ meditating.json'),
    autoPlay: true,
    loop: true,
    speed: 2,
    style: {width: 100, height: 100},
  },
};
