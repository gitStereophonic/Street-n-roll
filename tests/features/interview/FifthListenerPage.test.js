import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FifthListenerPage } from 'src/features/interview/FifthListenerPage';

describe('interview/FifthListenerPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        fifthFields: { sign: '', traditions: '' },
        checkPoints: [{}, { sign: '', traditions: '' }],
        currentIndex: 1,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(FifthListenerPage, { ...props }));

    expect(renderedComponent.find('.interview-fifth-listener-page').getElement()).to.exist;
  });

  it('renders node with correct values', () => {
    const props = {
      interview: {
        fifthFields: { sign: '', traditions: '' },
        checkPoints: [{}, {}, {}, {}, {}, { sign: 's i g n', traditions: 't r a d i t i o n s' }],
        currentIndex: 5,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(FifthListenerPage, { ...props }));

    const expectedElementSign = React.createElement('input', {
      defaultValue: 's i g n',
      id: 'sign',
    });
    const expectedElementTraditions = React.createElement('input', {
      defaultValue: 't r a d i t i o n s',
      id: 'traditions',
    });
    expect(renderedComponent.find('#sign').getElement().props.defaultValue).to.equal(
      expectedElementSign.props.defaultValue
    );
    expect(renderedComponent.find('#traditions').getElement().props.defaultValue).to.equal(
      expectedElementTraditions.props.defaultValue
    );
  });
});
