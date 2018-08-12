import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PageInfo } from 'src/features/the-data-pick-up/PageInfo';

describe('the-data-pick-up/PageInfo', () => {
  it('renders node with correct class name', () => {
    const props = {
      theDataPickUp: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageInfo {...props} />
    );

    expect(
      renderedComponent.find('.the-data-pick-up-page-info').getElement()
    ).to.exist;
  });
});
