import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NineteenthMusicianPage } from 'src/features/interview/NineteenthMusicianPage';

describe('interview/NineteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <NineteenthMusicianPage {...props} />
    );

    expect(
      renderedComponent.find('.interview-nineteenth-musician-page').getElement()
    ).to.exist;
  });
});
