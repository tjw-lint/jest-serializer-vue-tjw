const mockfs = require('mock-fs');

module.exports = {
  mockSettings: function (settings) {
    settings.testing = true;
    const vueConfig = '' +
      'module.exports = {' +
        'pluginOptions: {' +
          'jestSerializer: ' + JSON.stringify(settings) +
        '}' +
      '};';

    mockfs.restore();
    mockfs({
      'vue.config.js': vueConfig
    });
  }
};
