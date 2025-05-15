import {ResumeProgress} from '@/components/ResumeProgress/ResumeProgress';
import {RightActions} from '@/components/SwipeableActions/RightActions';
import {calculateProgress, getCompletionStatus} from '@/utils/resumeUtils';
import {Text, TouchableOpacity, View} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {styles} from './Dashboard.styles';

interface RenderResumeItemProps {
  item: Resume;
  handleDelete: (id: string) => void;
  handleResumePress: (id: string) => void;
}

export const renderResumeItem = ({
  item,
  handleDelete,
  handleResumePress,
}: RenderResumeItemProps) => {
  const lastModified = new Date(item.metadata.updatedAt).toLocaleDateString();
  const progress = calculateProgress(item);
  const status = getCompletionStatus(progress);
  const title = item.metadata.title || item.basics.name || 'Untitled Resume';
  return (
    <ReanimatedSwipeable
      renderRightActions={(progress, translation) =>
        RightActions({progress, drag: translation, item, handleDelete})
      }
      friction={1}
      dragOffsetFromRightEdge={80}
      dragOffsetFromLeftEdge={80}
      onSwipeableOpen={direction => console.log('Opened:', direction)}
      onSwipeableClose={direction => console.log('Closed:', direction)}
      onSwipeableWillOpen={direction => console.log('Will open:', direction)}
      onSwipeableWillClose={direction => console.log('Will close:', direction)}
      containerStyle={styles.swipeableContainer}>
      <TouchableOpacity
        style={styles.resumeCard}
        activeOpacity={0.7}
        onPress={() => handleResumePress(item.metadata.id)}>
        <View style={styles.resumePreview}>
          <ResumeProgress resume={item} status={status} />
        </View>
        <View style={styles.resumeInfo}>
          <Text style={styles.resumeName}>{title}</Text>
          <View style={styles.resumeMetaRow}>
            <Text style={styles.resumeDate}>Last modified: {lastModified}</Text>
            <Text style={styles.resumeTemplate}>
              Template: {item.metadata.templateId}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
};
