import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UserFeedBack } from 'src/features/common/UserFeedBack';

describe('common/UserFeedBack', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UserFeedBack {...props} />
    );

    expect(
      renderedComponent.find('.common-user-feed-back').getElement()
    ).to.exist;
  });
});
