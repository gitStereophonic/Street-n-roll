import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SeventhMusicianPage } from 'src/features/interview/SeventhMusicianPage';

describe('interview/SeventhMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        seventhFields: { hobbie: '', hobbieOther: '', rather: '', ratherExact: '' },
        checkPoints: [{ hobbie: '', hobbieOther: '', rather: '', ratherExact: '' }],
        currentIndex: 0,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(SeventhMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-seventh-musician-page').getElement()).to.exist;
  });
});
