export interface FormItemProps {
  item: {
    id: string;
    title: string;
    screenName: string;
  };
  isActive?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
}
