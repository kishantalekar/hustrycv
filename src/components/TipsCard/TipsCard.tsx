import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {COLORS} from '@/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './TipsCard.styles';
import {TipsCardProps} from './TipsCard.types';

export const TipsCard: React.FC<TipsCardProps> = ({
  title = 'Tips',
  tips,
  variant = 'default',
  dismissible = true,
  onDismiss,
  autoHide = false,
  autoHideDelay = 5000,
  showOnce = false,
  storageKey,
  position = 'inline',
  animationType = 'fade',
  maxWidth,
  backgroundColor,
  borderColor,
}) => {
  const [visible, setVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-100));

  const handleDismiss = useCallback(async () => {
    if (showOnce && storageKey) {
      try {
        await AsyncStorage.setItem(storageKey, 'true');
      } catch (error) {
        console.warn('Error saving to AsyncStorage:', error);
      }
    }

    // Hide animation
    const animation =
      animationType === 'fade'
        ? Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          })
        : Animated.timing(slideAnim, {
            toValue: -100,
            duration: 200,
            useNativeDriver: true,
          });

    animation.start(() => {
      setVisible(false);
      onDismiss?.();
    });
  }, [showOnce, storageKey, animationType, fadeAnim, slideAnim, onDismiss]);

  useEffect(() => {
    const checkShowOnce = async () => {
      if (showOnce && storageKey) {
        try {
          const hasBeenShown = await AsyncStorage.getItem(storageKey);
          if (hasBeenShown) {
            setVisible(false);
            return;
          }
        } catch (error) {
          console.warn('Error checking AsyncStorage:', error);
        }
      }

      // Show animation
      if (animationType === 'fade') {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else if (animationType === 'slide') {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };

    checkShowOnce();

    // Auto hide functionality
    if (autoHide && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [
    animationType,
    autoHide,
    autoHideDelay,
    fadeAnim,
    handleDismiss,
    showOnce,
    slideAnim,
    storageKey,
  ]);

  if (!visible) {
    return null;
  }

  const getContainerStyle = () => {
    const baseStyle = [
      variant === 'compact'
        ? styles.tipsCardCompact
        : variant === 'floating'
        ? styles.tipsCardFloating
        : styles.tipsCard,
    ];

    const customStyles: any = {};
    if (backgroundColor) {
      customStyles.backgroundColor = backgroundColor;
    }
    if (borderColor) {
      customStyles.borderColor = borderColor;
    }
    if (maxWidth) {
      customStyles.maxWidth = maxWidth;
      customStyles.alignSelf = 'center';
    }

    if (Object.keys(customStyles).length > 0) {
      baseStyle.push(customStyles);
    }

    if (variant === 'floating') {
      baseStyle.push(styles.floatingPosition);
    }

    return baseStyle;
  };

  const getAnimatedStyle = () => {
    if (animationType === 'fade') {
      return {opacity: fadeAnim};
    } else if (animationType === 'slide') {
      return {transform: [{translateY: slideAnim}]};
    }
    return {};
  };

  return (
    <Animated.View style={[getContainerStyle(), getAnimatedStyle()]}>
      <View style={styles.tipsHeader}>
        <Icon
          name="lightbulb"
          size={variant === 'compact' ? 20 : 24}
          color={COLORS.primary}
        />
        <Text
          style={[
            variant === 'compact' ? styles.tipsTitleCompact : styles.tipsTitle,
            styles.titleFlex,
          ]}>
          {title}
        </Text>
        {dismissible && (
          <TouchableOpacity
            onPress={handleDismiss}
            style={styles.dismissButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="close" size={20} color={COLORS.text.secondary} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={
          variant === 'compact' ? styles.tipsContentCompact : styles.tipsContent
        }>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Icon
              name={tip.icon}
              size={variant === 'compact' ? 16 : 20}
              color={tip.iconColor || COLORS.text.secondary}
            />
            <Text
              style={
                variant === 'compact' ? styles.tipTextCompact : styles.tipText
              }>
              {tip.text}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};
