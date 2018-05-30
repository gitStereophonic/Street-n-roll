import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UserInfo } from 'src/features/the-data-pick-up/UserInfo';

describe('the-data-pick-up/UserInfo', () => {
  it('renders node with correct class name', () => {
    const props = {
      theDataPickUp: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UserInfo {...props} />
    );

    expect(
      renderedComponent.find('.the-data-pick-up-user-info').getElement()
    ).to.exist;
  });
});
