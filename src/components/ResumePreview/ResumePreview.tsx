import {LottieAnimation} from '@/components';
import {generatePDF} from '@/utils/pdfUtils';
import * as Sentry from '@sentry/react-native';
import React, {useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {ResumePreviewProps} from './ResumePreview.types';
import {getTemplateById} from '@/templates';
import {styles} from './ResumePreview.styles';
import {SPACING} from '@/theme';

export function ResumePreview({
  resumeData,
  selectedTemplate,
  templates,
}: Readonly<ResumePreviewProps>) {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfKey, setPdfKey] = useState(0);

  console.log('[ResumePreview] Initial render - resumeData:', resumeData);
  useEffect(() => {
    if (resumeData && templates) {
      setIsLoading(true);
      setPdfBase64(null);
      // console.log(
      //   '[ResumePreview] useEffect triggered - isLoading:',
      //   isLoading,
      //   'selectedTemplate:',
      //   selectedTemplate,
      // );
      // Start a transaction for PDF generation

      const selectedTemplateData = getTemplateById(selectedTemplate);
      // console.log(
      //   '[ResumePreview] Template data found:',
      //   !!selectedTemplateData,
      //   'templateId:',
      //   selectedTemplate,
      // );
      if (selectedTemplateData) {
        generatePDF(selectedTemplateData.getHTML(resumeData))
          .then(base64 => {
            if (base64) {
              setPdfBase64(base64);
              // console.log(
              //   '[ResumePreview] PDF generated successfully - base64 exists:',
              //   !!base64,
              // );
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
            console.log(
              '[ResumePreview] Setting loading to false after PDF operation',
            );
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

    return () => {
      setPdfKey(prevKey => prevKey + 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate, resumeData]);

  if (!resumeData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No resume data available</Text>
      </View>
    );
  }

  // console.log(
  //   '[ResumePreview] Render state - isLoading:',
  //   isLoading,
  //   'showLottieAnimation:',
  //   'hasPDF:',
  //   !!pdfBase64,
  // );
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {isLoading ? (
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
          key={pdfKey}
          source={{uri: `data:application/pdf;base64,${pdfBase64}`}}
          style={styles.pdfView}
          spacing={SPACING.lg}
        />
      )}
    </ScrollView>
  );
}
