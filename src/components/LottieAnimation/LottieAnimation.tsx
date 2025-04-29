import React from 'react';
import LottieView, {AnimationObject} from 'lottie-react-native';
import {StyleSheet, ViewStyle} from 'react-native';

interface LottieAnimationProps {
  source: string | AnimationObject | {uri: string};
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  style?: ViewStyle;
  onAnimationFinish?: () => void;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  autoPlay = true,
  loop = true,
  speed = 1,
  style,
  onAnimationFinish,
}) => {
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      speed={speed}
      style={[styles.animation, style]}
      onAnimationFinish={onAnimationFinish}
    />
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});
