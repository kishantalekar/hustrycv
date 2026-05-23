import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TipsCard} from '@/components';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Components/TipsCard',
  component: TipsCard,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TipsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
});

const defaultTips = [
  {
    icon: 'lightbulb',
    text: 'Keep your resume concise and focused',
    iconColor: '#FA6607',
  },
  {
    icon: 'format-list-bulleted',
    text: 'Use bullet points for better readability',
    iconColor: '#FA6607',
  },
  {
    icon: 'star',
    text: 'Highlight your key achievements',
    iconColor: '#FA6607',
  },
];

export const Default: Story = {
  args: {
    title: 'Resume Writing Tips',
    tips: defaultTips,
    variant: 'default',
    dismissible: true,
  },
};

export const Compact: Story = {
  args: {
    title: 'Quick Tips',
    tips: defaultTips,
    variant: 'compact',
    dismissible: true,
  },
};

export const Floating: Story = {
  args: {
    title: 'Pro Tips',
    tips: defaultTips,
    variant: 'floating',
    position: 'bottom',
    dismissible: true,
    backgroundColor: '#FA6607',
    borderColor: '#E5E7EB',
  },
};

export const AutoHide: Story = {
  args: {
    title: 'Auto-hiding Tips',
    tips: defaultTips,
    autoHide: true,
    autoHideDelay: 3000,
    animationType: 'fade',
  },
};

export const ShowOnce: Story = {
  args: {
    title: 'One-time Tips',
    tips: defaultTips,
    showOnce: true,
    storageKey: 'tips_shown',
    animationType: 'slide',
  },
};

export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Tips',
    tips: defaultTips,
    backgroundColor: '#4CAF50',
    borderColor: '#E5E7EB',
    maxWidth: 400,
  },
};
