module.exports = {
  presets: [
    '@babel/preset-react',
    'module:metro-react-native-babel-preset'
  ],
  env: {
    test: {
      presets: [
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        'transform-es2015-modules-commonjs',
        'babel-plugin-dynamic-import-node',
      ],
    },
  },
};
