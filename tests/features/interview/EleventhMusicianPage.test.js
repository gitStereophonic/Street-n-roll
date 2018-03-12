import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EleventhMusicianPage } from 'src/features/interview/EleventhMusicianPage';

describe('interview/EleventhMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EleventhMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-eleventh-musician-page').getElement()
    ).to.exist;
  });
});
