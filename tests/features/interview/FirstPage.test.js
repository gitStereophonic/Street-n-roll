import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FirstPage } from 'src/features/interview/FirstPage';

const props = {
  interview: {
    firstFields: {
      city: '',
      age: '',
      gender: '',
      edu: '',
      eduOther: '',
      job: '',
    },
    checkPoints: [
      {},
      {
        city: 'Moscow',
        age: '18 - 25',
        gender: 'Мужчина',
        edu: 'Высшее полное',
        eduOther: '-',
        job: 'Programmer',
      },
    ],
    currentIndex: 1,
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

  it('renders node with correct values', () => {
    const renderedComponent = shallow(React.createElement(FirstPage, { ...props }));

    const expectedElementCity = React.createElement('input', {
      defaultValue: 'Moscow',
      id: 'city',
    });

    const expectedElementEduOther = React.createElement('input', {
      defaultValue: '-',
      id: 'edu',
    });

    const expectedElementJob = React.createElement('input', {
      defaultValue: 'Programmer',
      id: 'job',
    });

    expect(renderedComponent.find('#city').getElement().props.defaultValue).to.equal(
      expectedElementCity.props.defaultValue
    );

    expect(renderedComponent.find('input')).to.have.length(15);
    expect(renderedComponent.find('input').get(1).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(2).props.defaultChecked).to.equal(true);
    expect(renderedComponent.find('input').get(3).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(4).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(5).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(6).props.defaultChecked).to.equal(true);
    expect(renderedComponent.find('input').get(7).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(8).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(9).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(10).props.defaultChecked).to.equal(false);
    expect(renderedComponent.find('input').get(11).props.defaultChecked).to.equal(true);
    expect(renderedComponent.find('input').get(12).props.defaultChecked).to.equal(false);

    expect(renderedComponent.find('#edu').getElement().props.defaultValue).to.equal(
      expectedElementEduOther.props.defaultValue
    );
    expect(renderedComponent.find('#job').getElement().props.defaultValue).to.equal(
      expectedElementJob.props.defaultValue
    );
  });
});
