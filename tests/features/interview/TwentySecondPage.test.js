import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwentySecondPage } from 'src/features/interview/TwentySecondPage';

describe('interview/TwentySecondPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        twentyFirstFields: { thanks: '', help: '' },
        checkPoints: [{ thanks: '', help: '' }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(TwentySecondPage, { ...props }));

    expect(renderedComponent.find('.interview-twenty-second-page').getElement()).to.exist;
  });
});
