import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ThirteenthMusicianPage } from 'src/features/interview/ThirteenthMusicianPage';

describe('interview/ThirteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        thirteenthFields: { place: '', descplace: '', time: '' },
        checkPoints: [{ place: '', descplace: '', time: '' }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(ThirteenthMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-thirteenth-musician-page').getElement()).to.exist;
  });
});
