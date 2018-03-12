import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ThirdListenerPage } from 'src/features/interview/ThirdListenerPage';

describe('interview/ThirdListenerPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ThirdListenerPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-third-listener-page').getElement()
    ).to.exist;
  });
});
