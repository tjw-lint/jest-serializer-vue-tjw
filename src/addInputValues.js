/**
 * Adds in a value attribue for all input elements so the snapshot.
 * <input> => <input value="cow">
 *
 * @param  {object} vnode    A cloned copy of the wrapper.vnode to mutate
 * @param  {object} options  Options object for this serializer
 * @return {object}          Modified vnode
 */
function addInputValues (vnode, options) {
  if (!options || options.addInputValues) {
    // $('input').each(function (index, el) {
    //   console.log(el.value);
    //   $(el).attr('data-kitten', el.value);
    // });
  }

  return vnode;
}

module.exports = addInputValues;
