import {COLORS} from '@/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RightActions} from '../SwipeableActions/RightActions';

interface CollapsibleCardProps {
  expanded: boolean;
  onToggle: () => void;
  header: React.ReactElement;
  children: React.ReactNode;
  style?: object;
  id?: string;
  handleDelete: (id: string) => void;
}

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  expanded,
  onToggle,
  header,
  children,
  style,
  id,
  handleDelete,
}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ReanimatedSwipeable
        enabled={!expanded}
        friction={1}
        dragOffsetFromRightEdge={80}
        dragOffsetFromLeftEdge={80}
        onSwipeableOpen={direction => console.log('Opened:', direction)}
        onSwipeableClose={direction => console.log('Closed:', direction)}
        onSwipeableWillOpen={direction => console.log('Will open:', direction)}
        onSwipeableWillClose={direction =>
          console.log('Will close:', direction)
        }
        renderRightActions={(progress, translation) =>
          RightActions({
            progress,
            drag: translation,
            handleDelete: handleDelete,
            id: id,
          })
        }>
        <View style={[styles.card, style]}>
          <TouchableOpacity style={styles.header} onPress={onToggle}>
            <View style={styles.headerContent}>{header}</View>
            <Icon
              name={expanded ? 'expand-less' : 'expand-more'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
          {expanded && <View style={styles.content}>{children}</View>}
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: COLORS.border,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  headerContent: {
    flex: 1,
  },
  content: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
});
