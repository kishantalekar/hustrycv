import React, {useState} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {TipsCard} from './TipsCard';
import {TipSets, TipsManager, TipUtils} from './TipsManager';
import {COLORS} from '@/theme';
import {FONTS} from '@/constants';

// Example usage of TipsCard in different scenarios
export const TipsCardExamples = () => {
  // const [showFloatingTip, setShowFloatingTip] = useState(false);
  const tipsManager = TipsManager.getInstance();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>TipsCard Examples</Text>

      {/* Default Tips Card */}
      <View style={styles.section}>
        <Text style={styles.exampleTitle}>1. Default Skills Tips</Text>
        <TipsCard
          tips={TipSets.skills}
          variant="default"
          dismissible={true}
          showOnce={false}
          animationType="fade"
        />
      </View>

      {/* Compact Tips Card */}
      <View style={styles.section}>
        <Text style={styles.exampleTitle}>2. Compact Work Tips</Text>
        <TipsCard
          tips={TipSets.work}
          variant="compact"
          dismissible={true}
          showOnce={false}
          animationType="slide"
        />
      </View>

      {/* Auto-hide Tips Card */}
      <View style={styles.section}>
        <Text style={styles.exampleTitle}>3. Auto-hide Dashboard Tips</Text>
        <TipsCard
          tips={TipSets.dashboard}
          variant="default"
          dismissible={false}
          autoHide={true}
          autoHideDelay={3000}
          animationType="fade"
        />
      </View>

      {/* Custom Tips */}
      <View style={styles.section}>
        <Text style={styles.exampleTitle}>4. Custom Tips with Colors</Text>
        <TipsCard
          title="Pro Tips"
          tips={[
            {
              icon: 'star',
              text: 'Use action verbs to describe your achievements',
              iconColor: COLORS.primary,
            },
            {
              icon: 'trending-up',
              text: 'Quantify your impact with numbers and percentages',
              iconColor: '#4CAF50',
            },
          ]}
          variant="default"
          dismissible={true}
          backgroundColor="#F8F9FA"
          borderColor={COLORS.primary}
        />
      </View>

      {/* Contextual Tips */}
      <View style={styles.section}>
        <Text style={styles.exampleTitle}>
          5. Contextual Tips (First Time User)
        </Text>
        <TipsCard
          tips={tipsManager.getContextualTips({
            screen: 'skills',
            hasData: false,
            isFirstTime: true,
          })}
          variant="default"
          dismissible={true}
          showOnce={true}
          storageKey="first_time_skills_tips"
        />
      </View>

      {/* Empty State Tips */}
      <View style={styles.section}>
        <Text style={styles.exampleTitle}>6. Empty State Tips</Text>
        <TipsCard
          title="Getting Started"
          tips={TipUtils.createEmptyStateTips('skill')}
          variant="compact"
          dismissible={true}
        />
      </View>

      {/* Validation Tips */}
      <View style={styles.section}>
        <Text style={styles.exampleTitle}>7. Form Validation Tips</Text>
        <TipsCard
          title="Form Help"
          tips={TipUtils.createValidationTips()}
          variant="compact"
          dismissible={true}
          backgroundColor="#FFF3CD"
          borderColor="#FFEAA7"
        />
      </View>

      {/* Quick Tip */}
      <View style={styles.section}>
        <Text style={styles.exampleTitle}>8. Quick Single Tip</Text>
        <TipsCard
          title="Quick Tip"
          tips={[
            TipUtils.createQuickTip(
              'Save your progress frequently to avoid losing work',
            ),
          ]}
          variant="compact"
          dismissible={true}
          autoHide={true}
          autoHideDelay={4000}
        />
      </View>
    </ScrollView>
  );
};

// Usage examples for different screens
export const ScreenSpecificExamples = {
  // Dashboard screen
  Dashboard: () => (
    <TipsCard
      tips={TipSets.dashboard}
      variant="default"
      dismissible={true}
      showOnce={true}
      storageKey="dashboard_tips_shown"
      animationType="slide"
    />
  ),

  // Work experience screen
  WorkExperience: () => (
    <TipsCard
      tips={TipSets.work}
      variant="compact"
      dismissible={true}
      showOnce={true}
      storageKey="work_tips_shown"
    />
  ),

  // Preview screen
  Preview: () => (
    <TipsCard
      tips={TipSets.preview}
      variant="floating"
      position="floating"
      dismissible={true}
      autoHide={true}
      autoHideDelay={5000}
      animationType="slide"
    />
  ),

  // Onboarding screen
  Onboarding: () => (
    <TipsCard
      tips={TipSets.onboarding}
      variant="compact"
      dismissible={false}
      autoHide={true}
      autoHideDelay={6000}
      backgroundColor="rgba(250, 102, 7, 0.1)"
      borderColor={COLORS.primary}
    />
  ),
};

// Hook for managing tips in components
export const useTips = (screenName: string) => {
  const [tipsVisible, setTipsVisible] = useState(true);
  const tipsManager = TipsManager.getInstance();

  const showTips = (context: {
    hasData?: boolean;
    isFirstTime?: boolean;
    userLevel?: 'beginner' | 'intermediate' | 'advanced';
  }) => {
    return tipsManager.getContextualTips({
      screen: screenName,
      ...context,
    });
  };

  const hideTips = () => {
    setTipsVisible(false);
  };

  return {
    tipsVisible,
    showTips,
    hideTips,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: FONTS.FIRA_SANS.BOLD,
    color: COLORS.text.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  exampleTitle: {
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: COLORS.text.primary,
    marginBottom: 8,
  },
});
