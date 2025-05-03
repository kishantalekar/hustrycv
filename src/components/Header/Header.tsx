import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '@/theme';
import {styles} from './Header.styles';
import {HeaderProps} from './Header.types';
import {CustomIcon} from '../CustomIcon';

export const Header: React.FC<HeaderProps> = ({
  title,
  rightIcon,
  onRightPress,
  showBack = true,
  rightComponent,
  leftIcon = 'arrow-back',
  onLeftPress,
  iconVariant = 'material',
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          if (onLeftPress) {
            onLeftPress();
          } else {
            showBack && navigation.goBack();
          }
        }}
        disabled={!showBack}>
        {showBack && (
          <CustomIcon
            variant={iconVariant}
            name={leftIcon}
            size={24}
            color={COLORS.text.primary}
          />
        )}
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={onRightPress}
        disabled={!rightIcon && !rightComponent}>
        {rightIcon ? (
          <Icon name={rightIcon} size={24} color={COLORS.text.primary} />
        ) : (
          rightComponent
        )}
      </TouchableOpacity>
    </View>
  );
};
