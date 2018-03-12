import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EighteenthMusicianPage } from 'src/features/interview/EighteenthMusicianPage';

describe('interview/EighteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EighteenthMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-eighteenth-musician-page').getElement()
    ).to.exist;
  });
});
