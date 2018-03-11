import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EighthMusicianPage } from 'src/features/interview/EighthMusicianPage';

describe('interview/EighthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EighthMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-eighth-musician-page').getElement()
    ).to.exist;
  });
});
