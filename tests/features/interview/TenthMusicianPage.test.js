import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TenthMusicianPage } from 'src/features/interview/TenthMusicianPage';

describe('interview/TenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TenthMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-tenth-musician-page').getElement()
    ).to.exist;
  });
});
