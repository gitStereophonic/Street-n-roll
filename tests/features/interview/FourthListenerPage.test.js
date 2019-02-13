import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FourthListenerPage } from 'src/features/interview/FourthListenerPage';

describe('interview/FourthListenerPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        fourthFields: { songs: '' },
        checkPoints: [{}, { songs: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(FourthListenerPage, { ...props }));

    expect(renderedComponent.find('.interview-fourth-listener-page').getElement()).to.exist;
  });
});
