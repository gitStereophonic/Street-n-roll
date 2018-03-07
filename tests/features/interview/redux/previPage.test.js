import { expect } from 'chai';

import { INTERVIEW_PREVI_PAGE } from 'src/features/interview/redux/constants';

import { previPage, reducer } from 'src/features/interview/redux/previPage';

describe('interview/redux/previPage', () => {
  it('returns correct action by previPage', () => {
    expect(previPage()).to.have.property('type', INTERVIEW_PREVI_PAGE);
  });

  it('handles action type INTERVIEW_PREVI_PAGE correctly', () => {
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
    const state = reducer(prevState, { type: INTERVIEW_PREVI_PAGE });
    expect(state).to.not.equal(prevState);
    expect(state).to.deep.equal(expectedState);
  });
});
