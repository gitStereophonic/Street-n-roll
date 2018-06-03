import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwentyFourthPage } from 'src/features/interview/TwentyFourthPage';

describe('interview/TwentyFourthPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        twentyFirstFields: { thanks: '', help: '' },
        checkPoints: [{ thanks: '', help: '' }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(TwentyFourthPage, { ...props }));

    expect(renderedComponent.find('.interview-twenty-fourth-page').getElement()).to.exist;
  });
});
