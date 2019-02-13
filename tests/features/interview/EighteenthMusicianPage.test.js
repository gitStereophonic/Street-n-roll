import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EighteenthMusicianPage } from 'src/features/interview/EighteenthMusicianPage';

describe('interview/EighteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        eighteenthFields: { competition: '', relations: '', whobest: '' },
        checkPoints: [{}, { competition: '', relations: '', whobest: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(EighteenthMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-eighteenth-musician-page').getElement()).to.exist;
  });

  it('renders node with correct input fields values', () => {
    const props = {
      interview: {
        eighteenthFields: { relations: '', whobest: '' },
        checkPoints: [{}, { relations: 'rels', whobest: 'who is the best' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const expectedElementRel = React.createElement('input', {
      defaultValue: 'rels',
      id: 'relations',
    });
    const expectedElementWhB = React.createElement('input', {
      defaultValue: 'who is the best',
      id: 'whobest',
    });
    const renderedComponent = shallow(React.createElement(EighteenthMusicianPage, { ...props }));
    expect(renderedComponent.find('#relations').getElement().props.defaultValue).to.equal(
      expectedElementRel.props.defaultValue
    );
    expect(renderedComponent.find('#whobest').getElement().props.defaultValue).to.equal(
      expectedElementWhB.props.defaultValue
    );
  });
});
