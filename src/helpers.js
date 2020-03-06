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
   * Swaps single and double quotes
   *
   * @param  {string} str Input
   * @return {string}     Swapped output
   */
  swapQuotes: function (str) {
    return str.replace(/[\'\"]/g, function (match) {
      return match === '"' ? '\'' : '"';
    });
  },

  /**
   * Same as JSON.stringify, but without quotes around object properties.
   *
   * @param  {object} obj data to stringify
   * @return {string}               stringified string
   */
  stringify: function (obj) {
    if (obj === null) {
      return 'null';
    }
    if (obj === undefined) {
      return 'undefined';
    }
    if (Number.isNaN(obj)) {
      return 'NaN';
    }
    if (obj === Infinity) {
      return 'Infinity';
    }
    if (obj === -Infinity) {
      return '-Infinity';
    }
    if (obj instanceof Set) {
      return JSON.stringify([...obj]);
    }
    if (typeof(obj) === 'object' && typeof(obj.getTime) === 'function') {
      if (Number.isNaN(obj.getTime())) {
        return obj.toString(); // 'Invalid Date'
      } else {
        return obj.getTime() + ''; // '1583463154386'
      }
    }
    if (typeof(obj) !== 'object' || Array.isArray(obj)) {
      return JSON.stringify(obj) || '';
    }

    let props = Object
      .keys(obj)
      .map((key) => {
        return key + ':' + this.stringify(obj[key]);
      })
      .join(',');

    return '{' + props + '}';
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
