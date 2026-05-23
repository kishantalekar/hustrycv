import * as Sentry from '@sentry/react-native';
import {Alert} from 'react-native';

export const handleJsExceptionHandler = (error: Error, isFatal: boolean) => {
  // Log error to console for development
  console.error('JavaScript Error:', error);

  // Capture error with Sentry
  Sentry.captureException(error, {
    extra: {
      isFatal,
    },
    tags: {
      errorType: 'javascript',
    },
  });

  // Show error dialog to user
  Alert.alert(
    'Application Error',
    'An unexpected error occurred. Our team has been notified.',
    [{text: 'OK'}],
  );
};

