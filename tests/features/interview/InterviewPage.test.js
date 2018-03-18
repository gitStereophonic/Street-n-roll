import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { InterviewPage } from 'src/features/interview/InterviewPage';

describe('interview/InterviewPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(InterviewPage, { ...props }));

    expect(renderedComponent.find('.interview-interview-page').getElement()).to.exist;
  });
});
