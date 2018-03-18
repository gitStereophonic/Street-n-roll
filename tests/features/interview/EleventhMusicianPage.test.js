import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EleventhMusicianPage } from 'src/features/interview/EleventhMusicianPage';

describe('interview/EleventhMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        eleventhFields: { meetings: '', meetingsExact: '' },
        checkPoints: [{}, { meetings: '', meetingsExact: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(EleventhMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-eleventh-musician-page').getElement()).to.exist;
  });

  it('renders node with correct value', () => {
    const props = {
      interview: {
        eleventhFields: { meetings: '', meetingsExact: '' },
        checkPoints: [{}, { meetings: 'nope', meetingsExact: 'Не знаю' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(EleventhMusicianPage, { ...props }));

    console.log(renderedComponent.find('input'));

    expect(renderedComponent.find('input')).to.have.length(3);
    expect(renderedComponent.find('input').get(0).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(1).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(2).props.defaultChecked).to.equal(true);
  });
});
