import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NinethMusicianPage } from 'src/features/interview/NinethMusicianPage';

describe('interview/NinethMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        ninethFields: { community: '', communityExact: '' },
        checkPoints: [{}, { community: '', communityExact: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(NinethMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-nineth-musician-page').getElement()).to.exist;
  });
});
