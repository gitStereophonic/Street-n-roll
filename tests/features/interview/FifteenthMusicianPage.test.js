import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FifteenthMusicianPage } from 'src/features/interview/FifteenthMusicianPage';

describe('interview/FifteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FifteenthMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-fifteenth-musician-page').getElement()
    ).to.exist;
  });
});
