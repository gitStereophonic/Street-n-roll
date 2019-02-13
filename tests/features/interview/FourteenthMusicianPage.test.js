import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FourteenthMusicianPage } from 'src/features/interview/FourteenthMusicianPage';

describe('interview/FourteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        fourteenthFields: { whatplay: '', whythisplay: '', placeplay: '' },
        checkPoints: [{}, {}, { whatplay: '', whythisplay: '', placeplay: '' }],
        currentIndex: 2,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(FourteenthMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-fourteenth-musician-page').getElement()).to.exist;
  });
});
