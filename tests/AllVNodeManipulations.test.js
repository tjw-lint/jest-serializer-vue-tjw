const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import AllVNodeManipulations from './components/AllVNodeManipulations.vue';

const shallowMount = mount;

describe('AllVNodeManipulations.vue', () => {
  test('Attribute and input value shown', () => {
    helpers.mockSettings({
      addInputValues: true,
      stringifyObjects: true
    });

    const wrapper = shallowMount(AllVNodeManipulations);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Attribute value shown, input value hidden', () => {
    helpers.mockSettings({
      addInputValues: false,
      stringifyObjects: true
    });

    const wrapper = shallowMount(AllVNodeManipulations);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Attribute value hidden, input value shown', () => {
    helpers.mockSettings({
      addInputValues: true,
      stringifyObjects: false
    });

    const wrapper = shallowMount(AllVNodeManipulations);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Attribute and input value not shown', () => {
    helpers.mockSettings({
      addInputValues: false,
      stringifyObjects: false
    });

    const wrapper = shallowMount(AllVNodeManipulations);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
