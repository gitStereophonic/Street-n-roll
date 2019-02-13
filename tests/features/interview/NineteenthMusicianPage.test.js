import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NineteenthMusicianPage } from 'src/features/interview/NineteenthMusicianPage';

describe('interview/NineteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        nineteenthFields: { events: '', reactions: '', story: '' },
        checkPoints: [{ events: '', reactions: '', story: '' }, {}, {}],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(NineteenthMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-nineteenth-musician-page').getElement()).to.exist;
  });
});
