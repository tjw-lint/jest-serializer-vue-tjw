const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import List from './components/List.vue';

const shallowMount = mount;

describe('List.vue', () => {
  test('Snapshot unchanged', () => {
    helpers.mockSettings({});

    const wrapper = shallowMount(List, {
      propsData: {
        items: ['one', 'two', 'three']
      }
    });

    expect(wrapper)
      .toMatchSnapshot();
  });
});
