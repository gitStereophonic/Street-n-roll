import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwentiethMusicianPage } from 'src/features/interview/TwentiethMusicianPage';

describe('interview/TwentiethMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        twentiethFields: { identity: '' },
        checkPoints: [{ identity: '' }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(TwentiethMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-twentieth-musician-page').getElement()).to.exist;
  });
});
