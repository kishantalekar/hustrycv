import {COLORS} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from '@react-native-vector-icons/material-icons';
import {CustomIcon} from '../CustomIcon';
import {TextInput} from '../TextInput';
import {styles} from './Header.styles';
import {HeaderProps} from './Header.types';
import {useResumeStore} from '@/store/useResumeStore';
import {FEATURE_FLAGS} from '@/constants';


export const Header: React.FC<HeaderProps> = ({
  title,
  rightIcon,
  onRightPress,
  showBack = true,
  rightComponent,
  leftIcon = 'arrow-back',
  onLeftPress,
  iconVariant = 'material',
  textInputLabel = '',
  onTitleChange,
  editable = false,
  customLeftComponent,
  showPreviewButton = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const navigation = useNavigation();

  const handleTitleChange = (text: string) => {
    setTitleValue(text);
    onTitleChange?.(text);
  };

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
        {!isEditing ? (
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {titleValue.length ? titleValue : title}
            </Text>
            {editable && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}>
                <Icon name="edit" size={18} color={COLORS.text.secondary} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TextInput
            label={textInputLabel}
            value={titleValue}
            onChangeText={handleTitleChange}
            onBlur={() => setIsEditing(false)}
            autoFocus
            containerStyle={styles.textInputContainer}
            rightIcon="close"
            onRightIconPress={() => {
              setIsEditing(false);
            }}
          />
        )}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {showPreviewButton && FEATURE_FLAGS.ENABLE_NEW_EDITOR_NAV && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => useResumeStore.getState().togglePreviewVisible()}>
            <Icon name="visibility" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {customLeftComponent ?? (
          (rightIcon || rightComponent) ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onRightPress}>
              {rightIcon ? (
                <Icon name={rightIcon as any} size={24} color={COLORS.text.primary} />
              ) : (
                rightComponent
              )}
            </TouchableOpacity>
          ) : null
        )}
      </View>
    </View>
  );
};
