const helpers = require('./helpers.js');

import { shallowMount } from '@vue/test-utils';
import InputValue from './components/InputValue.vue';

describe('InputValue.vue', () => {
  test('Value shown in snapshot', () => {
    helpers.mockSettings({});

    const wrapper = shallowMount(InputValue);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
