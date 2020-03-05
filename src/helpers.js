const _cloneDeep = require('lodash.clonedeep');
const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');
const Vue = require ('vue');

const helpers = {
  /**
   * Load the markup into Cheerio
   *
   * @param  {string} html  Markup for the snapshot
   * @return {object}       Cheerio object
   */
  $: function (html) {
    // https://github.com/fb55/DomHandler
    // https://github.com/fb55/htmlparser2/wiki/Parser-options
    const xmlOptions = {
      decodeEntities: false,
      lowerCaseAttributeNames: false,
      normalizeWhitespace: false,
      recognizeSelfClosing: false,
      xmlMode: false
    };
    const dom = htmlparser2.parseDOM(html, xmlOptions);
    const $ = cheerio.load(dom, { xml: xmlOptions });
    return $;
  },

  /**
   * Creates a Vue instance to render the vnode as an HTML string.
   *
   * @param  {object} vnode  Vue's vnode object
   * @return {string}        The rendered HTML
   */
  vnodeToString: function (vnode) {
    const vm = new Vue({
      render: function () {
        return vnode;
      }
    });
    const html = vm.$mount().$el.outerHTML;
    vm.$destroy();
    return html;
  },

  // This does not seem to make an actual copy. It is still modifying the reference.
  /**
   * Makes a copy of the vnode, so we are not mutating the original reference passed in by the test.
   *
   * @param  {object} vnode Vue's vnode from the wrapper
   * @return {object}       A copy of the vnode
   *
  copyVnode: function (vnode) {
    const vm = new Vue({
      render: function () {
        return vnode;
      }
    });
    const copy = vm.$mount()._vnode;
    vm.$destroy();
    return copy;
  },
   */

  /**
   * Attempts a deep clone of the wrapper.vnode. Experimental,
   * will hit a stack exceed max size error if vnode is too large.
   * We don't want to mutate the original object, because it may be
   * used again in the same test by another expect().
   *
   * @param  {object} wrapper  A Vue-Test-Utils wrapper
   * @return {object}          A copy of the wrapper.vnode
   */
  cloneVnode: function (wrapper) {
    if (wrapper && wrapper.vnode) {
      let vnode;
      try {
        // vnode = this.copyVnode(wrapper.vnode);
        vnode = _cloneDeep(wrapper.vnode);
      } catch (err) {
        console.log(err);
      }
      return vnode;
    }
  }
};

module.exports = helpers;
