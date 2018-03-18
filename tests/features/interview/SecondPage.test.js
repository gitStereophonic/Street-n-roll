import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SecondPage } from 'src/features/interview/SecondPage';

describe('interview/SecondPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        secondFields: { everPlayed: '' },
        checkPoints: [{ everPlayed: '' }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(SecondPage, { ...props }));

    expect(renderedComponent.find('.interview-second-page').getElement()).to.exist;
  });
});
