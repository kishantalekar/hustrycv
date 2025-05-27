import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import {useResumeStore} from '@/store/useResumeStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SPACING, TYPOGRAPHY, FONT_WEIGHT} from '@/theme';
import {globalStyles} from '@/styles/globalStyles';
import {analyzeResumeWithAI} from '@/utils/ai/resumeParser';
import {LottieAnimation, Button} from '@/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';

interface ScoreSection {
  name: string;
  score: number;
  feedback: string;
  recommendations: string[];
}

interface ResumeScore {
  overall: number;
  sections: ScoreSection[];
}

const SECTION_ICONS: {[key: string]: string} = {
  'Basic Information': 'account-circle-outline',
  'Work Experience': 'briefcase-outline',
  Education: 'school-outline',
  Skills: 'star-outline',
  Projects: 'lightbulb-on-outline',
  Certifications: 'certificate-outline',
  Default: 'file-document-outline',
};

export const AIImprove = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeScore, setResumeScore] = useState<ResumeScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {getActiveResume} = useResumeStore();

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    setError(null);
    setResumeScore(null);
    try {
      const activeResume = getActiveResume();
      if (!activeResume) {
        setError('No active resume found to analyze.');
        return;
      }

      const resumeText = JSON.stringify(activeResume);
      const scoringPrompt = `Please analyze this resume and provide a detailed evaluation with:
        1. Overall Score (0-100) based on:
           - Content Quality (40%)
           - Format & Structure (30%)
           - Impact & Clarity (30%)

        2. Section-by-Section Analysis (0-100 for each):
           - Basic Information
           - Work Experience
           - Education
           - Skills
           - Projects
           - Certifications (if applicable)

        3. For each section provide:
           - Specific score
           - Detailed feedback on strengths/weaknesses
           - 2-3 actionable recommendations

        Response Format:
        {
          "overall": number,
          "sections": [{
            "name": string,
            "score": number,
            "feedback": string,
            "recommendations": string[]
          }]
        }

        Resume to analyze: ${resumeText}`;

      const analysisResult = await analyzeResumeWithAI(scoringPrompt);
      if (
        !analysisResult ||
        typeof analysisResult.overall !== 'number' ||
        !Array.isArray(analysisResult.sections) // Add this check
      ) {
        setError('Failed to get a valid analysis. Please try again.');
        throw new Error('Invalid analysis result format');
      }
      setResumeScore(analysisResult);
    } catch (err) {
      console.error('Error analyzing resume:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during analysis.',
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const ScoreCircle = ({score, size = 120}: {score: number; size?: number}) => (
    <View style={[styles.scoreCircleContainer, {width: size, height: size}]}>
      <Progress.Circle
        size={size}
        progress={score / 100}
        showsText
        formatText={() => `${score}`}
        textStyle={styles.scoreCircleText}
        color={COLORS.primary}
        unfilledColor={COLORS.background.tertiary}
        borderWidth={0}
        thickness={size * 0.1}
        strokeCap="round"
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.startContainer}>
      <LottieAnimation
        source={require('@/assets/animations/ai_robot_analysis.json')}
        style={styles.emptyStateAnimation}
        loop={true}
        autoPlay={true}
      />
      <Text style={styles.startTitle}>Unlock Your Resume's Potential</Text>
      <Text style={styles.startDescription}>
        Let our AI analyze your resume and provide actionable insights to help
        you stand out.
      </Text>
      <Button
        title="Start Analysis"
        onPress={analyzeResume}
        style={styles.startButton}
        iconSource={() => (
          <Icon name="brain" size={20} color={COLORS.text.light} />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <LottieAnimation
        source={require('@/assets/animations/fox_ meditating.json')}
        style={styles.animation}
        loop={true}
        autoPlay={true}
      />
      <Text style={styles.loadingText}>Our AI is working its magic...</Text>
      <Text style={styles.loadingSubtitle}>
        Analyzing your resume, please wait.
      </Text>
      <Progress.Bar
        indeterminate
        width={200}
        color={COLORS.primary}
        style={styles.progressBar}
      />
    </View>
  );

  if (isAnalyzing) {
    return renderLoadingState();
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}>
        {!resumeScore && !isAnalyzing ? (
          renderEmptyState()
        ) : resumeScore ? (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Resume Analysis Report</Text>
              <ScoreCircle score={resumeScore.overall} size={150} />
              <Text style={styles.overallScoreLabel}>Overall Score</Text>
              <Button
                title="Re-analyze Resume"
                onPress={analyzeResume}
                style={styles.reanalyzeButton}
                variant="outline"
                iconSource={() => (
                  <Icon name="refresh" size={18} color={COLORS.primary} />
                )}
              />
            </View>

            {error && <Text style={styles.errorTextCenter}>{error}</Text>}

            <View style={styles.sectionsContainer}>
              {resumeScore.sections
                .filter(
                  (section: ScoreSection) =>
                    section &&
                    typeof section.name === 'string' &&
                    typeof section.score === 'number' &&
                    typeof section.feedback === 'string' &&
                    Array.isArray(section.recommendations),
                )
                .map((section, index) => (
                  <View key={index} style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                      <Icon
                        name={
                          SECTION_ICONS[section.name] || SECTION_ICONS.Default
                        }
                        size={24}
                        color={COLORS.primary}
                        style={styles.sectionIcon}
                      />
                      <Text style={styles.sectionName}>{section.name}</Text>
                      <View style={styles.scoreContainer}>
                        <Text style={styles.sectionScore}>{section.score}</Text>
                        <Text style={styles.scoreOutOf}>/100</Text>
                      </View>
                    </View>
                    <Progress.Bar
                      progress={section.score / 100}
                      width={null} // Takes full width of parent
                      color={COLORS.secondary} // Use a different color for section progress
                      unfilledColor={COLORS.background.tertiary}
                      borderWidth={0}
                      height={6}
                      style={styles.sectionProgressBar}
                    />
                    <Text style={styles.feedbackTitle}>Feedback:</Text>
                    <Text style={styles.feedbackText}>{section.feedback}</Text>
                    <View style={styles.recommendationsContainer}>
                      <Text style={styles.recommendationsTitle}>
                        <Icon
                          name="lightbulb-on-outline"
                          size={18}
                          color={COLORS.accent.warning}
                        />{' '}
                        Recommendations:
                      </Text>
                      {section.recommendations.map(
                        (recommendation, recIndex) => (
                          <View
                            key={recIndex}
                            style={styles.recommendationItem}>
                            <Icon
                              name="check-circle-outline"
                              size={16}
                              color={COLORS.accent.success}
                              style={styles.bulletPoint}
                            />
                            <Text style={styles.recommendationText}>
                              {recommendation}
                            </Text>
                          </View>
                        ),
                      )}
                    </View>
                  </View>
                ))}
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContentContainer: {
    flexGrow: 1, // Ensures content can scroll if it overflows
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    padding: SPACING.lg,
  },
  animation: {
    width: 250,
    height: 250,
    marginBottom: SPACING.lg,
  },
  emptyStateAnimation: {
    width: 280,
    height: 280,
    marginBottom: SPACING.md,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  loadingSubtitle: {
    fontSize: TYPOGRAPHY.size.md, // Updated from FONT_SIZE.md
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  progressBar: {
    marginTop: SPACING.md,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    paddingTop: SPACING.xxl, // More space at the top
  },
  startTitle: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  startDescription: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: TYPOGRAPHY.size.md * 1.5,
  },
  startButton: {
    width: '90%',
    maxWidth: 320,
  },
  header: {
    padding: SPACING.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  scoreCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  scoreCircleText: {
    fontSize: TYPOGRAPHY.size.xxxl, // Larger score text
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary, // Match progress color
  },
  overallScoreLabel: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  reanalyzeButton: {
    marginTop: SPACING.lg,
    borderColor: COLORS.primary,
  },
  sectionsContainer: {
    padding: SPACING.md,
  },
  sectionCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionIcon: {
    marginRight: SPACING.sm,
  },
  sectionName: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    flex: 1, // Allow text to take available space
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  sectionScore: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
  },
  scoreOutOf: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  sectionProgressBar: {
    marginVertical: SPACING.sm,
    borderRadius: SPACING.xs,
  },
  feedbackTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  feedbackText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    lineHeight: TYPOGRAPHY.size.sm * 1.6,
    marginBottom: SPACING.md,
  },
  recommendationsContainer: {
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  recommendationsTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start for multi-line text
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.xs,
  },
  bulletPoint: {
    marginRight: SPACING.sm,
    marginTop: SPACING.xxs, // Adjust for better alignment with text
  },
  recommendationText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    flex: 1,
    lineHeight: TYPOGRAPHY.size.sm * 1.6,
  },
  errorText: {
    marginTop: SPACING.lg,
    color: COLORS.accent.error,
    fontSize: TYPOGRAPHY.size.md,
    textAlign: 'center',
  },
  errorTextCenter: {
    color: COLORS.accent.error,
    fontSize: TYPOGRAPHY.size.md,
    textAlign: 'center',
    marginVertical: SPACING.md,
  },
});
