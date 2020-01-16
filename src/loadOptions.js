/**
 * Loads the options from the vue.config.js file.
 * If none are found, fallsback to default settings.
 *
 * @return {object}  An options object for what to remove and how to format the snapshot markup
 */
function loadOptions () {
  const fs = require('fs');
  const path = require('path');

  const vueConfigLocation = path.join(process.cwd(), 'vue.config.js');
  let vueConfig;
  if (fs.existsSync(vueConfigLocation)) {
    vueConfig = require(vueConfigLocation);
  }

  let options = {
    removeDataTest: true,
    removeServerRendered: true,
    removeDataVId: true,
    stringifyObjects: true,
    // To see available options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
    pretty: {
      indent_char: ' ',
      indent_inner_html: true,
      indent_size: 2,
      inline: [],
      sep: '\n',
      unformatted: ['code', 'pre']
    }
  };

  let vueConfigOptions = {};
  if (vueConfig) {
    if (vueConfig.pluginOptions && vueConfig.pluginOptions.jestSerializer) {
      vueConfigOptions = vueConfig.pluginOptions.jestSerializer;
    }
    // Maybe one day these settings will be officially a part of the Vue CLI ¯\_(ツ)_/¯
    if (vueConfig.jestSerializer) {
      vueConfigOptions = vueConfig.jestSerializer;
    }
  }

  options.pretty = vueConfigOptions.pretty || options.pretty;
  if (typeof(vueConfigOptions.removeDataTest) === 'boolean') {
    options.removeDataTest = vueConfigOptions.removeDataTest;
  }
  if (typeof(vueConfigOptions.removeServerRendered) === 'boolean') {
    options.removeServerRendered = vueConfigOptions.removeServerRendered;
  }
  if (typeof(vueConfigOptions.removeDataVId) === 'boolean') {
    options.removeDataVId = vueConfigOptions.removeDataVId;
  }
  if (typeof(vueConfigOptions.stringifyObjects) === 'boolean') {
    options.stringifyObjects = vueConfigOptions.stringifyObjects;
  }

  return options;
}

module.exports = loadOptions;
