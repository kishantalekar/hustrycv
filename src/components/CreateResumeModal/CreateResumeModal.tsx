import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './CreateResumeModal.styles';

interface CreateResumeModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateManual: () => void;
  onUploadResume: () => void;
  onImportResume: () => void;
}

export const CreateResumeModal: React.FC<CreateResumeModalProps> = ({
  visible,
  onClose,
  onCreateManual,
  onUploadResume,
  onImportResume,
}) => {
  const translateY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          styles.dropdown,
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
            opacity: translateY,
          },
        ]}>
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={e => {
            e.stopPropagation();
            onCreateManual();
          }}>
          <Text style={styles.dropdownItemText}>Create Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dropdownItem, {borderBottomWidth: 0}]}
          onPress={e => {
            e.stopPropagation();
            onUploadResume();
          }}>
          <Text style={styles.dropdownItemText}>Upload Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dropdownItem, {borderBottomWidth: 0}]}
          onPress={e => {
            e.stopPropagation();
            onImportResume();
          }}>
          <Text style={styles.dropdownItemText}>Import From LinkedIn</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
