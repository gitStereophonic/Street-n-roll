import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FeedbackPage } from 'src/features/about-us/FeedbackPage';

describe('about-us/FeedbackPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      aboutUs: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FeedbackPage {...props} />
    );

    expect(
      renderedComponent.find('.about-us-feedback-page').getElement()
    ).to.exist;
  });
});
