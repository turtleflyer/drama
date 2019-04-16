module.exports = function (api) {
  api.cache.forever();

  const presets = ['gatsby'];
  const plugins = [
    [
      '@babel/plugin-transform-spread',
      {
        loose: false,
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
