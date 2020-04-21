const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import Parent from './components/Parent.vue';

const shallowMount = mount;

describe('Parent.vue', () => {
  beforeEach(() => {
    helpers.mockSettings({});
  });

  test('Mount snapshot', () => {
    const wrapper = mount(Parent);

    expect(wrapper.html())
      .toMatchSnapshot();

    expect(wrapper.element)
      .toMatchSnapshot();
  });

  test('Shallow snapshot', () => {
    const wrapper = shallowMount(Parent);

    expect(wrapper.html())
      .toMatchSnapshot();
  });

  test('Properly serializes a shallowly-rendered wrapper', () => {
    const wrapper = shallowMount(Parent);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Properly serializes a fully-mounted wrapper', () => {
    const wrapper = mount(Parent);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
