import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwentySecondMusicianPage } from 'src/features/interview/TwentySecondMusicianPage';

describe('interview/TwentySecondMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        twentySecondFields: { problems: '', problemsExact: '', problemsOther: '' },
        checkPoints: [{}, { problems: '', problemsExact: '', problemsOther: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(TwentySecondMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-twenty-second-musician-page').getElement()).to.exist;
  });
});
