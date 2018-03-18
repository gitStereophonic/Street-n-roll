import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwelfthMusicianPage } from 'src/features/interview/TwelfthMusicianPage';

describe('interview/TwelfthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        twelfthFields: { reasons: '', where: '', whywhere: '', meetingtime: ['', '', '', '', ''] },
        checkPoints: [{ reasons: '', where: '', whywhere: '', meetingtime: ['', '', '', '', ''] }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(TwelfthMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-twelfth-musician-page').getElement()).to.exist;
  });
});
