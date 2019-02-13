import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SixteenthMusicianPage } from 'src/features/interview/SixteenthMusicianPage';

describe('interview/SixteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        sixteenthFields: { jargon: '', specsigns: '', idmarks: '', forwhat: ['', '', ''], forwhatOther: '' },
        checkPoints: [{ jargon: '', specsigns: '', idmarks: '', forwhat: ['', '', ''], forwhatOther: '' }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(SixteenthMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-sixteenth-musician-page').getElement()).to.exist;
  });
});
