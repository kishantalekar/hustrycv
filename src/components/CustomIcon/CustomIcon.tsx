import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {CustomIconProps} from './CustomIcon.types';

export const CustomIcon: React.FC<CustomIconProps> = ({
  variant = 'material',
  name,
  ...props
}) => {
  const IconComponent = {
    material: MaterialIcons,
    octicon: Octicons,
    fontawesome: FontAwesome,
    ionicon: Ionicons,
    antdesign: AntDesign,
  }[variant];

  return <IconComponent name={name} {...props} />;
};
