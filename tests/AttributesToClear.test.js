const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import AttributesToClear from './components/AttributesToClear.vue';

const shallowMount = mount;

describe('AttributesToClear.vue', () => {
  test('Default snapshot', () => {
    helpers.mockSettings({ removeDataTest: false });

    const wrapper = shallowMount(AttributesToClear);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Just ID cleared', () => {
    helpers.mockSettings({
      removeDataTest: false,
      attributesToClear: ['id']
    });

    const wrapper = shallowMount(AttributesToClear);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('All attributes cleared', () => {
    helpers.mockSettings({
      removeDataTest: false,
      attributesToClear: [
        'id',
        'class',
        'title',
        'asdf',
        'data-test ',
        ' some junk ',
        true
      ]
    });

    const wrapper = shallowMount(AttributesToClear);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
