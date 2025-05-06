import {
  DocumentPickerResponse,
  pick,
  types,
  isErrorWithCode,
} from '@react-native-documents/picker';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useResumeStore} from '@/store/useResumeStore';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import {styles} from './UploadResumeScreen.styles';
import {
  parseResumeWithAI,
  convertToResumeFormat,
} from '@/utils/ai/resumeParser';
import {replace} from '@/utils/navigation';
import {RootScreens} from '@/navigation/constants';

export const UploadResumeScreen = () => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPickerResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const {addResume, setActiveResume} = useResumeStore();

  const handleFilePick = async () => {
    try {
      const [result] = await pick({
        type: [types.pdf],
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });

      if (result.size && result.size > 5 * 1024 * 1024) {
        Alert.alert('Error', 'File size must be less than 5MB');
        return;
      }
      setSelectedFile(result);
    } catch (err) {
      if (isErrorWithCode(err)) {
        // User cancelled the picker
        return;
      }
      Alert.alert('Error', 'Failed to select file');
    }
  };

  const uploadWithRetry = async (
    formData: FormData,
    retries = 3,
    timeout = 30000,
  ) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(
          'https://restyserver.onrender.com/extract-pdf',
          {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            signal: controller.signal,
          },
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        return await response.json();
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new Error(
              'Request timed out. Please check your internet connection.',
            );
          }
          if (attempt === retries) {
            throw error;
          }
          console.log(`Attempt ${attempt} failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    throw new Error('Failed to upload after multiple attempts');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }
    setIsUploading(true);
    try {
      console.log('[Upload] Starting resume upload process...');
      console.log('[Upload] Selected file:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        uri: selectedFile.uri,
      });

      const formData = new FormData();
      formData.append('pdf', {
        uri: selectedFile.uri,
        type: 'application/pdf',
        name: selectedFile.name,
      });

      // First extract text from PDF using the existing API
      console.log('[Upload] Sending PDF to extraction service...');
      const data = await uploadWithRetry(formData);
      console.log('[Upload] PDF extraction result:', {
        success: !!data,
        textLength: data?.text?.length || 0,
        hasText: !!data?.text,
      });

      if (data && data.text) {
        // Parse the extracted text with Gemini AI
        console.log('[AI] Starting Gemini AI parsing...');
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
        console.log('[Format] Converting parsed data to resume format...');
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
        replace(RootScreens.RESUME_EDITOR, {name: 'Preview'});

        console.log('[Store] Resume added to store successfully.');

        Alert.alert(
          'Success',
          'Resume uploaded, parsed, and created successfully!',
        );
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
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Upload Resume</Text>
          <Text style={styles.subtitle}>Select your resume file to upload</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.filePickerButton}
            onPress={handleFilePick}
            disabled={isUploading}>
            <View style={styles.filePickerContent}>
              <Icon
                name={selectedFile ? 'file-pdf-box' : 'upload'}
                size={40}
                color={COLORS.primary}
              />
              <Text style={styles.filePickerText}>
                {selectedFile ? selectedFile.name : 'Tap to select PDF file'}
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
            onPress={handleUpload}
            disabled={!selectedFile || isUploading}>
            {isUploading ? (
              <ActivityIndicator color={COLORS.text.light} />
            ) : (
              <>
                <Icon name="cloud-upload" size={24} color={COLORS.text.light} />
                <Text style={styles.uploadButtonText}>Upload Resume</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Icon name="information" size={20} color={COLORS.text.secondary} />
            <Text style={styles.infoText}>Maximum file size: 5MB</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="file-pdf-box" size={20} color={COLORS.text.secondary} />
            <Text style={styles.infoText}>Supported format: PDF</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
