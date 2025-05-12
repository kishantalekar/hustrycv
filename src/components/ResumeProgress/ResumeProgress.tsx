import {COLORS, SPACING, typography} from '@/theme';
import {Resume} from '@/types';
import {calculateProgress} from '@/utils/resumeUtils';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';

interface ResumeProgressProps {
  resume: Resume;
  status?: string;
}

export const ResumeProgress = ({resume, status}: ResumeProgressProps) => {
  const progress = calculateProgress(resume);

  // Progress is now calculated from the imported utility function

  // Determine status text based on progress if not provided
  const statusText =
    status ||
    (() => {
      if (progress < 30) return 'Just started';
      if (progress < 70) return 'In progress';
      return 'Almost complete';
    })();
  const strokeWidth = 3;
  const size = 50;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Determine color based on progress
  const getProgressColor = () => {
    if (progress < 30) return COLORS.status.error;
    if (progress < 70) return COLORS.secondary;
    return COLORS.success;
  };

  const progressColor = getProgressColor();
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <View style={styles.progressCircle}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                {/* Background Circle */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={COLORS.border}
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Progress Circle */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={progressColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </G>
            </Svg>
            <View style={styles.progressTextContainer}>
              <Text style={[styles.progressText, {color: progressColor}]}>
                {progress}%
              </Text>
            </View>
          </View>
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabel}>{statusText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.sm,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING.md,
  },
  progressCircle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    ...typography.h2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressLabelContainer: {
    position: 'absolute',
    bottom: -10,
    left: -10,
  },
  progressLabel: {
    ...typography.caption,
    position: 'absolute',
    fontSize: 10,
    color: COLORS.text.secondary,
  },
  completionText: {
    ...typography.body2,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
});
