import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { QuestionInfo } from 'src/features/the-data-pick-up/QuestionInfo';

describe('the-data-pick-up/QuestionInfo', () => {
  it('renders node with correct class name', () => {
    const props = {
      theDataPickUp: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <QuestionInfo {...props} />
    );

    expect(
      renderedComponent.find('.the-data-pick-up-question-info').getElement()
    ).to.exist;
  });
});
