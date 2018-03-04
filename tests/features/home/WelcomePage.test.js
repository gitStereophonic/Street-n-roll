import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ConnectedDefaultPage, { WelcomePage } from 'src/features/home/WelcomePage';

describe('features/home/DefaultPage', () => {
  it('redux connect works', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const store = createStore(state => state, pageProps);

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedDefaultPage />
      </Provider>
    );

    expect(wrapper.find('.home-welcome-page').length).to.equal(1);
  });

  it('should render node with correct class name', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(<WelcomePage {...pageProps} />);

    expect(renderedComponent.find('.home-welcome-page').getElement()).to.exist;
  });
});
