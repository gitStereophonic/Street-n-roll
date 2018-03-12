import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { WelcomePage } from 'src/features/home/WelcomePage';

describe('features/home/WelcomePage', () => {
  it('should render node with correct class name', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(<WelcomePage {...pageProps} />);

    expect(renderedComponent.find('.home-welcome-page').getElement()).to.exist;
  });
});
