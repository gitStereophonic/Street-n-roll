import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FifteenthMusicianPage } from 'src/features/interview/FifteenthMusicianPage';

describe('interview/FifteenthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        fifteenthFields: { howcome: '', howleave: '', firstmoney: '', talk: '' },
        checkPoints: [{}, { howcome: '', howleave: '', firstmoney: '', talk: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(FifteenthMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-fifteenth-musician-page').getElement()).to.exist;
  });

  it('renders node with correct input fields values', () => {
    const props = {
      interview: {
        fifteenthFields: { howcome: '', howleave: '', firstmoney: '', talk: '' },
        checkPoints: [{}, { howcome: 'how to come', howleave: 'how to leave', firstmoney: 'first money', talk: 'speak to me' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const expectedElementHowCome = React.createElement('input', {
      defaultValue: 'how to come',
      id: 'howcome',
    });
    const expectedElementHowLeave = React.createElement('input', {
      defaultValue: 'how to leave',
      id: 'howleave',
    });
    const expectedElementFirstMoney = React.createElement('input', {
      defaultValue: 'first money',
      id: 'firstmoney',
    });
    const expectedElementTalk = React.createElement('input', {
      defaultValue: 'speak to me',
      id: 'talk',
    });
    const renderedComponent = shallow(React.createElement(FifteenthMusicianPage, { ...props }));
    expect(renderedComponent.find('#howcome').getElement().props.defaultValue).to.equal(
      expectedElementHowCome.props.defaultValue
    );
    expect(renderedComponent.find('#howleave').getElement().props.defaultValue).to.equal(
      expectedElementHowLeave.props.defaultValue
    );
    expect(renderedComponent.find('#firstmoney').getElement().props.defaultValue).to.equal(
      expectedElementFirstMoney.props.defaultValue
    );
    expect(renderedComponent.find('#talk').getElement().props.defaultValue).to.equal(
      expectedElementTalk.props.defaultValue
    );
  });
});
