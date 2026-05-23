/**
 * AIImprove Screen — Phase 5.6 Redesign
 *
 * Two-tier feedback system:
 *   1. Instant: rule-based completeness score (no API, no wait)
 *   2. Deep: Gemini AI analysis on demand
 *
 * The old screen fired an AI request immediately on mount.
 * The new screen shows useful data instantly, then lets the user
 * choose to run the expensive AI deep-analysis.
 */

import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import {LottieAnimation, Button} from '@/components';
import {useResumeStore} from '@/store/useResumeStore';
import {selectActiveResume} from '@/store/selectors/resumeSelectors';
import {COLORS, SPACING, TYPOGRAPHY, FONT_WEIGHT, typography} from '@/theme';
import {globalStyles} from '@/styles/globalStyles';
import {
  checkResumeCompleteness,
  CompletenessResult,
  SectionCompleteness,
  CompletenessIssue,
} from '@/utils/ai/resumeCompleteness';
import {analyzeResumeWithAI} from '@/utils/ai/resumeParser';

// ─── Local Types ──────────────────────────────────────────────────────────────

interface AISection {
  name: string;
  score: number;
  feedback: string;
  recommendations: string[];
}

interface AIAnalysis {
  overall: number;
  sections: AISection[];
}

// ─── Score Color Helper ───────────────────────────────────────────────────────

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10B981'; // green
  if (score >= 60) return '#F59E0B'; // amber
  return '#EF4444'; // red
};

const SECTION_ICONS: Record<string, string> = {
  'Personal Info': 'account-circle-outline',
  'Work Experience': 'briefcase-outline',
  'Education': 'school-outline',
  'Skills': 'star-outline',
  'Projects': 'lightbulb-on-outline',
  'Certifications': 'certificate-outline',
  Default: 'file-document-outline',
};

const SEVERITY_COLORS: Record<string, string> = {
  error: '#EF4444',
  warning: '#F59E0B',
  tip: '#3B82F6',
};

const SEVERITY_ICONS: Record<string, string> = {
  error: 'alert-circle-outline',
  warning: 'alert-outline',
  tip: 'lightbulb-on-outline',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ScoreRing = ({score, size = 120}: {score: number; size?: number}) => (
  <View style={{width: size, height: size, alignItems: 'center', justifyContent: 'center'}}>
    <Progress.Circle
      size={size}
      progress={score / 100}
      showsText
      formatText={() => `${score}`}
      textStyle={{
        fontSize: size * 0.22,
        fontWeight: '700',
        color: getScoreColor(score),
      }}
      color={getScoreColor(score)}
      unfilledColor={COLORS.background?.secondary ?? '#F3F4F6'}
      borderWidth={0}
      thickness={size * 0.1}
      strokeCap="round"
    />
  </View>
);

const IssueChip = ({issue}: {issue: CompletenessIssue}) => (
  <View style={[styles.issueChip, {borderLeftColor: SEVERITY_COLORS[issue.severity]}]}>
    <Icon
      name={SEVERITY_ICONS[issue.severity]}
      size={14}
      color={SEVERITY_COLORS[issue.severity]}
      style={{marginRight: 6}}
    />
    <Text style={styles.issueText}>{issue.message}</Text>
  </View>
);

const SectionCard = ({section}: {section: SectionCompleteness}) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionCardHeader}>
      <Icon
        name={SECTION_ICONS[section.section] ?? SECTION_ICONS.Default}
        size={20}
        color={COLORS.primary}
      />
      <Text style={styles.sectionCardTitle}>{section.section}</Text>
      <Text style={[styles.sectionScore, {color: getScoreColor(section.score)}]}>
        {section.score}/100
      </Text>
    </View>
    <Progress.Bar
      progress={section.score / 100}
      width={null}
      color={getScoreColor(section.score)}
      unfilledColor={COLORS.background?.secondary ?? '#F3F4F6'}
      borderWidth={0}
      height={5}
      style={{marginTop: 6}}
    />
    {section.issues.map((issue, i) => (
      <IssueChip key={i} issue={issue} />
    ))}
  </View>
);

const AISectionCard = ({section}: {section: AISection}) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionCardHeader}>
      <Icon
        name={SECTION_ICONS[section.name] ?? SECTION_ICONS.Default}
        size={20}
        color={COLORS.primary}
      />
      <Text style={styles.sectionCardTitle}>{section.name}</Text>
      <Text style={[styles.sectionScore, {color: getScoreColor(section.score)}]}>
        {section.score}/100
      </Text>
    </View>
    <Progress.Bar
      progress={section.score / 100}
      width={null}
      color={getScoreColor(section.score)}
      unfilledColor={COLORS.background?.secondary ?? '#F3F4F6'}
      borderWidth={0}
      height={5}
      style={{marginTop: 6}}
    />
    <Text style={styles.feedbackText}>{section.feedback}</Text>
    {section.recommendations.map((rec, i) => (
      <View key={i} style={styles.recRow}>
        <Icon name="check-circle-outline" size={14} color="#10B981" />
        <Text style={styles.recText}>{rec}</Text>
      </View>
    ))}
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export const AIImprove = () => {
  const activeResume = useResumeStore(selectActiveResume);

  const [completeness, setCompleteness] = useState<CompletenessResult | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Run completeness check instantly whenever resume changes (no API call)
  useEffect(() => {
    if (activeResume) {
      const result = checkResumeCompleteness(activeResume);
      setCompleteness(result);
      // Clear previous AI analysis if resume changed significantly
      setAiAnalysis(null);
    }
  }, [activeResume]);

  const handleDeepAnalysis = async () => {
    if (!activeResume) return;
    setIsAnalyzing(true);
    setAiError(null);
    try {
      const result = await analyzeResumeWithAI(JSON.stringify(activeResume));
      setAiAnalysis(result);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!completeness) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  const overallScore = aiAnalysis?.overall ?? completeness.overall;
  const showingAI = !!aiAnalysis;

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
        {/* ── Header ──────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.title}>Resume Health</Text>
          <ScoreRing score={overallScore} size={140} />
          <Text style={styles.overallLabel}>
            {showingAI ? 'AI Score' : 'Completeness Score'}
          </Text>
        </View>

        {/* ── Quick Wins ──────────────────────────────────────────────── */}
        {!showingAI && completeness.topIssues.length > 0 && (
          <View style={styles.quickWinsCard}>
            <Text style={styles.quickWinsTitle}>
              <Icon name="bolt" size={16} color={COLORS.primary} /> Quick Wins
            </Text>
            {completeness.topIssues.map((issue, i) => (
              <IssueChip key={i} issue={issue} />
            ))}
          </View>
        )}

        {/* ── Section Breakdown ───────────────────────────────────────── */}
        <Text style={styles.sectionGroupTitle}>
          {showingAI ? 'AI Section Analysis' : 'Section Breakdown'}
        </Text>

        {showingAI
          ? aiAnalysis.sections.map((s, i) => <AISectionCard key={i} section={s} />)
          : completeness.sections.map((s, i) => <SectionCard key={i} section={s} />)
        }

        {/* ── AI Deep Analysis CTA ─────────────────────────────────────── */}
        {!showingAI && (
          <View style={styles.aiCTA}>
            <LottieAnimation
              source={require('@/assets/animations/ai_robot_analysis.json')}
              style={styles.ctaAnimation}
              loop
              autoPlay
            />
            <Text style={styles.ctaTitle}>Want deeper insights?</Text>
            <Text style={styles.ctaSubtitle}>
              Let our AI provide contextual feedback, ATS tips, and
              personalized recommendations for your resume.
            </Text>
            {aiError && <Text style={styles.errorText}>{aiError}</Text>}
            <Button
              title={isAnalyzing ? 'Analyzing...' : 'Run AI Deep Analysis'}
              onPress={handleDeepAnalysis}
              disabled={isAnalyzing}
              style={styles.ctaButton}
              leftIcon={
                isAnalyzing
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Icon name="brain" size={18} color="#fff" />
              }
            />
          </View>
        )}

        {/* ── Re-run AI ─────────────────────────────────────────── */}
        {showingAI && (
          <Button
            title="Re-run Analysis"
            variant="outline"
            onPress={handleDeepAnalysis}
            style={{marginHorizontal: SPACING.md, marginBottom: SPACING.xl}}
            leftIcon={<Icon name="refresh" size={16} color={COLORS.primary} />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {paddingBottom: 40},
  loadingContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  header: {
    alignItems: 'center',
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  title: {
    ...typography.h2,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.lg,
    color: COLORS.text.primary,
  },
  overallLabel: {
    ...typography.caption,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quickWinsCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: SPACING.md,
  },
  quickWinsTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  sectionGroupTitle: {
    fontSize: 11,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.secondary,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: SPACING.md,
  },
  sectionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionCardTitle: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.primary,
    flex: 1,
  },
  sectionScore: {
    ...typography.caption,
    fontWeight: FONT_WEIGHT.bold,
  },
  issueChip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: SPACING.xs,
    paddingLeft: 8,
    borderLeftWidth: 2,
  },
  issueText: {
    ...typography.caption,
    color: COLORS.text.secondary,
    flex: 1,
  },
  feedbackText: {
    ...typography.caption,
    color: COLORS.text.secondary,
    marginTop: SPACING.sm,
    lineHeight: 18,
  },
  recRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: SPACING.xs,
  },
  recText: {
    ...typography.caption,
    color: COLORS.text.secondary,
    flex: 1,
  },
  aiCTA: {
    margin: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  ctaAnimation: {width: 100, height: 100},
  ctaTitle: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    marginTop: SPACING.sm,
  },
  ctaSubtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginVertical: SPACING.sm,
    lineHeight: 20,
  },
  ctaButton: {
    marginTop: SPACING.sm,
    width: '100%',
  },
  errorText: {
    ...typography.caption,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
});
