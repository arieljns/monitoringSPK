module.exports = {
    staticFileGlobs: [
      'build/static/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}',
      'build/manifest.json',
      'build/index.html',
    ],
    stripPrefix: 'build/',
    runtimeCaching: [{
      urlPattern: /^https:\/\/api.example.com/,
      handler: 'networkFirst',
    }],
  };
  