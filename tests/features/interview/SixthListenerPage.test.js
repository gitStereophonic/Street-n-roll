import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SixthListenerPage } from 'src/features/interview/SixthListenerPage';

describe('interview/SixthListenerPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        sixthFields: { experience: '' },
        checkPoints: [{ experience: '' }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(SixthListenerPage, { ...props }));

    expect(renderedComponent.find('.interview-sixth-listener-page').getElement()).to.exist;
  });
});
