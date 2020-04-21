const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import InputValue from './components/InputValue.vue';

const shallowMount = mount;

describe('InputValue.vue', () => {
  test('Value shown in snapshot', () => {
    helpers.mockSettings({ addInputValues: true });

    const wrapper = shallowMount(InputValue);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Value not shown in snapshot', () => {
    helpers.mockSettings({ addInputValues: false });

    const wrapper = shallowMount(InputValue);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
