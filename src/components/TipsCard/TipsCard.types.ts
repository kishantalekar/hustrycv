export interface TipItem {
  icon: string;
  text: string;
  iconColor?: string;
}

export interface TipsCardProps {
  title?: string;
  tips: TipItem[];
  variant?: 'default' | 'compact' | 'floating';
  dismissible?: boolean;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
  showOnce?: boolean;
  storageKey?: string;
  position?: 'top' | 'bottom' | 'inline';
  animationType?: 'slide' | 'fade' | 'none';
  maxWidth?: number;
  backgroundColor?: string;
  borderColor?: string;
}

export interface TipsCardState {
  visible: boolean;
  dismissed: boolean;
}
