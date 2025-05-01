const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'], //add here
    resolverMainFields: ['react-native', 'browser', 'main', 'module'],
    extraNodeModules: {
      '@10play/tentap-editor/lib/module/index': path.resolve(
        __dirname,
        'node_modules/@10play/tentap-editor/lib/index.js',
      ),
    },
  },
};
module.exports = withStorybook(
  mergeConfig(
    getDefaultConfig(__dirname),
    wrapWithReanimatedMetroConfig(config),
  ),
  {
    // Set to false to remove storybook specific options
    // you can also use a env variable to set this
    enabled: true,
    // Path to your storybook config
    configPath: path.resolve(__dirname, './.storybook'),

    // Optional websockets configuration
    // Starts a websocket server on the specified port and host on metro start
    // websockets: {
    //   port: 7007,
    //   host: 'localhost',
    // },
  },
);
