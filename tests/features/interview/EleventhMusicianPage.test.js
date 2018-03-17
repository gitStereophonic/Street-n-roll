import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EleventhMusicianPage } from 'src/features/interview/EleventhMusicianPage';

describe('interview/EleventhMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        eleventhFields: { meetings: '', meetingsExact: '' },
        checkPoints: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          { meetings: '', meetingsExact: '' },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        currentIndex: 11,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(EleventhMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-eleventh-musician-page').getElement()).to.exist;
  });
});
