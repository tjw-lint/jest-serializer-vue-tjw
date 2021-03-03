const helpers = require('./helpers.js');

import { mount } from '@vue/test-utils';
import Instanbul from './components/Instanbul.vue';

describe('Instanbul.vue', () => {
  test('Comment remains', () => {
    helpers.mockSettings({
      removeIstanbulComments: false
    });
    let wrapper = mount(Instanbul);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Comment removed', () => {
    helpers.mockSettings({
      removeIstanbulComments: true
    });
    let wrapper = mount(Instanbul);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
