const helpers = require('./helpers.js');

/**
 * Removes ID values from all elements.
 *
 * @param  {object} $        The markup as a Cheerio DOM node.
 * @param  {object} options  User options
 */
function removeIdValues ($, options) {
  if (options && options.removeIdValues) {
    $('[id]').each(function (index, element) {
      $(element).attr('id', '');
    });
  }
}

/**
 * This removes the following values your snapshots:
 * id="some-value" becomes id=""
 *
 * If you also want to remove them from your production builds, see:
 * https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138
 *
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          Modified HTML string
 */
function removeValues (html, options) {
  const $ = helpers.$(html);

  removeIdValues($, options);
  html = $.html();
  return html;
}

module.exports = removeValues;
