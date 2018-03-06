import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FirstPage } from 'src/features/interview/FirstPage';

const props = {
  interview: {
    allFields: {
      city: 'Moscow',
      age: '18',
      gender: 'female',
      eduChosen: 'High-incomplete',
    },
  },
  actions: {},
};

describe('interview/FirstPage', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(React.createElement(FirstPage, { ...props }));

    expect(renderedComponent.find('.interview-first-page').getElement()).to.exist;
  });

  it('renders node with correct buttons class name', () => {
    const renderedComponent = shallow(React.createElement(FirstPage, { ...props }));

    expect(renderedComponent.find('.btn-disable')).to.exist;
    expect(renderedComponent.find('.next-btn')).to.exist;
    expect(renderedComponent.find('.prev-btn')).to.exist;
  });
});
