import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ThirteenthMusicianPage } from 'src/features/interview/ThirteenthMusicianPage';

describe('interview/ThirteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ThirteenthMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-thirteenth-musician-page').getElement()
    ).to.exist;
  });
});
