import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ProjectStatusPage } from 'src/features/about-us/ProjectStatusPage';

describe('about-us/ProjectStatusPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      aboutUs: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ProjectStatusPage {...props} />
    );

    expect(
      renderedComponent.find('.about-us-project-status-page').getElement()
    ).to.exist;
  });
});
