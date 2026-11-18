import React from 'react';
import renderer from 'react-test-renderer';

import ListTransaction from '.';

describe('< ListTransaction/>', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<ListTransaction />).toJSON();
    expect(tree?.children?.length).toBe(1);
  });
});
