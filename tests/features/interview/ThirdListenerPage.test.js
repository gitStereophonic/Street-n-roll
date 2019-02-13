import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ThirdListenerPage } from 'src/features/interview/ThirdListenerPage';

describe('interview/ThirdListenerPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        thirdFields: { interest: 3, who: '', money: '' },
        checkPoints: [{}, {}, {}, { interest: 3, who: '', money: '' }],
        currentIndex: 3,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(ThirdListenerPage, { ...props }));

    expect(renderedComponent.find('.interview-third-listener-page').getElement()).to.exist;
  });
});
