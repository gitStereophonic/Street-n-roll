import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AboutUsPage } from 'src/features/about-us/AboutUsPage';

describe('about-us/AboutUsPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      aboutUs: {},
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(AboutUsPage, { ...props }));

    expect(renderedComponent.find('.about-us-about-us-page').getElement()).to.exist;
  });
});
