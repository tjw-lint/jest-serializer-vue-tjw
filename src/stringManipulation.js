const cheerioManipulation = require('./cheerioManipulation.js');

/**
 * This removes all HTML comments from your snapshots.
 * Normal <!---->
 * Multi-line <!-- \n asdf \n asdf \n -->
 * Containing HTML <!-- <div></div> -->
 *
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          Modified HTML string
 */
function removeAllComments (html, options) {
  if (options && options.removeComments) {
    // The best Stackoverflow has to offer.
    // Also removes a trailing newline if it exists.
    return html.replace(/(?=<!--)([\s\S]*?)-->(\n)?/g, '');
  }
  return html;
}

/**
 * In Vue 2.7 comments stopped being placed on their own lines.
 * This puts them back in place to avoid snapshot churn and to improve readability.
 *
 * @param  {string} html  The markup being serialized
 * @return {string}       Modified HTML string
 */
function wrapCommentWithReturns (html) {
  html = html.replace(/<!---->/g, '\n<!---->\n');
  // \s* means 0 or more whitespace
  html = html.replace(/\s*\n\s*\n\s*<!---->/g, '\n<!---->');
  html = html.replace(/<!---->\s*\n\s*\n\s*/g, '<!---->\n');
  return html;
}

/**
 * Performs all string manipulations on the rendered DOM
 * prior to formatting. Cheerio or regex string manipulation.
 *
 * @param  {string} html     The markup being serialized
 * @param  {object} options  Options object for this serializer
 * @return {string}          The markup being serialized
 */
function stringManipulation (html, options) {
  html = removeAllComments(html, options);
  html = wrapCommentWithReturns(html);
  html = cheerioManipulation(html, options);

  return html;
}

module.exports = stringManipulation;
