const helpers = require('./helpers.js');

import { mount } from '@vue/test-utils';
import ScopedStylesInDependency from './components/ScopedStylesInDependency.vue';


describe('ScopedStylesInDependency.vue', () => {
  test('Snapshot has data-v ids removed', () => {
    helpers.mockSettings({
      removeDataVId: true
    });

    const wrapper = mount(ScopedStylesInDependency);

    expect(wrapper.html())
      .toMatchSnapshot();
  });

  test('Snapshot has data-v ids remain', () => {
    helpers.mockSettings({
      removeDataVId: false
    });

    const wrapper = mount(ScopedStylesInDependency);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
