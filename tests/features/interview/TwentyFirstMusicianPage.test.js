import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwentyFirstMusicianPage } from 'src/features/interview/TwentyFirstMusicianPage';

describe('interview/TwentyFirstMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        twentyFirstFields: { names: '', nameslist: '' },
        checkPoints: [{}, { names: '', nameslist: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(TwentyFirstMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-twenty-first-musician-page').getElement()).to.exist;
  });
});
