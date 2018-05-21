import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DataPickUp } from 'src/features/home/DataPickUp';

describe('home/DataPickUp', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DataPickUp {...props} />
    );

    expect(
      renderedComponent.find('.home-data-pick-up').getElement()
    ).to.exist;
  });
});
