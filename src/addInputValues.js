const helpers = require('./helpers.js');

/**
 * Sets the attribute on element based on domProps.
 *
 * @param {object} vnode     A Vue node
 * @param {string} attribute 'value' or 'checked'
 */
function setAttribute (vnode, attribute) {
  if (
    vnode.data &&
    vnode.data.domProps &&
    vnode.data.domProps.hasOwnProperty(attribute)
  ) {
    let value = vnode.data.domProps[attribute];
    vnode.data.attrs = vnode.data.attrs || {};
    vnode.data.attrs.value = helpers.swapQuotes(helpers.stringify(value));
  }
}

/**
 * Recursively loops over all vnodes and applies a value
 * attribute if the element has a value
 *
 * @param {object} vnode A Vue node
 */
function addVnodeValueAttribute (vnode) {
  setAttribute(vnode, 'value');
  setAttribute(vnode, 'checked');

  if (vnode.children) {
    vnode.children.forEach(function (childVNode) {
      addVnodeValueAttribute(childVNode);
    });
  }
}

/**
 * Adds in a value attribue for all input elements so the snapshot.
 * <input> => <input value="cow">
 *
 * @param  {object} vnode    A cloned copy of the wrapper.vnode to mutate
 * @param  {object} options  Options object for this serializer
 * @return {object}          Modified vnode
 */
function addInputValues (vnode, options) {
  if (
    (vnode && typeof(vnode) === 'object' && !Array.isArray(vnode)) &&
    (!options || options.addInputValues)
  ) {
    addVnodeValueAttribute(vnode);
  }
  return vnode;
}

module.exports = addInputValues;
