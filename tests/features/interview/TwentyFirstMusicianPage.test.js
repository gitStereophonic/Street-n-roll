import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwentyFirstMusicianPage } from 'src/features/interview/TwentyFirstMusicianPage';

describe('interview/TwentyFirstMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TwentyFirstMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-twenty-first-musician-page').getElement()
    ).to.exist;
  });
});
