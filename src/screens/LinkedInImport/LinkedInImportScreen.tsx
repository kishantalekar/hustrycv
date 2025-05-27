import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, TYPOGRAPHY} from '@/theme';
import {FONTS} from '@/constants';
import {useResumeStore} from '@/store/useResumeStore';
import {posthog} from '@/analytics/posthog/PostHog';
import {RootScreens} from '@/navigation/constants';
import {replace} from '@/utils/navigation';
import {
  parseResumeWithAI,
  convertToResumeFormat,
} from '@/utils/ai/resumeParser';
import {useAppStore} from '@/store/useAppStore';
import {LottieAnimation} from '@/components';
import {Header} from '@/components/Header';

export const LinkedInImportScreen = () => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const {addResume, setActiveResume} = useResumeStore();
  const userName = useAppStore(state => state.userName);

  const handleImport = async () => {
    if (!linkedinUrl) {
      Alert.alert('Error', 'Please enter your LinkedIn profile URL');
      return;
    }

    setIsLoading(true);
    try {
      const url =
        'https://linkedin-data-api.p.rapidapi.com/get-profile-data-by-url';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '7330c027a6mshea2ba5267670edap12edadjsnc4d05fe241b2',
          'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
        },
      };

      const response = await fetch(
        `${url}?url=${encodeURIComponent(linkedinUrl)}`,
        options,
      );
      const result = await response.json();
      console.log('LinkedIn API Response:', result);

      // Parse LinkedIn data with AI
      setProgressMessage('Analyzing your LinkedIn profile with AI...');
      const parsedResumeData = await parseResumeWithAI(JSON.stringify(result));
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
      setProgressMessage('Formatting your LinkedIn data...');
      const formattedResume = convertToResumeFormat(parsedResumeData);
      console.log('[Format] Conversion completed:', {
        id: formattedResume.metadata.id,
        name: formattedResume.basics.name,
        sections: {
          work: formattedResume.sections.work.items.length,
          education: formattedResume.sections.education.items.length,
          skills: formattedResume.sections.skills.items.length,
          projects: formattedResume.sections.projects.items.length,
          certifications: formattedResume.sections.certifications.items.length,
        },
      });

      const id = addResume(formattedResume);
      setActiveResume(id);
      posthog.capture('resume_created', {
        type: 'linkedin_import',
        username: userName,
      });
      replace(RootScreens.RESUME_EDITOR, {name: 'Preview'});

      setProgressMessage('Finalizing your resume...');
    } catch (error) {
      console.error('LinkedIn Import Error:', error);
      Alert.alert(
        'Error',
        'Failed to import LinkedIn profile. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <Header title="Import from LinkedIn" />
        {!isLoading ? (
          <View style={styles.content}>
            <Text style={styles.title}>Import from LinkedIn</Text>
            <Text style={styles.description}>
              Enter your LinkedIn profile URL to import your professional
              experience
            </Text>

            <TextInput
              style={styles.input}
              placeholder="https://linkedin.com/in/your-profile"
              placeholderTextColor={COLORS.text.secondary}
              value={linkedinUrl}
              onChangeText={setLinkedinUrl}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleImport}
              disabled={isLoading}>
              <Text style={styles.buttonText}>
                {isLoading ? 'Importing...' : 'Import Profile'}
              </Text>
            </TouchableOpacity>
          </View>
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

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
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: COLORS.text.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.primary,
    backgroundColor: COLORS.background.secondary,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.size.md,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
});
