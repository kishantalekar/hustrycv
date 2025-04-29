module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-class-static-block',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@src': './src',
          '@': './src',
        },
      },
    ],
  ],
};
