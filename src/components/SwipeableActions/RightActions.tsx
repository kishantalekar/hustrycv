import {COLORS} from '@/theme';
import {Resume} from '@/types';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './RightActions.styles';

interface RightActionsProps {
  progress: SharedValue<number>;
  drag: SharedValue<number>;
  item?: Resume;
  id?: string;
  handleDelete: (id: string) => void;
}

export function RightActions({
  progress,
  drag,
  item,
  handleDelete,
  id,
}: Readonly<RightActionsProps>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 100}],
    };
  });

  return (
    <TouchableOpacity onPress={() => handleDelete(id ?? item?.metadata?.id)}>
      <Animated.View style={[styles.deleteAction, styleAnimation]}>
        <Icon name="delete" size={24} color={COLORS.white} />
        <Text style={styles.deleteActionText}>Delete</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
