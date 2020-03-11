const helpers = require('./helpers.js');

describe('RemoveIDValues', () => {
  const commented = `
<div>
  <span id="123">3</span>
  <div>
    <div id="234">
  </div>
</div>
`;

  test('ID values removed', () => {
    helpers.mockSettings({
      removeIdValues: true
    });

    expect(commented.trim())
      .toMatchSnapshot();
  });

  test('ID values remain', () => {
    helpers.mockSettings({
      removeIdValues: false
    });

    expect(commented.trim())
      .toMatchSnapshot();
  });
});
