import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useA4Dimensions} from '../../hooks/useA4Dimensions';
import {getCommonStyles} from '../../utils/htmlStyles';
import {getPersonalInfoHTML} from '../ResumeSection/PersonalInfoHeader';
import {getSummaryHTML} from '../ResumeSection/SummarySection';
import {getWorkExperienceHTML} from '../ResumeSection/WorkExperienceSection';
import {getEducationHTML} from '../ResumeSection/EducationSection';
import {getSkillsHTML} from '../ResumeSection/SkillsSection';
import {FONTS} from '../../constants';
import {createAndSavePDF} from '../../utils/pdfUtils';
import {navigate} from '../../utils/navigation';
import {ResumeData, ResumePreviewProps} from './ResumePreview.types';

const getResumeHTML = (resumeData: ResumeData, scale: number) => {
  console.log('education', resumeData?.sections?.education?.items.length);
  if (!resumeData) {
    return `
      <html>
        <body>
          <p>No resume data available</p>
        </body>
      </html>
    `;
  }

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
        <style>
          body {
            padding: 16px;
            margin: 0;
            font-family: 'FiraSans-Regular';
            background-color: white;
          }
          ${getCommonStyles(scale)}
        </style>
      </head>
      <body>
        ${
          resumeData.basics ? getPersonalInfoHTML(resumeData.basics, scale) : ''
        }
        ${resumeData.basics?.summary ? getSummaryHTML(resumeData.basics) : ''}
        ${
          resumeData.sections?.work?.items.length
            ? getWorkExperienceHTML(resumeData.sections.work)
            : ''
        }
        ${
          resumeData.sections?.education?.items.length
            ? getEducationHTML(resumeData.sections.education)
            : ''
        }
        ${
          resumeData.sections?.skills?.items.length
            ? getSkillsHTML(resumeData.sections.skills)
            : ''
        }
      </body>
    </html>
  `;
};

export default function ResumePreview({
  resumeData,
  style,
}: Readonly<ResumePreviewProps>) {
  const {scale, previewWidth, previewHeight} = useA4Dimensions();

  if (!resumeData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No resume data available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View
        style={[
          styles.previewContainer,
          {
            width: previewWidth,
            height: previewHeight,
          },
          style,
        ]}>
        <WebView
          source={{html: getResumeHTML(resumeData, scale)}}
          style={styles.webView}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => createAndSavePDF(getResumeHTML(resumeData, scale))}
          style={styles.exportButton}>
          <Text style={styles.exportButtonText}>{'Download PDF'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('DownloadedResumes')}
          style={styles.viewDownloadsButton}>
          <Text style={styles.exportButtonText}>View Downloads</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
    minHeight: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  exportButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
  previewContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    backgroundColor: 'white',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  viewDownloadsButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#28A745',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
