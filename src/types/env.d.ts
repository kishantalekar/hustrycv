declare module 'react-native-config' {
  export interface NativeConfig {
    GOOGLE_GEMINI_API_KEY: string;
    POSTHOG_API_KEY: string;
    POSTHOG_HOST: string;
    // Add other environment variables here
  }

  export const Config: NativeConfig;
  export default Config;
}
