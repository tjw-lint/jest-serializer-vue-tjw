const helpers = require('./helpers.js');

import { mount } from '@vue/test-utils';
import Slot from './components/Slot.vue';

describe('Slot.vue', () => {
  beforeEach(() => {
    helpers.mockSettings({});
  });

  test('Slot with default text', () => {
    const wrapper = mount(Slot, {
      slot: {
        default: 'test'
      }
    });

    expect(wrapper.html())
      .toEqual('<button>test</button>');

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Slot with markup', () => {
    const wrapper = mount(Slot, {
      slots: {
        default: '<p>test</p>'
      }
    });

    expect(wrapper.html())
      .toEqual('<button>\n  <p>test</p>\n</button>');

    expect(wrapper)
      .toMatchSnapshot();
  });
});
