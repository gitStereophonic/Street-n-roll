import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FinishPage } from 'src/features/interview/FinishPage';

describe('interview/FinishPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FinishPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-finish-page').getElement()
    ).to.exist;
  });
});
