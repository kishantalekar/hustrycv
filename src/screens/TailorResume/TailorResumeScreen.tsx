/**
 * TailorResumeScreen — Phase 5.8
 *
 * Allows the user to paste a job description and get:
 *   - ATS match score
 *   - Missing keywords to add
 *   - A tailored summary suggestion
 *   - Improved bullet point suggestions per work entry
 *
 * Uses jobMatchAI.ts which sends a compact resume snapshot to Gemini.
 */

import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import {LottieAnimation, Button} from '@/components';
import {Header} from '@/components/Header';
import {useResumeStore} from '@/store/useResumeStore';
import {selectActiveResume} from '@/store/selectors/resumeSelectors';
import {COLORS, SPACING, TYPOGRAPHY, FONT_WEIGHT, typography} from '@/theme';
import {globalStyles} from '@/styles/globalStyles';
import {tailorResumeForJob, JobMatchResult} from '@/utils/ai/jobMatchAI';

// ─── Score Color ──────────────────────────────────────────────────────────────

const getScoreColor = (score: number) => {
  if (score >= 75) return '#10B981';
  if (score >= 50) return '#F59E0B';
  return '#EF4444';
};

// ─── Result Sections ──────────────────────────────────────────────────────────

const ATSScoreBadge = ({score}: {score: number}) => (
  <View style={styles.atsBadge}>
    <Progress.Circle
      size={100}
      progress={score / 100}
      showsText
      formatText={() => `${score}%`}
      textStyle={{fontSize: 20, fontWeight: '700', color: getScoreColor(score)}}
      color={getScoreColor(score)}
      unfilledColor={COLORS.background?.secondary ?? '#F3F4F6'}
      borderWidth={0}
      thickness={10}
      strokeCap="round"
    />
    <Text style={styles.atsBadgeLabel}>ATS Match Score</Text>
  </View>
);

const KeywordsPanel = ({
  missing,
  matched,
}: {
  missing: string[];
  matched: string[];
}) => (
  <View style={styles.panel}>
    {missing.length > 0 && (
      <>
        <Text style={styles.panelTitle}>
          <Icon name="alert-outline" size={14} color="#EF4444" /> Missing Keywords
        </Text>
        <View style={styles.chipsRow}>
          {missing.map((kw, i) => (
            <View key={i} style={[styles.chip, {borderColor: '#FCA5A5', backgroundColor: '#FEF2F2'}]}>
              <Text style={[styles.chipText, {color: '#B91C1C'}]}>{kw}</Text>
            </View>
          ))}
        </View>
      </>
    )}
    {matched.length > 0 && (
      <>
        <Text style={[styles.panelTitle, {marginTop: SPACING.sm}]}>
          <Icon name="check-circle-outline" size={14} color="#10B981" /> Already Matched
        </Text>
        <View style={styles.chipsRow}>
          {matched.map((kw, i) => (
            <View key={i} style={[styles.chip, {borderColor: '#6EE7B7', backgroundColor: '#ECFDF5'}]}>
              <Text style={[styles.chipText, {color: '#065F46'}]}>{kw}</Text>
            </View>
          ))}
        </View>
      </>
    )}
  </View>
);

const SummaryPanel = ({summary}: {summary: string}) => (
  <View style={styles.panel}>
    <Text style={styles.panelTitle}>
      <Icon name="text-account" size={14} color={COLORS.primary} /> Suggested Summary
    </Text>
    <Text style={styles.summaryText}>{summary}</Text>
  </View>
);

const BulletsPanel = ({bullets}: {bullets: JobMatchResult['improvedBullets']}) => {
  if (!bullets.length) return null;
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>
        <Icon name="pencil-outline" size={14} color={COLORS.primary} /> Improved Bullet Points
      </Text>
      {bullets.map((b, i) => (
        <View key={i} style={styles.bulletCard}>
          <Text style={styles.bulletSection}>{b.sectionTitle}</Text>
          <Text style={styles.bulletLabel}>Before:</Text>
          <Text style={styles.bulletOld}>{b.original}</Text>
          <Text style={styles.bulletLabel}>After:</Text>
          <Text style={styles.bulletNew}>{b.improved}</Text>
        </View>
      ))}
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export const TailorResumeScreen = () => {
  const activeResume = useResumeStore(selectActiveResume);

  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTailor = async () => {
    if (!activeResume || !jobDescription.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await tailorResumeForJob(activeResume, jobDescription);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.keyboardAvoidingView}>
      <Header title="Tailor for Job" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">

        {/* ── Job Description Input ──────────────────────────────────── */}
        {!result && (
          <View style={styles.inputSection}>
            <LottieAnimation
              source={require('@/assets/animations/ai_twinkle_loading.json')}
              style={styles.inputAnimation}
              loop
              autoPlay
            />
            <Text style={styles.inputTitle}>Paste a Job Description</Text>
            <Text style={styles.inputSubtitle}>
              We will compare it to your resume and show you exactly how to improve your ATS score.
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Paste the full job description here..."
              placeholderTextColor={COLORS.text?.secondary ?? '#9CA3AF'}
              multiline
              numberOfLines={10}
              value={jobDescription}
              onChangeText={setJobDescription}
              textAlignVertical="top"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Button
              title={isLoading ? 'Analyzing...' : 'Analyze Match'}
              onPress={handleTailor}
              disabled={isLoading || !jobDescription.trim()}
            leftIcon={
                isLoading
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Icon name="magnify" size={18} color="#fff" />
              }
            />
          </View>
        )}

        {/* ── Results ──────────────────────────────────────────────────── */}
        {result && (
          <>
            <ATSScoreBadge score={result.atsScore} />
            <KeywordsPanel
              missing={result.missingKeywords}
              matched={result.topMatchedKeywords}
            />
            {result.suggestedSummary ? (
              <SummaryPanel summary={result.suggestedSummary} />
            ) : null}
            <BulletsPanel bullets={result.improvedBullets} />

            <Button
              title="Try Another Job"
              variant="outline"
              onPress={() => {
                setResult(null);
                setJobDescription('');
              }}
              style={styles.retryButton}
              leftIcon={<Icon name="refresh" size={16} color={COLORS.primary} />}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {paddingBottom: 48},
  inputSection: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  inputAnimation: {width: 90, height: 90, marginBottom: SPACING.sm},
  inputTitle: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  inputSubtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    minHeight: 160,
    backgroundColor: COLORS.background.secondary,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    fontSize: 14,
  },
  errorText: {
    ...typography.caption,
    color: '#EF4444',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  atsBadge: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  atsBadgeLabel: {
    ...typography.caption,
    color: COLORS.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: SPACING.sm,
  },
  panel: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: SPACING.md,
  },
  panelTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  chipsRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 6},
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {fontSize: 12, fontWeight: '500'},
  summaryText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  bulletCard: {
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
  },
  bulletSection: {
    ...typography.caption,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bulletLabel: {
    ...typography.caption,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  bulletOld: {
    ...typography.caption,
    color: '#6B7280',
    lineHeight: 18,
    textDecorationLine: 'line-through',
  },
  bulletNew: {
    ...typography.caption,
    color: '#065F46',
    lineHeight: 18,
  },
  retryButton: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
  },
});
