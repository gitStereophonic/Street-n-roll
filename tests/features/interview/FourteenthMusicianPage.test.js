import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FourteenthMusicianPage } from 'src/features/interview/FourteenthMusicianPage';

describe('interview/FourteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FourteenthMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-fourteenth-musician-page').getElement()
    ).to.exist;
  });
});
