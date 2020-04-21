const helpers = require('./helpers.js');

import { mount } from '@lmiller1990/vue-test-utils-next';
import Zoom from './components/Zoom.vue';

describe('Zoom.vue', () => {
  let wrapper;

  beforeEach(() => {
    helpers.mockSettings({});
    wrapper = mount(Zoom);
  });

  test('Zoom in on a child element', () => {
    const article = wrapper.find('[data-test="article"]');

    expect(article)
      .toMatchSnapshot();
  });

  test('Zoom in on a table row', () => {
    const tr = wrapper.find('[data-test="tr"]');

    expect(tr)
      .toMatchSnapshot();
  });
});
