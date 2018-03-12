import { expect } from 'chai';
import React from 'react';

import {
  INTERVIEW_NEXT_PAGE,
} from 'src/features/interview/redux/constants';

import {
  nextPage,
  reducer,
} from 'src/features/interview/redux/nextPage';

describe('interview/redux/nextPage', () => {
  it('returns correct action by nextPage', () => {
    expect(nextPage()).to.have.property('type', INTERVIEW_NEXT_PAGE);
  });

  it('handles action type INTERVIEW_NEXT_PAGE correctly', () => {
    const prevState = {
      interviewStages: [0, 33, 435, 36],
      currentIndex: 2,
      pageContent: 2,
    };
    const expectedState = {
      interviewStages: [0, 33, 435, 36],
      currentIndex: 3,
      pageContent: 36,
    };
    const state = reducer(
      prevState,
      { type: INTERVIEW_NEXT_PAGE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(expectedState); // TODO: replace this line with real case.
  });
});
