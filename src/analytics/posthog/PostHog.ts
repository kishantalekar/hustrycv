import PostHog from 'posthog-react-native';

export const posthog = new PostHog(
  'phc_Kdp1tWMDGoBrXxA1FHo0NXoxrNy18O9SE35cm8YN5vn',
  {
    // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
    host: 'https://us.i.posthog.com', // host is optional if you use https://us.i.posthog.com
  },
);
