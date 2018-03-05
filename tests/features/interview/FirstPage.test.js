import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FirstPage } from 'src/features/interview/FirstPage';

describe('interview/FirstPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FirstPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-first-page').getElement()
    ).to.exist;
  });
});
