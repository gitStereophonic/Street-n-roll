import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FifthListenerPage } from 'src/features/interview/FifthListenerPage';

describe('interview/FifthListenerPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FifthListenerPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-fifth-listener-page').getElement()
    ).to.exist;
  });
});
