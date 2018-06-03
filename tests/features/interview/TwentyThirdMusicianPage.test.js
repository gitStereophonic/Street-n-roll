import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwentyThirdMusicianPage } from 'src/features/interview/TwentyThirdMusicianPage';

describe('interview/TwentyThirdMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        twentyThirdFields: { problemdesc: '', solution: '' },
        checkPoints: [{}, { problemdesc: '', solution: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(TwentyThirdMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-twenty-third-musician-page').getElement()).to.exist;
  });
});
