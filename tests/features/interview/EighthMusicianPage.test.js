import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EighthMusicianPage } from 'src/features/interview/EighthMusicianPage';

describe('interview/EighthMusicianPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      interview: {
        eighthFields: { why: '' },
        checkPoints: [{}, {}, {}, {}, {}, {}, {}, {}, { why: '' }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        currentIndex: 8,
      },
      actions: {},
    };
    const renderedComponent = shallow(React.createElement(EighthMusicianPage, { ...props }));

    expect(renderedComponent.find('.interview-eighth-musician-page').getElement()).to.exist;
  });

  it('renders node with correct input fields values', () => {
    const props = {
      interview: {
        eighthFields: { why: '' },
        checkPoints: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          { why: 'why so' },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        currentIndex: 8,
      },
      actions: {},
    };
    const expectedElementWhy = React.createElement('input', {
      defaultValue: 'why so',
      id: 'why',
    });
    const renderedComponent = shallow(React.createElement(EighthMusicianPage, { ...props }));
    expect(renderedComponent.find('#why').getElement().props.defaultValue).to.equal(
      expectedElementWhy.props.defaultValue
    );
  });
});
