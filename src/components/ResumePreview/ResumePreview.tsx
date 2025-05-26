import {LottieAnimation} from '@/components';
import {FONTS} from '@/constants';
import {COLORS, SPACING, TYPOGRAPHY} from '@/theme';
import {generatePDF} from '@/utils/pdfUtils';
import * as Sentry from '@sentry/react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {ResumePreviewProps} from './ResumePreview.types';
import {getTemplateById} from '@/templates';

export function ResumePreview({
  resumeData,
  selectedTemplate,
  templates,
}: Readonly<ResumePreviewProps>) {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(resumeData);
  useEffect(() => {
    if (resumeData && templates) {
      setIsLoading(true);
      setPdfBase64(null);
      console.log('useeffect 1 ', isLoading);
      // Start a transaction for PDF generation

      const selectedTemplateData = getTemplateById(selectedTemplate);
      console.log('selectedData ', !!selectedTemplateData);
      if (selectedTemplateData) {
        generatePDF(selectedTemplateData.getHTML(resumeData))
          .then(base64 => {
            if (base64) {
              setPdfBase64(base64);
              console.log('base64', !!base64);
            } else {
              throw new Error('PDF generation returned null');
            }
          })
          .catch(error => {
            // Capture the error with Sentry
            Sentry.captureException(error, {
              tags: {
                template: selectedTemplate,
                component: 'ResumePreview',
              },
              extra: {
                hasResumeData: Boolean(resumeData),
                templateId: selectedTemplate,
              },
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        // Log template not found error
        Sentry.captureMessage('Selected template not found', {
          level: 'error',
          tags: {
            templateId: selectedTemplate,
            component: 'ResumePreview',
          },
        });
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate, resumeData, templates]);

  if (!resumeData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No resume data available</Text>
      </View>
    );
  }

  const showLottieAnimation = !pdfBase64 && isLoading;
  console.log('showLottieAnimation', showLottieAnimation);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {showLottieAnimation ? (
        <View style={styles.loadingContainer}>
          <LottieAnimation
            source={require('../../assets/animations/cv_loading.json')}
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
          <Text style={styles.loadingText}>{'Generating Preview...'}</Text>
        </View>
      ) : (
        <Pdf
          source={{uri: `data:application/pdf;base64,${pdfBase64}`}}
          style={styles.pdfView}
          spacing={SPACING.lg}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    minHeight: 400,
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: SPACING.container,
    justifyContent: 'flex-start',
    minHeight: 'auto',
    height: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  // exportButton: {
  //   paddingHorizontal: SPACING.lg,
  //   paddingVertical: SPACING.sm,
  //   backgroundColor: COLORS.primary,
  //   borderRadius: BORDER_RADIUS.md,
  //   marginTop: SPACING.lg,
  //   ...SHADOW.light,
  // },
  // exportButtonText: {
  //   color: COLORS.text.light,
  //   fontSize: TYPOGRAPHY.size.md,
  //   fontFamily: FONTS.FIRA_SANS.REGULAR,
  // },

  pdfView: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
});
