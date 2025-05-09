import {FONTS} from '@/constants';
import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import RenderHTML from 'react-native-render-html';

interface HTMLPreviewProps {
  html: string;
  placeholder?: string;
  maxLines?: number;
  style?: any;
}

export const HTMLPreview: React.FC<HTMLPreviewProps> = ({
  html,
  placeholder = 'No content',
  maxLines = 3,
  style,
}) => {
  const {width} = useWindowDimensions();

  const baseStyle = {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    lineHeight: 20,
    ...style,
  };

  return (
    <View style={styles.container}>
      {html ? (
        <View style={styles.htmlContainer}>
          <RenderHTML
            contentWidth={width - 64}
            source={{html}}
            baseStyle={baseStyle}
            enableExperimentalMarginCollapsing
            defaultTextProps={{
              numberOfLines: maxLines,
            }}
          />
        </View>
      ) : (
        <Text style={[styles.placeholder, style]} numberOfLines={maxLines}>
          {placeholder}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    maxHeight: 80,
  },
  htmlContainer: {
    overflow: 'hidden',
  },
  placeholder: {
    fontSize: 14,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
    color: '#666',
    lineHeight: 20,
  },
});
