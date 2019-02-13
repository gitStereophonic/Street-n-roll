import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { StartPage } from 'src/features/interview/StartPage';

describe('interview/StartPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(StartPage, { ...props }));

    expect(renderedComponent.find('.interview-start-page').getElement()).to.exist;
  });
});
