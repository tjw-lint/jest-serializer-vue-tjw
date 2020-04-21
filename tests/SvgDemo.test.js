const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import SvgDemo from './components/SvgDemo.vue';

describe('SvgDemo.vue', () => {
  test('SVG renders properly', () => {
    helpers.mockSettings({});
    const wrapper = mount(SvgDemo);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
