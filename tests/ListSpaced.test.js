const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import ListSpaced from './components/ListSpaced.vue';

const shallowMount = mount;

describe('ListSpaced.vue', () => {
  test('Snapshot unchanged', () => {
    helpers.mockSettings({});
    const wrapper = shallowMount(ListSpaced);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Default formatting options', () => {
    helpers.mockSettings({
      formatting: {}
    });
    const wrapper = shallowMount(ListSpaced);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
