import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PersonalDataProcessingPolicy } from 'src/features/about-us/PersonalDataProcessingPolicy';

describe('about-us/PersonalDataProcessingPolicy', () => {
  it('renders node with correct class name', () => {
    const props = {
      aboutUs: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PersonalDataProcessingPolicy {...props} />
    );

    expect(
      renderedComponent.find('.about-us-personal-data-processing-policy').getElement()
    ).to.exist;
  });
});
