import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SixthListenerPage } from 'src/features/interview/SixthListenerPage';

describe('interview/SixthListenerPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SixthListenerPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-sixth-listener-page').getElement()
    ).to.exist;
  });
});
