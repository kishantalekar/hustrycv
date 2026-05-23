import {API_URL} from '@/constants';
import {
  DocumentPickerResponse,
  isErrorWithCode,
  pick,
  types,
} from '@react-native-documents/picker';
import * as Sentry from '@sentry/react-native';
import {Alert} from 'react-native';

export const handleFilePick = async () => {
  try {
    const [result] = await pick({
      type: [types.pdf],
      allowMultiSelection: false,
      copyTo: 'cachesDirectory',
    });

    if (result.size && result.size > 5 * 1024 * 1024) {
      Alert.alert('Error', 'File size must be less than 5MB');
      return null;
    }
    return result;
  } catch (err) {
    if (isErrorWithCode(err)) {
      // User cancelled the picker
      return null;
    }

    Alert.alert('Error', 'Failed to select file');
    Sentry.captureException(err);
    return null;
  }
};

export const uploadWithRetry = async (
  formData: FormData,
  retries = 3,
  timeout = 30000,
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${API_URL}/extract-pdf`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: controller.signal,
      });

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
        // await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  throw new Error('Failed to upload after multiple attempts');
};

export const handleUpload = async (selectedFile: DocumentPickerResponse) => {
  const formData = new FormData();
  formData.append('pdf', {
    uri: selectedFile.uri,
    type: 'application/pdf',
    name: selectedFile.name,
  });

  // First extract text from PDF using the existing API
  const data = await uploadWithRetry(formData);
  console.log('[Upload] PDF extraction result:', {
    success: !!data,
    textLength: data?.text?.length || 0,
    hasText: !!data?.text,
  });

  if (!data || !data.text) {
    throw new Error('No text content extracted from PDF');
  }

  return data;
};
