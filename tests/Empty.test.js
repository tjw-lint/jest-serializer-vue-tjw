const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import Empty from './components/Empty.vue';

const shallowMount = mount;

describe('Empty.vue', () => {
  beforeEach(() => {
    helpers.mockSettings({});
  });

  test('Properly serializes a shallowly-rendered wrapper', () => {
    const wrapper = shallowMount(Empty);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Properly serializes a fully-mounted wrapper', () => {
    const wrapper = mount(Empty);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
