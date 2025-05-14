import PostHog from 'posthog-react-native';
import Config from 'react-native-config';

export const posthog = new PostHog(Config.POSTHOG_API_KEY, {
  // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
  host: Config.POSTHOG_HOST, // host is optional if you use https://us.i.posthog.com
});
