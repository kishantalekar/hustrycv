import Config from 'react-native-config';
/**
 * API Keys utility
 *
 * This file provides a centralized way to access API keys and other sensitive information.
 * In production, these values should be stored in environment variables.
 */

// For development, you can set your API key here, but make sure not to commit it
// For production, use environment variables
export const GOOGLE_GEMINI_API_KEY = Config.GOOGLE_GEMINI_API_KEY;

// Function to check if API keys are properly configured
export const validateApiKeys = (): boolean => {
  if (!GOOGLE_GEMINI_API_KEY) {
    console.warn(
      'Google Gemini API key is not configured. Please set GOOGLE_GEMINI_API_KEY in your .env file.',
    );
    return false;
  }
  return true;
};
