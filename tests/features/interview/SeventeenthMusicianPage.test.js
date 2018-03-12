import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SeventeenthMusicianPage } from 'src/features/interview/SeventeenthMusicianPage';

describe('interview/SeventeenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SeventeenthMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-seventeenth-musician-page').getElement()
    ).to.exist;
  });
});
