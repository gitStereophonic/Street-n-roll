import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { StatByQuestions } from 'src/features/the-data-pick-up/StatByQuestions';

describe('the-data-pick-up/StatByQuestions', () => {
  it('renders node with correct class name', () => {
    const props = {
      theDataPickUp: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <StatByQuestions {...props} />
    );

    expect(
      renderedComponent.find('.the-data-pick-up-stat-by-questions').getElement()
    ).to.exist;
  });
});
