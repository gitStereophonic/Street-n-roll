import { expect } from 'chai';

import { INTERVIEW_PREV_PAGE } from 'src/features/interview/redux/constants';

import { prevPage, reducer } from 'src/features/interview/redux/prevPage';

describe('interview/redux/prevPage', () => {
  it('returns correct action by prevPage', () => {
    expect(prevPage()).to.have.property('type', INTERVIEW_PREV_PAGE);
  });

  it('handles action type INTERVIEW_PREV_PAGE correctly', () => {
    const prevState = {
      interviewStages: [0, 33, 435, 36],
      currentIndex: 2,
      pageContent: 2,
    };
    const expectedState = {
      interviewStages: [0, 33, 435, 36],
      currentIndex: 1,
      pageContent: 33,
    };
    const state = reducer(prevState, { type: INTERVIEW_PREV_PAGE });
    expect(state).to.not.equal(prevState);
    expect(state).to.deep.equal(expectedState);
  });
});
