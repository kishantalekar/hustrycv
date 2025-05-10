import {posthog} from '@/analytics/posthog/PostHog';
import {LottieAnimation} from '@/components';
import {RootScreens} from '@/navigation/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import {
  convertToResumeFormat,
  parseResumeWithAI,
} from '@/utils/ai/resumeParser';
import {replace} from '@/utils/navigation';
import {handleFilePick, handleUpload} from '@/utils/resumeUpload';
import {DocumentPickerResponse} from '@react-native-documents/picker';
import * as Sentry from '@sentry/react-native';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './UploadResumeScreen.styles';

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  animation: {
    width: 300,
    height: 300,
  },
  progressText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});

export const UploadResumeScreen = () => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPickerResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const {addResume, setActiveResume} = useResumeStore();

  useEffect(() => {
    fetch('https://restyserver.onrender.com/ping')
      .then(response => response.json())
      .then(data => {
        console.log('Server pinged successfully', data.message);
      })
      .catch(error => {
        Sentry.captureException(error);
        console.error('Error pinging server:', error);
      });
  }, []);
  const onFilePick = async () => {
    try {
      const file = await handleFilePick();
      if (file) {
        setSelectedFile(file);
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Sentry.captureException(error);
    }
  };

  const onUpload = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }
    setIsUploading(true);
    try {
      setProgressMessage('Starting resume upload process...');
      console.log('[Upload] Selected file:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        uri: selectedFile.uri,
      });

      setProgressMessage('Extracting text from your resume...');
      const data = await handleUpload(selectedFile);

      if (data && data.text) {
        // Parse the extracted text with Gemini AI
        setProgressMessage('Analyzing your resume with AI...');
        const parsedResumeData = await parseResumeWithAI(data.text);
        console.log('[AI] Parsing completed:', {
          hasName: !!parsedResumeData?.name,
          hasEmail: !!parsedResumeData?.email,
          sections: {
            work: parsedResumeData?.work?.length || 0,
            education: parsedResumeData?.education?.length || 0,
            skills: parsedResumeData?.skills?.length || 0,
            projects: parsedResumeData?.projects?.length || 0,
            certifications: parsedResumeData?.certifications?.length || 0,
          },
        });

        // Convert to our resume format and add to store
        setProgressMessage('Formatting your resume data...');
        const formattedResume = convertToResumeFormat(parsedResumeData);
        console.log('[Format] Conversion completed:', {
          id: formattedResume.metadata.id,
          name: formattedResume.basics.name,
          sections: {
            work: formattedResume.sections.work.items.length,
            education: formattedResume.sections.education.items.length,
            skills: formattedResume.sections.skills.items.length,
            projects: formattedResume.sections.projects.items.length,
            certifications:
              formattedResume.sections.certifications.items.length,
          },
        });
        const id = addResume(formattedResume);
        setActiveResume(id);
        posthog.capture('resume_created', {
          type: 'upload',
        });
        replace(RootScreens.RESUME_EDITOR, {name: 'Preview'});

        setProgressMessage('Finalizing your resume...');
      } else {
        throw new Error('No text content extracted from PDF');
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      Alert.alert(
        'Error',
        error instanceof Error
          ? error.message
          : 'Failed to process PDF file. Please try again.',
      );
      Sentry.captureException(error, {
        extra: {
          file: selectedFile?.name,
          fileSize: selectedFile?.size,
          fileType: selectedFile?.type,
        },
        tags: {},
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        {!isUploading ? (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Upload Resume</Text>
              <Text style={styles.subtitle}>
                Select your resume file to upload
              </Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.filePickerButton}
                onPress={onFilePick}
                disabled={isUploading}>
                <View style={styles.filePickerContent}>
                  <Icon
                    name={selectedFile ? 'file-pdf-box' : 'upload'}
                    size={40}
                    color={COLORS.primary}
                  />
                  <Text style={styles.filePickerText}>
                    {selectedFile
                      ? selectedFile.name
                      : 'Tap to select PDF file'}
                  </Text>
                  {selectedFile && (
                    <Text style={styles.fileSize}>
                      {selectedFile.size &&
                        (selectedFile.size / (1024 * 1024)).toFixed(2)}
                      MB
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  !selectedFile && styles.uploadButtonDisabled,
                ]}
                onPress={onUpload}
                disabled={!selectedFile || isUploading}>
                <Icon name="cloud-upload" size={24} color={COLORS.text.light} />
                <Text style={styles.uploadButtonText}>Upload Resume</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <Icon
                  name="information"
                  size={20}
                  color={COLORS.text.secondary}
                />
                <Text style={styles.infoText}>Maximum file size: 5MB</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon
                  name="file-pdf-box"
                  size={20}
                  color={COLORS.text.secondary}
                />
                <Text style={styles.infoText}>Supported format: PDF</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={loadingStyles.container}>
            <LottieAnimation
              source={require('@/assets/animations/fox_walking.json')}
              style={loadingStyles.animation}
              loop={true}
              autoPlay={true}
            />
            <Text style={loadingStyles.progressText}>{progressMessage}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
