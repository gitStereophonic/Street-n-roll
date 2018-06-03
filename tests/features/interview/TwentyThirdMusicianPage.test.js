import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TwentyThirdMusicianPage } from 'src/features/interview/TwentyThirdMusicianPage';

describe('interview/TwentyThirdMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TwentyThirdMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-twenty-third-musician-page').getElement()
    ).to.exist;
  });
});
