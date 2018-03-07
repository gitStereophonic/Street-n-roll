import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SecondMusicianPage } from 'src/features/interview/SecondMusicianPage';

describe('interview/SecondMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SecondMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-second-musician-page').getElement()
    ).to.exist;
  });
});
