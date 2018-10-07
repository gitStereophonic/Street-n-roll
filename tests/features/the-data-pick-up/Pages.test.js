import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Pages } from 'src/features/the-data-pick-up/Pages';

describe('the-data-pick-up/Pages', () => {
  it('renders node with correct class name', () => {
    const props = {
      theDataPickUp: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Pages {...props} />
    );

    expect(
      renderedComponent.find('.the-data-pick-up-pages').getElement()
    ).to.exist;
  });
});
